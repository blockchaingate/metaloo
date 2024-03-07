import { Component, Input } from '@angular/core';
import { WithdrawService } from 'src/app/services/withdraw.service';
@Component({
  selector: 'app-withdraws-table',
  templateUrl: './withdraws-table.component.html',
  styleUrls: ['./withdraws-table.component.scss',
  '../../../table.scss']
})
export class WithdrawsTableComponent {
  @Input() withdraws: any;
  constructor(private withdrawServ: WithdrawService
    ) { }

  ngOnInit(): void {

  }

  getStatusText(status) {
    return this.withdrawServ.getWithdrawStatusText(status);
  }
}
