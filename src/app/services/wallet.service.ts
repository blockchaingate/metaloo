import { Injectable } from '@angular/core';
import SignClient from "@walletconnect/sign-client";

import { Subject } from 'rxjs';
import {ApiService} from './api.service';
import { WalletConnectModal } from '@walletconnect/modal'
import { Observable, BehaviorSubject } from 'rxjs'
import { LoggingService } from './logging.service';

/*
const relayUrl = 'wss://api.biswap.com';
const projectId = '3acbabd1deb4672edfd4ca48226cfc0f';
*/


const projectId = '3acbabd1deb4672edfd4ca48226cfc0f';
//const relayUrl = null;



/*
const chainId = 'eip155:5';
const chains = [
  //"eip155:fab",
  chainId
];
*/
const methods = [
  'eth_sendTransaction',
  'eth_signTransaction',
  'eth_sign',
  "kanban_sendTransaction",
  "personal_sign"
]
const metadata = {
  name: "DNB Dapp",
  description: "The first digital national bond in the world",
  url: "#",
  icons: ["https://walletconnect.com/walletconnect-logo.png"],
};
@Injectable({
  providedIn: 'root',
})
export class WalletService {
  session: any;
  client: any;
  account: string = '';
  topic: any;
  chainId: string = '';
  accountSubject = new Subject<string>();

  //use to check if user scan QR code
  private scanSubject = new BehaviorSubject<boolean>(false);
  isScanQR$ = this.scanSubject.asObservable();

  updateIsScanQR(newData: boolean) {

    this.scanSubject.next(newData);

    //log
    this.logServ.log('isScanQR$ updated: ' + newData);
  }

  constructor(
    private logServ: LoggingService,
    private api: ApiService
  ) {}


  disconnect() {
    const address = '';
    this.account = address;
    this.accountSubject.next(address);

    if(this.client) {
      this.client.disconnect({
        topic: this.topic,
        projectId,
        //relayUrl,
        metadata 
      });
    }

  }
  connectWalletNew(chainId: number,
    //  setQRAfterScaned: () => void 
     ) 
 {
    const chain = 'eip155:' + chainId;
    let walletConnectModal;
    const observable = new Observable((subscriber) => {
      SignClient.init({
        projectId,
        metadata}).then(
          (client: any) => {
            this.client = client;
            client.on("session_event", (args) => {
              console.log('session_event start');
                const id = args.id;
                const ddd = args.params;
                const topic = args.topic;
                this.topic = topic;
                // Handle session events, such as "chainChanged", "accountsChanged", etc.
                
            });
              
            client.on("session_update", ({ topic, params }) => {
              console.log('session_update start');
                const { namespaces } = params;
                const _session = client.session.get(topic);
                // Overwrite the `namespaces` of the existing session with the incoming one.
                const updatedSession = { ..._session, namespaces };
                // Integrate the updated session state into your dapp state.
            });
              
            client.on("session_delete", () => {
              console.log('session_delete start');
                // Session was deleted -> reset the dapp state, clean up from user session, etc.
            });  



            const params = {
              //projectId,
              // Provide the namespaces and chains (e.g. `eip155` for EVM-based chains) we want to use in this session.
              requiredNamespaces: {
                eip155: {
                  methods,
                  chains: [chain],
                  events: [],
                },
              },
              //pairingTopic: "7ce045ff0f1153be2fcb03d4e9e41beec4c4afc1de993d232b7f37ef231416bd"
            };

            //const found = this.client.find(params);
            //console.log('before connect, found=', found);
            //await this.showQrcode();
            
            this.client.connect(params).then(
              (connected: any) => {
                const uri = connected.uri;
                const approval = connected.approval;
                if(uri) {
                  walletConnectModal = new WalletConnectModal({
                    projectId
                  });
          
                  walletConnectModal.openModal({ uri });
                  approval().then(
                    (session: any) => {
                      this.session = session;
                      //QRCodeModal.close();
                      const accounts = session.namespaces.eip155.accounts;
                      console.log('accounts=', accounts);
                      if(accounts && (accounts.length > 0)) {
                        const account = accounts[0];
                        const [namespace, reference, address] = account.split(":");
                        this.chainId = namespace + ':' + reference;
                        this.account = address;
                        this.accountSubject.next(address);
                        subscriber.next(address);
                      }

                      //close QR Code Modal
                      walletConnectModal.closeModal();
                      
                      //set QR After Scaned
                      this.updateIsScanQR(true);
                    
                    }
                  ).catch(error => {
                    subscriber.error(error);
                    if(walletConnectModal) {
                      walletConnectModal.closeModal();
                    }
                    
                  });;
                }
              }
              /*
              ,
              (error: any) => {
                console.log('error for connecting', error);
                subscriber.error(error);
              }
              */
            ).catch(error => {
              console.log('error2 for connecting', error);
              subscriber.error(error);
              if(walletConnectModal) {
                walletConnectModal.closeModal();
              }
            });




          }
        ).catch(err => {
          console.log('err====', err);
          subscriber.error(err);
        });

  
        


    });


    return observable;
  }


  getTransactionCount(chain, address) {
    const url = chain.toLowerCase() + '/nonce';
    const observable = new Observable((subscriber) => {
      this.api.postPublic(url, {native: address}).subscribe({
        next: (ret: any) => {
          if(ret.success) {
            const nonce = ret.data;
            subscriber.next(nonce);
          }
        },
        error: (error) => {

        }
    });

    });

    return observable;

  }

  ethSendTransaction(method, chainId, to, value, data, nonce, gas, gasPrice) {
    const chain = 'eip155:' + chainId;
    const observable = new Observable((subscriber) => {
      const client = this.client;

      const session = this.session;



      const requestBody = {
        topic: session.topic,
        chainId: chain,
        request: {
          method: method,
          params: [
            {
              from: this.account,
              to,
              nonce,
              gasLimit: gas,
              gasPrice,
              value, 
              data
            }
          ],
        },
      };

      client.request(requestBody).then(
        result => {
          console.log('result====', result);
          subscriber.next(result);
        }
      );

    });

    return observable;
  }
  
  async personal_sign(chainId, data: string) {
    const chain = 'eip155:' + chainId;
    const client = this.client;

    const session = this.session;


    const requestBody = {
      topic: session.topic,
      chainId: chain,
      request: {
        method: 'personal_sign',
        params: [data, this.account],
      },
    };

    const result = await client.request(requestBody);

    return result;
  }


  getAll(pageSize: number, pageNum: number) {
    return this.api.getPrivate('wallet/' + pageSize + '/' + pageNum);
  }

  getMine() {
    return this.api.getPrivate('wallet');
  }
}
