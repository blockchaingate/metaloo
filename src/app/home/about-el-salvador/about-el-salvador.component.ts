import { ViewportScroller } from "@angular/common";
import { Component, OnInit, VERSION } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  templateUrl: './about-el-salvador.component.html',
  styleUrls: ['./about-el-salvador.component.scss']
})
export class AboutElSalvadorComponent {
  constructor(
    private scroller: ViewportScroller, 
    private router: Router
  ) { }


  scrollTo(id: string) {
    this.scroller.scrollToAnchor(id);
  }
}
