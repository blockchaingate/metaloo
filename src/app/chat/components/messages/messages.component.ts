import { Component, Input } from '@angular/core';
import { Message } from 'src/app/interfaces/message';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  @Input() messages: Message[] = [];
}
