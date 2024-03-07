import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rounded-card',
  templateUrl: './rounded-card.component.html',
  styleUrls: ['./rounded-card.component.scss']
})
export class RoundedCardComponent implements OnInit {
  @Input() isHeader: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
