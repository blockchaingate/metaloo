import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square-icon',
  templateUrl: './square-icon.component.html',
  styleUrls: ['./square-icon.component.scss']
})
export class SquareIconComponent {
  @Input() text: string = '';
}
