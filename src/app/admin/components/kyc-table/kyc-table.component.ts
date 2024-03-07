import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-kyc-table',
  templateUrl: './kyc-table.component.html',
  styleUrls: ['./kyc-table.component.scss']
})
export class KycTableComponent implements OnInit {
  @Input() kyc: any;
  constructor() { }

  ngOnInit(): void {
    console.log('kyc.videoUrl=', this.kyc.videoUrl);
  }

}
