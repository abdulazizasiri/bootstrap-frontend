import { Component, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.sass',
  encapsulation: ViewEncapsulation.ShadowDom,
    standalone: false

})
export class SpinnerComponent {
  constructor(public loader: SpinnerService) {
  }
}
