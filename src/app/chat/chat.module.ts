import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';
import { SvgComponent } from './components/svg/svg.component';
import { ChatOverviewComponent } from './components/chat-overview/chat-overview.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/message/message.component';
import { SquareIconComponent } from './components/square-icon/square-icon.component';
@NgModule({
  declarations: [
    ChatComponent,
    SvgComponent,
    ChatOverviewComponent,
    MessagesComponent,
    MessageComponent,
    SquareIconComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ]
})
export class ChatModule { }
