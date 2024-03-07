import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import BigNumber from 'bignumber.js';
import { LoggingService } from 'src/app/services/logging.service';
import { WalletService } from 'src/app/services/wallet.service';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Web3Service } from 'src/app/services/web3.service';
import { Observable } from 'rxjs';
const Web3EthAbi = require('web3-eth-abi');
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { OrderService } from 'src/app/services/order.service';


//tested with https://react-web3wallet.vercel.app/


interface Progress {
  text: string;
  type: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment-digit-id.component.html',
  styleUrls: ['./payment-digit-id.component.scss']
})

export class PaymentDigitIdComponent implements OnInit {
  insufficientFund: boolean;
  email: string;
  chain: string;
  txid: string;
  coin: string;
  interval;
  type: string;
  amount: number;
  orderId: string;
  orderStatus: string;
  nativeBalance: string;

  isPayClicked = false;
  isPaySuccess = false;
  isPayProcessing = false;
  isPayDone = false;
  isQRScan = false;
  paymentStatus: string;

  modalRef?: BsModalRef;

  progressSet: Progress[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logServ: LoggingService,
    private modalService: BsModalService,
    private orderServ: OrderService,
    private web3Serv: Web3Service,
    private walletServ: WalletService) {
  }

  ngOnInit() {

    this.progressSet = [];
    this.insufficientFund = false;
    if (this.web3Serv.ethEnabled()) {
      console.log('have something');
    }

    this.route.queryParams.subscribe((params) => {
      // this.email = params.email;
      this.chain = params.chain;
      this.coin = params.coin;
      this.type = params.type;
      // this.orderId = params.id;
      this.amount = parseFloat(params.amount);
      this.checkOrder();
    });

    this.walletServ.isScanQR$.subscribe(newData => {
      this.isQRScan = newData;
    });
  }



  getFinalAmount() {
    return this.amount * 100;
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

  captureDivAsPDF() {
    const divToCapture = document.getElementById('pingzheng'); // Replace with your div's ID

    html2canvas(divToCapture).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190; // Adjust as needed
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('ElSalvadorBondPayment.pdf');
    });
  }


  getPayWithMethodData(email: string, chainId: string, tokenId: string, amount: string) {
    if (!tokenId) {
      return { method: '', data: '' };
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
      /*
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
      */
      method = 'kanban_sendTransaction';
    }
    const args = [
      email,
      tokenId,
      amount
    ];
    const data = Web3EthAbi.encodeFunctionCall(func, args);
    return { method, data };
  }



  payWith(email: string, chainId: string, bondSmartContract: string, tokenId: string, amount: string, nonce, gas, gasPrice) {


    const { method, data } = this.getPayWithMethodData(email, chainId, tokenId, amount);
    return this.walletServ.ethSendTransaction(method, chainId, bondSmartContract, '0x0', data, nonce, gas, gasPrice);
  }

  getNonce(chain, address) {
    return this.walletServ.getTransactionCount(chain, address);
  }

  approveAndBuy(chainId, tokenId, bondId, amountHex, email, address, nonce) {
    console.log('approveAndBuy start');
    const { method, to, data } = this.getApproveMethodToData(chainId, tokenId, bondId, amountHex);
    console.log('method for getApproveMethodToData=', method);
    console.log('to=', to);
    console.log('data=', data);
    this.web3Serv.ethSendTransaction(method, chainId, address, to, '0x0', data, nonce).then(
      (txid: string) => {
        console.log('txid there we go=', txid);
        if (!txid) {
          this.addErrorSubmitPayment();
          return;
        }
        this.addApproveAllowance();
        nonce++;
        nonce = '0x' + nonce.toString(16);
        const { method, data } = this.getPayWithMethodData(email, chainId, tokenId, amountHex);
        console.log('method for getPayWithMethodData=', method);
        console.log('data=', data);
        this.web3Serv.ethSendTransaction(method, chainId, address, bondId, '0x0', data, nonce).then(
          (txid: string) => {
            if (!txid) {
              this.addErrorSubmitPayment();
              return;
            }
            this.handleTxid(txid);
          });
      }
    );
  }

  checkOrder() {
    this.orderServ.getOrder(this.orderId).subscribe(
      {
        next: (res: any) => {
          if(res.success) {
            const data = res.data;
            const bondOrder = data.bond_order;
            this.orderStatus = bondOrder.status;
            console.log('this.txid===', this.txid);
            console.log('bondOrder===', bondOrder);
            if(!this.txid) {
              this.txid = bondOrder.txid;
            }
            
            if(this.orderStatus != 'Payment Processing') {
              clearInterval(this.interval);
            }

          }
        },
        error: (error: any) => {
          this.progressSet.unshift(
            {
              text: 'Error while getting oder',
              type: 'danger'
            }
          );
        }
      }
    );
  }

  handleTxid(txid: string) {
    this.txid = txid;
    this.progressSet.unshift(
      {
        text: 'Your payment was submitted with ' + txid.substring(0, 4) + '...' + txid.substring(txid.length - 4),
        type: 'info'
      }
    );
    this.orderServ.updateOrderTxid(this.orderId, txid).subscribe(
      {
        next: (res: any) => {
          if(res.success) {
            this.orderStatus = 'Payment Processing';
            // this.interval = setInterval(() => {
              this.checkOrder();
            // },10000)
            

          } else {
            this.progressSet.unshift(
              {
                text: 'Failed to update order',
                type: 'danger'
              }
            );
          }

        },
        error: (error: any) => {
          this.progressSet.unshift(
            {
              text: 'Error while update oder with txid',
              type: 'danger'
            }
          );
        }
      }
    );
  }

  addNoAccount() {
    this.progressSet.unshift(
      {
        text: 'No accounts in your wallet',
        type: 'info'
      }
    );
  }

  addConnectedWith(address: string) {
    this.progressSet.unshift(
      {
        text: 'Connected with ' + address.substring(0, 4) + '...' + address.substring(address.length - 4),
        type: 'success'
      }
    );
  }

  addInsufficientFund() {
    this.progressSet.unshift(
      {
        text: 'Insufficient fund',
        type: 'danger'
      }
    );
  }

  addErrorGetNonce() {
    this.progressSet.unshift(
      {
        text: 'Error getting nonce',
        type: 'danger'
      }
    );
  }

  addErrorSubmitPayment() {
    this.progressSet.unshift(
      {
        text: 'Error while submitting your payment',
        type: 'danger'
      }
    );
  }

  addApproveAllowance() {
    this.progressSet.unshift(
      {
        text: 'Allowance was approved',
        type: 'info'
      }
    );
  }

  tokenPocket() {
    console.log('window.ethereum=', window.ethereum);
    console.log('tokenPocket start');
    if (typeof window.ethereum.isTokenPocket === 'undefined') {
      const msg = 'TokenPocket Extension is not installed or you have metamask or okx wallet, please remove those web wallet extensions and try again!';
      alert(msg);
      return;
    }

    this.metamask('token pocket');
  }

  okxWallet() {
    if (typeof window.okxwallet === 'undefined') {
      const msg = 'OKX wallet Extension is not installed you have metamask or token pocket, please remove those web wallet extensions and try again!';
      alert(msg);
      return;
    }

    this.metamask('ok wallet');
  }

  fabWallet() {
    console.log('window=====', window);
    if (typeof window.fabwallet === 'undefined') {
      const msg = 'Fab wallet Extension is not installed you have metamask or token pocket, please remove those web wallet extensions and try again!';
      alert(msg);
      return;
    }

    this.metamask('fab wallet');
  }

  metamask(title: string = 'metamask') {
    this.progressSet.push(
      {
        text: 'Connecting with ' + title + ' ....',
        type: 'info'
      }
    );
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
      return;
    }
    const tokenId = token.ID;
    const tokenDecimals = token.DECIMALS;

    let type = this.type;
    const amount = this.amount;

    let amountBig = new BigNumber(amount).multipliedBy(new BigNumber(100)).shiftedBy(tokenDecimals);

    if (type == 'DNB') {
      // amountBig = new BigNumber(amount).multipliedBy(new BigNumber(15000)).shiftedBy(tokenDecimals);
      amountBig = amountBig.multipliedBy(new BigNumber(150));
    }

    const amountHex = '0x' + amountBig.toString(16).split('.')[0];
    this.web3Serv.switchChain(chainId).then(
      () => {
        this.web3Serv.getAccounts().then(
          (accounts) => {
            console.log('accounts===', accounts);
            if (!accounts || (accounts.length == 0)) {
              this.addNoAccount();
              return;
            }
            const address = accounts[0];

            this.addConnectedWith(address);

            this.web3Serv.getBalance(chain, address, tokenId).subscribe(
              {
                next: (ret: any) => {
                  this.nativeBalance = ret.native;
                  const tokenBalance = ret.tokenBalance;
                  if(amountBig.gt(new BigNumber(tokenBalance))) {
                    console.log('not enough balance');
                    this.addInsufficientFund();

                    return;
                  }

                  this.getNonce(chain, address).subscribe(
                    {
                      next: (nonce: string) => {
                        this.web3Serv.getAllowance(chain, address, tokenId, bondId).subscribe(
                          {
                            next:(allowance: any) => {
                              const allowanceBig = new BigNumber(allowance);
                              if(allowanceBig.isGreaterThanOrEqualTo(amountBig)) {
                                const {method, data} = this.getPayWithMethodData(email, chainId, tokenId, amountHex);
      
                                this.web3Serv.ethSendTransaction(method, chainId, address, bondId, '0x0', data, nonce).then(
                                  (txid: string) => {
                                    if(!txid) {
                                      this.addErrorSubmitPayment();
 
                                      return;
                                    }

                                    this.handleTxid(txid);
                                });
                              } else {
                                this.approveAndBuy(chainId, tokenId, bondId, amountHex, email, address, nonce);
                              }
                            },
                            error: (error: any) => {
                              this.approveAndBuy(chainId, tokenId, bondId, amountHex, email, address, nonce);
                            }
                          }
                        );
      
      
                      }
                    });

                },
                error: (error: any) => {
                  this.progressSet.unshift(
                    {
                      text: 'Error while getting balance',
                      type: 'danger'
                    }
                  );
                }
              });






          },
          (error: any) => {
            this.progressSet.unshift(
              {
                text: 'Error while getting your account',
                type: 'danger'
              }
            );
          }
        );
      },
      (error: any) => {
        this.progressSet.unshift(
          {
            text: error.message,
            type: 'danger'
          }
        );
      }
    );
  }

  approveAndPurchase(chainId, tokenId, bondId, email, amountHex, nonce, gas, gasPrice) {
    console.log('approveAndPurchase start');
    this.approve(chainId, tokenId, bondId, amountHex, nonce, gas, gasPrice).subscribe(
      {
        next: (ret) => {
          console.log('ret in approve===', ret);
          this.addApproveAllowance();
          nonce++;
          this.payWith(email, chainId, bondId, tokenId, amountHex, nonce, gas, gasPrice).subscribe(
            {
              next: (ret: any) => {
                console.log('ret in payWith=', ret);
                if(ret) {
                  let txid = ret;
                  if(Array.isArray(ret) && ret.length > 0) {
                    txid = ret[0];
                  }
                  this.handleTxid(txid);
                } else {
                  this.addErrorSubmitPayment();
                }
              },
              error: (error: any) => {
                this.addErrorSubmitPayment();
                this.whenPayFailed();
              }
            });
        },
        error: (error) => {
          this.addErrorSubmitPayment();
          this.whenPayFailed();

        }
      });
  }

  walletConnect(
    // email: string,
    // chain: string, // ETH, KANBAN, BNB
    // coin: string,  //USDT, USDC, DUSD
    // type: string,  //BOND, BONDNFT
    // amount: number
  ) {
    this.progressSet.push(
      {
        text: 'Connecting with wallet connect....',
        type: 'info'
      }
    );
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
    if (type == 'DNB') {
      amountBig = new BigNumber(amount).multipliedBy(new BigNumber(15000)).shiftedBy(tokenDecimals);
    }

    const amountHex = '0x' + amountBig.toString(16).split('.')[0];

    this.walletServ.connectWalletNew(chainId).subscribe(
      {
        next: (address: string) => {
          this.addConnectedWith(address);
          this.web3Serv.getBalance(chain, address, tokenId).subscribe(
            {
              next: (ret: any) => {
                console.log('ret===', ret);
                this.nativeBalance = ret.native;
                const tokenBalance = ret.tokenBalance;
                if(amountBig.gt(new BigNumber(tokenBalance))) {
                  this.addInsufficientFund();
                  return;
                }

                this.getNonce(chain, address).subscribe(
                  {
                    next: (nonce: any) => {
                      console.log('nonce===', nonce);
                      this.web3Serv.getAllowance(chain, address, tokenId, bondId).subscribe(
                        {
                          next:(allowance: any) => {
                            console.log('allowance===', allowance);
                            const allowanceBig = new BigNumber(allowance);
                            if(allowanceBig.isGreaterThanOrEqualTo(amountBig)) {
                              this.payWith(email, chainId, bondId, tokenId, amountHex, nonce, gas, gasPrice).subscribe(
                                {
                                  next: (ret: any) => {
                                    console.log('ret in paywith=', ret);
                                    if(ret) {
                                      let txid = ret;
                                      if(Array.isArray(ret) && ret.length > 0) {
                                        txid = ret[0];
                                      }
                                      this.handleTxid(txid);
                                    } else {
                                      this.addErrorSubmitPayment();
                                    }
                                    /*
                                    this.isPayDone = true;
                                    this.isPayClicked = false;
                                    this.isPaySuccess = true;
        
                                    this.isPayProcessing = false;
                                    this.walletServ.updateIsScanQR(false);
                                    */

                                    //
                                  },
                                  error: (error: any) => {
                                    let message;
                                    if(error.message) {
                                      message = error.message;
                                    }
                          
                                    this.progressSet.unshift({
                                      text: message,
                                      type: 'danger'
                                    });
                                  }
                                });
                            } else {
                              this.approveAndPurchase(chainId, tokenId, bondId, email, amountHex, nonce, gas, gasPrice);
                            }
                          },
                          error: (error: any) => {
                            this.approveAndPurchase(chainId, tokenId, bondId, email, amountHex, nonce, gas, gasPrice);
                          }
                        });
      
      
      
      
                    },
                    error: (error) => {
                      this.addErrorGetNonce();
                    }
                  }
                );

              },
              error: (error: any) => {
                let message;
                if(error.message) {
                  message = error.message;
                }
      
                this.progressSet.unshift({
                  text: message,
                  type: 'danger'
                });

              }
            }
          );


        },
        error: (error) => {
          console.log('error of=', error);
          //this.addNoAccount();
          let message = error;

          if(error.message) {
            message = error.message;
          }

          this.progressSet.unshift({
            text: message,
            type: 'danger'
          });

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

    /*
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
    */
    const data = Web3EthAbi.encodeFunctionCall(func, args);

    let to = smartContractAddress;
    let method = 'eth_sendTransaction';
    if (chainId == '212' || chainId == '211') {
      //to = environment.COINPOOL_ADDRESS;
      method = 'kanban_sendTransaction';
    }

    return { method, to, data };
  }

  approve(chainId: string, smartContractAddress, spender, value, nonce, gas, gasPrice) {

    const { method, to, data } = this.getApproveMethodToData(chainId, smartContractAddress, spender, value);
    return this.walletServ.ethSendTransaction(method, chainId, to, '0x0', data, nonce, gas, gasPrice);
  }
}
