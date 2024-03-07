import { Injectable } from '@angular/core';
import { Router,RoutesRecognized, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, BehaviorSubject, Observable } from 'rxjs';
 /** A router wrapper, adding extra functions. */
@Injectable()
export class RouterExtService {
  
  private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public previousUrl$: Observable<string> = this.previousUrl.asObservable();

  private currentUrl: string = '';
  constructor(private router : Router) {

    this.currentUrl = this.router.url;
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      //if(this.currentUrl != '/signup' && this.currentUrl != '/signin') {
        this.setPreviousUrl(this.currentUrl);
      //}

      
      
      this.currentUrl = event.url;
      console.log("RouterExtService: currentUrl=", this.currentUrl);
    });

  }

  setPreviousUrl(previousUrl: string) {
    this.previousUrl.next(previousUrl);
  }
 
}