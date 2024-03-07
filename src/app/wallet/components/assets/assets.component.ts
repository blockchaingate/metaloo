import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as bitcoin from 'bitcoinjs-lib';
import * as exaddr from '../../../lib/exaddr';
import { hdkey } from 'ethereumjs-wallet';
import  TronWeb from 'tronweb';
@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit{
  @Input() xprv: any;
  @Input() chain: string;

  assets: any;
  pageSize: number = 10;
  pageNum: number = 0;
  ngOnInit(): void {
    this.getAssets();
  }

  getAssets() {
    this.assets = [];
    for(let i = 0; i < 10; i++) {
      const index = this.pageSize * this.pageNum + i;
      const asset = this.generateAsset(index);
      this.assets.push(asset);
    }
  }


  generateAsset(id: number) {

    let address = '';
    let privateKey = null;
    if (['BTC', 'FAB', 'KANBAN'].indexOf(this.chain) >= 0) {
        let coinType = 0;
        if (this.chain === 'FAB') {
            coinType = 1150;
        }
        const production = environment.production;
        const network = production ? bitcoin.networks.bitcoin : bitcoin.networks.testnet; 

        const hdNode = bitcoin.bip32.fromBase58(this.xprv);

        const btcChildNode = hdNode.derive(id).derive(coinType);
        const btcPublicKey = btcChildNode.publicKey;

        privateKey = btcChildNode.privateKey.toString('hex');
        address = bitcoin.payments.p2pkh({ pubkey: btcPublicKey, network }).address;
        if(this.chain == 'KANBAN') {
            address = exaddr.toKbpayAddress(address);
        }
    } else if (['ETH', 'BNB', 'POLYGON'].includes(this.chain)) {
        const wallet = hdkey.fromExtendedKey(this.xprv).deriveChild(id).deriveChild(60).getWallet();
        privateKey = wallet.getPrivateKey().toString('hex');
        address = wallet.getAddressString();
    } else if (this.chain === 'TRX') {
        const trxChildNode = hdkey.fromExtendedKey(this.xprv).deriveChild(id).deriveChild(195).getWallet();
        const trxPubKey = trxChildNode.getPublicKey();
        privateKey = trxChildNode.getPrivateKey().toString('hex');
        address = TronWeb.utils.crypto.getBase58CheckAddress(TronWeb.utils.crypto.computeAddress(trxPubKey));
    }
    return {privateKey, address};
  }

  next() {
    this.pageNum ++;
    this.getAssets();
  }
}
