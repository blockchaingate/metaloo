import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
const ABI = '';
declare const window: any;
import Web3 from 'web3';
@Injectable()
export class Web3Service {
  private contractAddress = "your Contract Address";
  public contractInstance: any;
  public web3Instance: any;

  constructor(private http: HttpClient) {}
  public ethEnabled() {
    if (window.ethereum) {
      //await window.ethereum.request({method: 'eth_requestAccounts'});
      window.web3 = new Web3(window.ethereum);
      return true;
    }
    return false;
  }

  public initContractInstance() {
    //this.contractInstance = new this.web3Instance.eth.Contract(ABI, this.contractAddress);
  }


  public getAccounts(): Promise<any> {
    return window.ethereum.request({method: 'eth_requestAccounts'})
  }

  public switchChain(chainId) {
    const chainidHex = '0x' + chainId.toString(16);
    return window.ethereum.request({method: 'wallet_switchEthereumChain', params: [{ chainId: chainidHex }]})
  }

  getAllowance(chain: string, owner: string, tokenId: string, bondId: string) {
    const ret = new Observable<any>((subscriber: any) => {
      let allowance = 'allowance';
      if(chain == 'KANBAN') {
        allowance = 'allowanceOld';
      }
      const url = environment.API + chain.toLowerCase() + '/' + allowance + '/' + tokenId + '/' + owner + '/' + bondId;
      this.http.get(url).subscribe({
        next: (ret: any) => {
          if(ret.success) {
            const allowance = ret.data;
            subscriber.next(allowance);
          } else {
            subscriber.error('cannot get allowance');
          }
        }, 
        error: (error: any) => {
          subscriber.error(error);
        }
      });
      
    });

    return ret;
  }



  getBalance(chain: string, address: string, tokenId: string) {
    const ret = new Observable<any>((subscriber: any) => {
      const tokens = [tokenId];
      const url = environment.API + chain.toLowerCase() + '/balance';
      const data = {
        native: address,
        tokens
      };

      this.http.post(url, data).subscribe({
        next: (ret: any) => {
          if(ret.success) {
            const data = ret.data;
            const tokens = data.tokens;

            const ids = tokens.ids;
            const balances = tokens.balances;

            let tokenBalance = 0;
            for(let i = 0; i < ids.length; i++) {
              const id = ids[i];
              if(id == tokenId) {
                tokenBalance = balances[i];
                break;
              }
            }
            subscriber.next({native: data.native, tokenBalance});
          } else {
            subscriber.error('cannot get allowance');
          }
        }, 
        error: (error: any) => {
          subscriber.error(error);
        }
      });
    });

    return ret;
  }

  public ethSendTransaction(method, chainId, from, to, value, data, nonce) {
    let gasPrice = 0;
    let gasLimit = 0;
    if(chainId == environment.CHAINS.ETH.ID) {
      gasPrice = environment.CHAINS.ETH.GAS_PRICE;
      gasLimit = environment.CHAINS.ETH.GAS_LIMIT;
    } else
    if(chainId == environment.CHAINS.BNB.ID) {
      gasPrice = environment.CHAINS.BNB.GAS_PRICE;
      gasLimit = environment.CHAINS.BNB.GAS_LIMIT;
    } else
    if(chainId == environment.CHAINS.KANBAN.ID) {
      gasPrice = environment.CHAINS.KANBAN.GAS_PRICE;
      gasLimit = environment.CHAINS.KANBAN.GAS_LIMIT;
    }
    const param = {
        from,
        to,
        data,
        value,
        nonce,
        gasPrice: '0x' + new BigNumber(gasPrice).shiftedBy(9).toString(16),
        gas: '0x' + new BigNumber(gasLimit).toString(16)
    }

    return window.ethereum.request({method: 'eth_sendTransaction', params: [param]})
  }

  public signUp(account: string): Promise<any> {
    return this.contractInstance.methods.signUp()
      .send({ from: account, value: this.web3Instance.utils.toWei(10, 'ether') })
  }
}