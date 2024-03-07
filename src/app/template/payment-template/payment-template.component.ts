import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import BigNumber from 'bignumber.js';
import { LoggingService } from 'src/app/services/logging.service';
import { WalletService } from 'src/app/services/wallet.service';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Web3Service } from 'src/app/services/web3.service';
const Web3EthAbi = require('web3-eth-abi');

@Component({
  selector: 'app-payment-template',
  templateUrl: './payment-template.component.html',
  styleUrls: ['./payment-template.component.scss']
})
export class PaymentTemplateComponent {
  email: string;
  chain: string;
  coin: string;
  type: string;
  amount: number;

  isPayClicked = false;
  isPaySuccess = false;
  isPayProcessing = false;
  isPayDone = false;
  isQRScan = false;

  modalRef?: BsModalRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logServ: LoggingService,
    private modalService: BsModalService,
    private web3Serv: Web3Service,
    private walletServ: WalletService) {
  }

  ngOnInit() {

    if (this.web3Serv.ethEnabled()) {
      console.log('have something');

    } else {
      // Handle the case where the user doesn't have web3. Probably
      // show them a message telling them to install Metamask in
      // order to use our app.
    }

    this.route.queryParams.subscribe((params) => {
      this.email = params.email;
      this.chain = params.chain;
      this.coin = params.coin;
      this.type = params.type;
      this.amount = parseFloat(params.amount);
    });

    this.walletServ.isScanQR$.subscribe(newData => {
      this.isQRScan = newData;
    });
  }

 

  getFinalAmount() {
    // check type
    if (this.type == 'DNB') {
      return this.amount * 100;
    } else if (
      this.type == 'XDNB'
    ) {
      return this.amount * 15000;
    } else {
      //alert('Invalid type');
    }
  }


  payLater() {
    console.log('payLater');
    this.router.navigate(['/']);
  }

  getTokenBySymbol(chain, coin) {
    const tokens = environment.CHAINS[chain]['ACCEPTED_TOKENS'];
    let token = null;
    for (let i = 0; i < tokens.length; i++) {
      token = tokens[i];
      if (token.SYMBOL == coin) {
        break;
      }
    }
    return token;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getPayWithMethodData(email: string, chainId: string, tokenId: string, amount: string) {
    if (!tokenId) {
      console.log('tokenId not found');
      return {method: '', data: ''};
    }
    let func = {
      "inputs": [
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_tokenAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "purchase",
      "outputs": [

      ],
      "stateMutability": "nonpayable",
      "type": "function"
    };

    let method = 'eth_sendTransaction';
    if (chainId == '212' || chainId == '211') {
      func = {
        "inputs": [
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "uint32",
            "name": "_tokenType",
            "type": "uint32"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "purchase",
        "outputs": [

        ],
        "stateMutability": "nonpayable",
        "type": "function"
      };
      method = 'kanban_sendTransaction';
    }
    const args = [
      email,
      tokenId,
      amount
    ];
    const data = Web3EthAbi.encodeFunctionCall(func, args);
    return {method, data};
  }

  payWith(email: string, chainId: string, bondSmartContract: string, tokenId: string, amount: string, nonce, gas, gasPrice) {


    const {method, data} = this.getPayWithMethodData(email, chainId, tokenId, amount);
    return this.walletServ.ethSendTransaction(method, chainId, bondSmartContract, '0x0', data, nonce, gas, gasPrice);
  }

  getNonce(chain, address) {
    return this.walletServ.getTransactionCount(chain, address);
  }


  metamask() {
    this.modalRef.hide();
    this.isPayClicked = true;
    this.isPayProcessing = true;
    const chain = this.chain;
    const coin = this.coin;
    const email = this.email;
    const chainId = environment.CHAINS[chain]['ID'];
    const token = this.getTokenBySymbol(chain, coin);

    const bondId = environment.CHAINS[chain]['BOND_ADDRESS'];

    if (!chainId || !token || !bondId) {
      console.log('chainId or token or bondId not found');
      return;
    }
    const tokenId = token.ID;
    const tokenDecimals = token.DECIMALS;

    let type = this.type;
    const amount = this.amount;

    let amountBig = new BigNumber(amount).multipliedBy(new BigNumber(100)).shiftedBy(tokenDecimals);
    console.log('type===', type);
    if (type == 'XDNB') {
      amountBig = amountBig.multipliedBy(new BigNumber(150));
      
    }

    const amountHex = '0x' + amountBig.toString(16).split('.')[0];
    console.log('amountHex===', amountHex);
    this.web3Serv.switchChain(chainId).then(
      () => {
        this.web3Serv.getAccounts().then(
          (accounts) => {
            if(!accounts || (accounts.length == 0)) {
              return;
            }
            const address = accounts[0];
            this.getNonce(chain, address).subscribe(
              {
                next: (nonce: any) => {
                  const {method, to, data} = this.getApproveMethodToData(chainId, tokenId, bondId, amountHex);
                  this.web3Serv.ethSendTransaction(method, chainId, address, to, '0x0', data, nonce).then(
                    (txid: string) => {
                      if(!txid) {
                        return;
                      }
                      nonce ++;
                      nonce = '0x' + nonce.toString(16);
                      const {method, data} = this.getPayWithMethodData(email, chainId, tokenId, amountHex);
                      this.web3Serv.ethSendTransaction(method, chainId, address, bondId, '0x0', data, nonce).then(
                        (txid: string) => {
                          if(!txid) {
                            return;
                          }
                          this.isPayDone = true;
                          this.isPayClicked = false;
                          this.isPaySuccess = true;

                          this.isPayProcessing = false;
                      });
                    }
                  );

                }
              });
          }
        );
      }
    );
  }

  purchase(
    // email: string,
    // chain: string, // ETH, KANBAN, BNB
    // coin: string,  //USDT, USDC, DUSD
    // type: string,  //BOND, BONDNFT
    // amount: number
  ) {

    this.modalRef.hide();
    this.isPayClicked = true;
    this.isPayProcessing = true;

    const email = this.email;
    const chain = this.chain;
    const coin = this.coin;
    let type = this.type;
    const amount = this.amount;

    /*
    if (type == 'BND') {
      type = 'BOND';
    }
    if (type == 'GBND') {
      type = 'BONDNFT';
    }
    */
    //log service log
    this.logServ.log('purchase', JSON.stringify(
      {
        email: email,
        chain: chain,
        coin: coin,
        type: type,
        amount: amount
      }
    ))

    const chainId = environment.CHAINS[chain]['ID'];

    let gas = environment.CHAINS[chain]['GAS_LIMIT'];
    let gasPrice = environment.CHAINS[chain]['GAS_PRICE'];

    if (!gas || !gasPrice) {
      console.log('gas or gasPrice not found');
      return;
    }
    gas = '0x' + new BigNumber(gas).toString(16);
    gasPrice = '0x' + new BigNumber(gasPrice).shiftedBy(9).toString(16);

    const token = this.getTokenBySymbol(chain, coin);

    const bondId = environment.CHAINS[chain]['BOND_ADDRESS'];

    if (!chainId || !token || !bondId) {
      console.log('chainId or token or bondId not found');
      return;
    }
    const tokenId = token.ID;
    const tokenDecimals = token.DECIMALS;

    let amountBig = new BigNumber(amount).multipliedBy(new BigNumber(100)).shiftedBy(tokenDecimals);
    if (type == 'XDNB') {
      amountBig = amountBig.multipliedBy(new BigNumber(15000));
    }

    const amountHex = '0x' + amountBig.toString(16).split('.')[0];

    this.walletServ.connectWalletNew(chainId, ).subscribe(
      {
        next: (address) => {

          console.log('address for connect=', address);
          this.getNonce(chain, address).subscribe(
            {
              next: (nonce: any) => {
                console.log('nonce=', nonce);
                this.approve(chainId, tokenId, bondId, amountHex, nonce, gas, gasPrice).subscribe(
                  {
                    next: (ret) => {
                      console.log('ret from approve===', ret);
                      nonce++;
                      console.log('nonce==', nonce);
                      this.payWith(email, chainId, bondId, tokenId, amountHex, nonce, gas, gasPrice).subscribe(
                        {
                          next: (ret: any) => {
                            console.log('ret from pay=', ret);
                            this.isPayDone = true;
                            this.isPayClicked = false;
                            this.isPaySuccess = true;

                            this.isPayProcessing = false;
                            this.walletServ.updateIsScanQR(false);
                          },
                          error: (error: any) => {
                            console.log('error from pay=', error);
                            this.whenPayFailed();
                          }
                        });
                    },
                    error: (error) => {
                      console.log('error from approve===', error);
                      this.whenPayFailed();

                    }
                  });
              },
              error: (error) => {
                console.log('error from get nonce===', error);
                this.whenPayFailed();
              }
            }
          );

        },
        error: (error) => {
          console.log('error from connect wallet===', error);
          this.whenPayFailed();
        }
      }
    );
  }

  // this.setQRAfterScaned: () => {
  //   this.isQRScan = true;
  // }

  whenPayFailed() {
    this.isPayDone = true;
    this.isPayClicked = false;
    this.isPaySuccess = false;
    this.isPayProcessing = false;
    this.walletServ.updateIsScanQR(false);
  }

  getApproveMethodToData(chainId, smartContractAddress, spender, value) {
    let func: any = {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    };

    let args = [
      spender,
      value
    ];

    if (chainId == '212' || chainId == '211') {
      func = {
        "constant": false,
        "inputs": [
          {
            "name": "_operator",
            "type": "address"
          },
          {
            "name": "_coinType",
            "type": "uint32"
          },
          {
            "name": "_limit",
            "type": "uint256"
          }
        ],
        "name": "authorizeOperator",
        "outputs": [

        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      };
      args = [spender, smartContractAddress, value];
    }
    const data = Web3EthAbi.encodeFunctionCall(func, args);

    let to = smartContractAddress;
    let method = 'eth_sendTransaction';
    if (chainId == '212' || chainId == '211') {
      to = environment.COINPOOL_ADDRESS;
      method = 'kanban_sendTransaction';
    }

    return {method, to, data};
  }

  approve(chainId: string, smartContractAddress, spender, value, nonce, gas, gasPrice) {

    const {method, to, data} = this.getApproveMethodToData(chainId, smartContractAddress, spender, value);
    return this.walletServ.ethSendTransaction(method, chainId, to, '0x0', data, nonce, gas, gasPrice);
  }
}

