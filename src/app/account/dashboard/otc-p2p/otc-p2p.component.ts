import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otc-p2p',
  templateUrl: './otc-p2p.component.html',
  styleUrls: ['./otc-p2p.component.scss']
})
export class OtcP2pComponent implements OnInit {
  quantity: number = 0;
  fiat: string = "USD"; 
  
  fiats = [
    {
      "text": "USD", "value": "1.0"
    },
    {
      "text": "CAD", "value": "0.8"
    },
  ];
  payment: string = "Bank Transfer";
  payments = [
    {
      "text": "Bank Transfer", "value": "1.0"
    },
    {
      "text": "PayPal", "value": "0.8"
    },
  ];
  region: string = "North America";
  regions = [
    {
      "text": "North America", "value": "1.0"
    },
    {
      "text": "Europe", "value": "0.8"
    },
  ];

  providers = [
    { 
      "name": "John Trader",
      "rating": 4.5,
      "price": 1.34,
      "fiat": "USD",
      "payment": "Bank Transfer",
      "region": "North America",
      "limit": 10000,
      "verified": true,
      "avaliabile": 2262.84,
      "orders": 153,
      "completion": 98.6
    },
    {
      "name": "Don Exchange",
      "rating": 4.5,
      "price": 1.35,
      "fiat": "USD",
      "payment": "Bank Transfer",
      "region": "North America",
      "limit": 8000,
      "verified": true,
      "avaliabile": 1362.84,
      "orders": 178,
      "completion": 93.5
    },
    {
      "name": "Hood Trader",
      "rating": 4.8,
      "price": 1.36,
      "fiat": "USD",
      "payment": "Paypal",
      "region": "North America",
      "limit": 6000,
      "verified": true,
      "avaliabile": 462.84,
      "orders": 178,
      "completion": 93.5
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  refresh(){}

}
