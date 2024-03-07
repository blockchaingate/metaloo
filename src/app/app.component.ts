import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   console.log('NavigationEnd:', event);
    //   // You can access the activated route's parameters and data here
    //   console.log('Route params:', this.activatedRoute.snapshot.params);
    //   console.log('Route data:', this.activatedRoute.snapshot.data);
    // });
  }
  
  title = 'my-app';
}

