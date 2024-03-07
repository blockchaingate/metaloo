import { Component, OnInit, Input } from '@angular/core';
import { Coin } from 'src/app/interfaces/coin.interface';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {
  @Input() coin: Coin;
  constructor() { }

  ngOnInit(): void {
  }

}
