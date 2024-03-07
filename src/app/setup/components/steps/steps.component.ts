import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit{
  //accept 1 input "step" from parent component
  @Input() step: number;

  constructor() { }


  ngOnInit(): void {
    console.log("Step:" + this.step);
    
  }

}
