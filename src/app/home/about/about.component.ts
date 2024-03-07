import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanService } from 'src/app/services/lan.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  currentLan = 'en';

  constructor(translate: TranslateService, lanServ: LanService) {
    lanServ.currentMessage.subscribe(lan => this.currentLan = lan);
  }

  ngOnInit(): void {
  }

}
