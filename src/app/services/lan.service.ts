import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class LanService {
  private messageSource = new BehaviorSubject('en');
  currentMessage: Observable<string> = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    console.log('Change language to: ' + message);
    this.messageSource.next(message);
  }
}