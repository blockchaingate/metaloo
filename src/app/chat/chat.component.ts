import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Message } from 'src/app/interfaces/message';
//import { ToastService } from 'src/app/services/toast.service';
import { ApiService } from '../services/api.service';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  prompt: string = '';
  messages: Message[] = [];
  chat_id: number = 0;
  user: string = '';

  constructor(
    private apiServ: ApiService, 
    private route: ActivatedRoute, 
    private storage: StorageMap,
    //private toastServ: ToastService
    ) {

      this.storage.get('user').subscribe((user: any) => {
        this.user = user;
      });

  }

  sendMessage() {
    const data = {
      text: this.prompt
    };
    this.messages.push({
      user: this.user,
      text: this.prompt,
      type: 'text'      
    });
    this.prompt = '';
    this.apiServ.postPublic('chat', data).subscribe(
      {
        next: (ret) => {
          if(ret.success) {
            const data = ret.data;
            if(this.chat_id != data.chat_id) {
              this.chat_id = data.chat_id;
            }
            this.messages.push({
                user: 'M',
                text: data.content,
                type: this.chat_id == -1 ? 'image' : 'text'    
            });
  
          } else {
            //return this.toastServ.changeMessage({show: true, success: false, title: '对话失败', content: ret.error});
          }
        },
        error: (error) => {
          console.log('error=', error);
          //return this.toastServ.changeMessage({show: true, success: false, title: '对话失败', content: error.error});
        },
      }
    );
  }

}
