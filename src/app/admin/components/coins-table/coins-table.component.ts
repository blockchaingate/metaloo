import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss',
  '../../../table.scss']
})
export class CoinsTableComponent {
  @Input() coins: any;
  constructor(
    ) { }

  ngOnInit(): void {

  }
}
