import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-addresses-table',
  templateUrl: './addresses-table.component.html',
  styleUrls: ['./addresses-table.component.scss',
  '../../../table.scss']
})
export class AddressesTableComponent {
  @Input() addresses: any;
  constructor(
    ) { }

  ngOnInit(): void {

  }
}
