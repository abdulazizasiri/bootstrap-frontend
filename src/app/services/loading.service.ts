import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  requestCount = 0;
  constructor(private _spinner: NgxSpinnerService) { }

  show() {
    this.requestCount++;
    this._spinner.show();
  }

  hide() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this._spinner.hide();
    }

  }
}
