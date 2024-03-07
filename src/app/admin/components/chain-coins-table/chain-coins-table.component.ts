import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chain-coins-table',
  templateUrl: './chain-coins-table.component.html',
  styleUrls: ['./chain-coins-table.component.scss',
  '../../../table.scss']
})
export class ChainCoinsTableComponent {
  @Input() chainCoins: any;
  constructor(
    ) { }

  ngOnInit(): void {

  }
}
