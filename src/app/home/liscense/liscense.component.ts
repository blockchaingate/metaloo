import { Component } from '@angular/core';

@Component({
  templateUrl: './liscense.component.html',
  styleUrls: ['./liscense.component.scss']
})
export class LiscenseComponent {
  getPdfPath(): string {
    return '/assets/pdf/Security_License.pdf';
  }
}
