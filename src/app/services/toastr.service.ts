import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _translateService: TranslateService
  ) { }

  showSuccess(message: string, title: string = this._translateService.instant("Success")) {
    this._messageService.add({ severity: 'success', summary: title, detail: message });
  }

  showInfo(message: string, title: string = this._translateService.instant("Info")) {
    this._messageService.add({ severity: 'info', summary: title, detail: message, life: 10000 });
  }

  showError(message: string, title: string = this._translateService.instant("Error")) {
    this._messageService.add({ severity: 'error', summary: title, detail: message });
  }

  showWarn(message: string, title: string = this._translateService.instant("Warning")) {
    this._messageService.add({ severity: 'warn', summary: title, detail: message });
  }

  confirm(method: () => void, header = null, message = null) {
    this._confirmationService.confirm({
      message: message || this._translateService.instant('ConfirmMessage'),
      header: header || this._translateService.instant('Confirmation'),
      icon: 'pi pi-exclamation-triangle mx-2',
      acceptLabel: this._translateService.instant('Yes'),
      rejectLabel: this._translateService.instant('No'),
      accept: () => {
        method();
      },
      reject: () => { },
    });
  }
}
