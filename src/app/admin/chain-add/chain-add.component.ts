import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChainService } from 'src/app/services/chain.service';

@Component({
  selector: 'app-chain-add',
  templateUrl: './chain-add.component.html',
  styleUrls: ['./chain-add.component.scss']
})
export class ChainAddComponent {
  name: string;

  constructor(private chainServ: ChainService, private router: Router) {}
  submit() {
    this.chainServ.add(this.name).subscribe(
      (ret: any) => {
        console.log('ret==', ret);
        if(ret.success) {
          this.router.navigate(['/admin/chains']);
        }
      }
    );
  }
}
