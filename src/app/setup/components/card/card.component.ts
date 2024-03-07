import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

interface Actions {
  confirm: {
    text: string,
    click: any
  },
  cancel: {
    text: string,
    click: any    
  }
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() title: string;

  @Input() action1Text: string;
  @Input() action2Text: string;

  @Output() action1Click = new EventEmitter();
  @Output() action2Click = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
