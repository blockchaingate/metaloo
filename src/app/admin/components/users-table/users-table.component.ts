import { Component, Input, OnInit } from '@angular/core';
import { log } from 'console';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss',
  '../../../table.scss']
})
export class UsersTableComponent implements OnInit{
  @Input() users: User[];
  hasData: boolean = false;
  constructor(
    ) { }

  ngOnInit(): void {
    // check if users is empty
    if(this.users && this.users.length > 0) {
      // console.log('users==', this.users);
      this.hasData = true;
    }else{
      // console.log('No users');
      this.hasData = false;

    }

  }

  //on users change
  ngOnChanges() {
    // check if users is empty
    if(this.users && this.users.length > 0) {
      // console.log('ngOnChanges users==', this.users);
      this.hasData = true;
    }else{
      // console.log('ngOnChanges No users');
      this.hasData = false;

    }
  }
}
