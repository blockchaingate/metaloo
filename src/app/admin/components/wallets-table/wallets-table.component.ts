import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-wallets-table',
  templateUrl: './wallets-table.component.html',
  styleUrls: ['./wallets-table.component.scss']
})
export class WalletsTableComponent implements OnInit {
  @Input() wallets: any;
  constructor() { }

  ngOnInit(): void {
  }
}
