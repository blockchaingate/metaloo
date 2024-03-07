import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { Coin } from 'src/app/interfaces/coin.interface';
import { CoinService } from 'src/app/services/coin.service';
import { ChainCoinService } from 'src/app/services/chain-coin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SelectAssetComponent } from '../../modals/send-receive/select-asset/select-asset.component';
@Component({
  selector: 'app-otc-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss']
})
export class ReceiveComponent implements OnInit{
  coin: any;
  coins: any;
  addresses: any;
  address: string;
  chainCoins: any;
  _chainCoin: any;

  get chainCoin() {
    return this._chainCoin;
  }

  set chainCoin(item: any) {
    this._chainCoin = item;

    const theAddresses = this.addresses.filter(address => address.chain._id == item.chain._id);
    if(theAddresses && theAddresses.length > 0) {
      this.address = theAddresses[0].id;
    }
  }

  public modalRef: BsModalRef;
  
  constructor(
    private addressServ: AddressService,
    private coinServ: CoinService,
    private chainCoinServ: ChainCoinService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.addressServ.get().subscribe(
      (ret: any) => {
        if(ret.success) {
          this.addresses = ret.data;
          this.coinServ.getAllCoinsWithBalance(100,0).subscribe(
            (ret: any) => {
              if(ret.success) {
                this.coins = ret.data;
                this.changeCoin(this.coins[0]);
              }
            }
          );
        }
      });
  }

  changeCoin(coin: Coin) {
    this.coin = coin;
    if(coin) {
      this.chainCoinServ.getChainsOfCoin(this.coin._id).subscribe(
        (ret: any) => {
          if(ret.success) {
            this.chainCoins = ret.data;
            this.chainCoin = this.chainCoins[0];
            //this.changeChain(this.chainCoins[0]);
            
          }
        }
      );
    }
  }

  changeChain(chainCoin: any) {

  }

  onChange(event: any) {
    console.log('event===', event);
  }

  selectAsset() {
    const initialState = {
      coins: this.coins
    };

    this.modalRef = this.modalService.show(SelectAssetComponent, { initialState });

    this.modalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      this.changeCoin(result);
  })
  }
}
