import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  email: string;
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  getStarted() {
    this.route.navigate(['/signup']);
  }
  
}
