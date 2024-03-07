import { Component,OnInit  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ViewportScroller } from "@angular/common";


@Component({
  templateUrl: './about-bond.component.html',
  styleUrls: ['./about-bond.component.scss']
})
export class AboutBondComponent implements OnInit {
  constructor(private translate: TranslateService,
    private scroller: ViewportScroller, 
    ) {}

  pageTxt: any;

  ngOnInit() {
    // this.translate.get('about-page').subscribe((res: any) => {
    //   this.pageTxt = res;

    //   console.log("pageTxt: ", this.pageTxt);
      
    // });
  }

  scrollTo(id: string) {
    this.scroller.scrollToAnchor(id);
  }
}

