import { Component, Input } from '@angular/core';
import { WithdrawService } from 'src/app/services/withdraw.service';

@Component({
  selector: 'app-withdraw-table',
  templateUrl: './withdraw-table.component.html',
  styleUrls: ['./withdraw-table.component.scss']
})
export class WithdrawTableComponent {
  @Input() withdraw: any;

  constructor(private withdrawServ: WithdrawService) {}
  getStatusText() {
    return this.withdrawServ.getWithdrawStatusText(this.withdraw.status);
  }
}
