import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GatefiService } from 'src/app/services/gatefi.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gatefi',
  templateUrl: './gatefi.component.html',
  styleUrls: ['./gatefi.component.scss']
})
export class GatefiComponent implements OnInit{
  code: string;
  urlSafe: SafeResourceUrl;
  constructor(
    private sanitizer: DomSanitizer,
    private gatefiServ: GatefiService,
    private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
        this.code =  params.get('code');
        this.gatefiServ.pay(this.code).subscribe(
          (ret: any) => {
            console.log('ret===', ret);
            if(ret.success) {
              this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(ret.data);
            }
          }
        );
    });
  }
}
