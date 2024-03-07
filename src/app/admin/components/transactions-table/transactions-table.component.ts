import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {
  @Input() transactions: any;
  constructor() { }

  ngOnInit(): void {
  }

  showText(text: string) {
    if(!text) {
      return text;
    }
    return text.substring(0, 9);
  }
}
