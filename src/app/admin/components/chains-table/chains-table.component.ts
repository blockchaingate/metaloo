import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chains-table',
  templateUrl: './chains-table.component.html',
  styleUrls: ['./chains-table.component.scss',
  '../../../table.scss']
})
export class ChainsTableComponent {
  @Input() chains: any;
  constructor(
    ) { }

  ngOnInit(): void {

  }
}
