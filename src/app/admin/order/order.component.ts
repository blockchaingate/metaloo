// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { OrderService } from 'src/app/services/order.service';

// @Component({
//   selector: 'app-admin-order',
//   templateUrl: './order.component.html',
//   styleUrls: ['./order.component.scss']
// })
// export class OrderComponent implements OnInit{
//   //get id from url
//   id: string;


//   order: any;
//   code: string;
//   constructor(
//     private route: ActivatedRoute,
//     private orderServ: OrderService
//     ) {

//   }
//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.id = params['id'];
//       console.log('ID from URL:', this.id);
//     });

    
//     // this.route.paramMap.subscribe( paramMap => {
//     //   const code = paramMap.get('code');
//     //   this.code = code;
//     //   this.orderServ.getByCode(code).subscribe(
//     //     ret => {
//     //       if(ret.success) {
//     //         this.order = ret.data;
//     //       }
//     //     }
//     //   );
//     // });
//   }

//   // confirmTrade() {
//   //   this.orderServ.confirmTrade(this.code).subscribe(
//   //     (ret: any) => {
//   //       if(ret.success) {
//   //         const order = ret.data;
//   //         this.order.status = order.status;
//   //       }
//   //     }
//   //   );
//   // }
// }
