import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rounded-icon-button',
  templateUrl: './rounded-icon-button.component.html',
  styleUrls: ['./rounded-icon-button.component.scss']
})
export class RoundedIconButtonComponent implements OnInit {
  @Input() title: string;
  @Input() icon: string;
  constructor() { }

  ngOnInit(): void {
  }

}
