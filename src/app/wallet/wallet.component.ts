import { Component, OnInit } from '@angular/core';
import { ChainService } from '../services/chain.service';
import * as BIP39 from 'bip39';
import { hdkey } from 'ethereumjs-wallet';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit{
  mnemonic: string;
  chainName: string;
  chains: any;
  rootNode: any;
  xpub: string;
  xprv: string;
  constructor(private chainServ: ChainService) {}
  ngOnInit(): void {
    this.chainServ.getAll(100, 0).subscribe(
      (ret: any) => {
        if(ret.success) {
          this.chains = ret.data;
        }
      }
    );
  }

  generate() {
    console.log('mnemonic==', this.mnemonic);
    console.log('chainName==', this.chainName);


    const seed = BIP39.mnemonicToSeedSync(this.mnemonic);

    let path = 'm/44\'/' + 60 + '\'/0\'/' + 0 + '/' + 0;
    const rootETH = hdkey.fromMasterSeed(seed);
    path = "m/44'/0'/0'/0/0";

    this.rootNode = rootETH.derivePath(path);
    this.xpub = this.rootNode.publicExtendedKey();
    this.xprv = this.rootNode.privateExtendedKey();

  }


}
