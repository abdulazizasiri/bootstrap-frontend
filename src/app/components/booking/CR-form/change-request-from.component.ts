import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { RoomService } from '../../../services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { IRoomListDto } from '../../../models/room.model';
import { UserService } from '../../../services/user.service';
import { IUserDto } from '../../../models/user';
import { LanguageService } from '../../../services/language.service';
import { AuthService } from '../../../services/Auth.service';

type FileKind = 'pdf' | 'word' | 'excel' | 'unknown';

@Component({
  selector: 'app-change-request-from',
  templateUrl: './change-request-from.component.html',
  styleUrls: ['./change-request-from.component.css'],
  standalone: false
})
export class ChangeRequestFromComponent implements OnInit {
  changeRequestForm!: FormGroup;
  currentLang = 'ar';
  loading = false;
  error = '';

  // ---- Attachments (optional) ----
  readonly maxAttachments = 3;
  readonly acceptedExtensions = '.pdf,.doc,.docx,.xls,.xlsx';
  attachments: File[] = [];
  attachmentError = '';

  private readonly allowedMimeTypes = new Set<string>([
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ]);

  private readonly maxFileSizeBytes = 5 * 1024 * 1024; // 5 MB per file — adjust as needed

  departments: any[] = [];
  requesters: any[] = [];
  requestTypes: any[] = [];
  systems: any[] = [];

  constructor(
    private fb: FormBuilder,
    private translate: LanguageService,
  ) {}

  ngOnInit(): void {
    this.currentLang = this.translate.getLangInitially() || 'ar';
    // this.translate.onLangChange.subscribe(e => (this.currentLang = e.lang));

    this.changeRequestForm = this.fb.group({
      requestNumber: [{ value: '', disabled: true }], // auto-generated, e.g. AR01
      requestDate: ['', Validators.required],
      departmentId: [null, Validators.required],
      requesterId: [null, Validators.required],
      requestTypeId: [null, Validators.required],
      systemId: [null, Validators.required],
      inOperationalPlan: [false],
      actionDescription: ['', [Validators.required, Validators.maxLength(1000)]],
      // NOTE: attachments are intentionally NOT a form control — they are optional
      // and managed via the attachments array below.
    });
  }

  // ---- Getters used by the template ----
  get requestDate() { return this.changeRequestForm.get('requestDate'); }
  get departmentId() { return this.changeRequestForm.get('departmentId'); }
  get requesterId() { return this.changeRequestForm.get('requesterId'); }
  get requestTypeId() { return this.changeRequestForm.get('requestTypeId'); }
  get systemId() { return this.changeRequestForm.get('systemId'); }
  get inOperationalPlan() { return this.changeRequestForm.get('inOperationalPlan'); }
  get actionDescription() { return this.changeRequestForm.get('actionDescription'); }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  getErrorMessage(controlName: string): string {
    const control = this.changeRequestForm.get(controlName);
    if (control?.hasError('required')) {
      // return this.translate.instant('VALIDATION.REQUIRED');
    }
    if (control?.hasError('maxlength')) {
      // return this.translate.instant('VALIDATION.MAX_LENGTH');
    }
    return '';
  }

  // =====================================================
  //  Attachments: optional, max 3, PDF / Word / Excel only
  // =====================================================

  onAttachmentsSelected(event: Event): void {
    this.attachmentError = '';
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const incoming = Array.from(input.files);
    input.value = ''; // reset so re-selecting the same file fires (change) again

    for (const file of incoming) {
      // 1. Enforce the max count
      if (this.attachments.length >= this.maxAttachments) {
        // this.attachmentError = this.translate.translate('CHANGE_REQUEST.ERR_MAX_ATTACHMENTS', {
        //   max: this.maxAttachments,
        // });
        break;
      }

      // 2. Enforce the allowed types (Word, PDF, Excel)
      if (!this.isAllowedType(file)) {
        // this.attachmentError = this.translate.instant('CHANGE_REQUEST.ERR_INVALID_TYPE');
        continue;
      }

      // 3. Enforce max file size
      if (file.size > this.maxFileSizeBytes) {
        // this.attachmentError = this.translate.instant('CHANGE_REQUEST.ERR_FILE_TOO_LARGE', {
        //   max: this.formatFileSize(this.maxFileSizeBytes),
        // });
        continue;
      }

      // 4. Skip duplicates (same name + size)
      const isDuplicate = this.attachments.some(f => f.name === file.name && f.size === file.size);
      if (isDuplicate) {
        // this.attachmentError = this.translate.instant('CHANGE_REQUEST.ERR_DUPLICATE_FILE');
        continue;
      }

      this.attachments.push(file);
    }
  }

  removeAttachment(index: number): void {
    this.attachments.splice(index, 1);
    this.attachmentError = '';
  }

  getFileKind(file: File): FileKind {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (ext === 'pdf') return 'pdf';
    if (ext === 'doc' || ext === 'docx') return 'word';
    if (ext === 'xls' || ext === 'xlsx') return 'excel';
    return 'unknown';
  }

  private isAllowedType(file: File): boolean {
    // Check both extension and MIME type; some browsers report empty type,
    // so the extension check is the fallback.
    const kindOk = this.getFileKind(file) !== 'unknown';
    const mimeOk = !file.type || this.allowedMimeTypes.has(file.type);
    return kindOk && mimeOk;
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  // =====================================================

  submit(): void {
    if (this.changeRequestForm.invalid) {
      this.changeRequestForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const formData = new FormData();
    const value = this.changeRequestForm.getRawValue();

    Object.keys(value).forEach(key => {
      formData.append(key, value[key] ?? '');
    });

    // Attachments are optional — appended only if the user added any
    this.attachments.forEach(file => formData.append('attachments', file, file.name));

    // TODO: replace with your service call, e.g.:
    // this.changeRequestService.create(formData).subscribe({ ... });
    this.loading = false;
  }

  onReset(): void {
    this.changeRequestForm.reset({ inOperationalPlan: false });
    this.attachments = [];
    this.attachmentError = '';
    this.error = '';
  }
}
