import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Coin } from '../../../../interfaces/coin.interface';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-select-asset',
  templateUrl: './select-asset.component.html',
  styleUrls: ['./select-asset.component.scss']
})
export class SelectAssetComponent implements OnInit {
  coins: Coin[];

  public onClose: Subject<Coin>;
  constructor(private _bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }


  selectCoin(coin: Coin) {
    this.onClose.next(coin);
    this._bsModalRef.hide();
  }
}
