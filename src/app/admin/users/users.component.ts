import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  pageSize = 10;
  pageNum = 0;

  constructor(private userServ: MemberService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.userServ.getAll(this.pageSize, this.pageNum).subscribe(
      (ret: any) => {
        if(ret.success) {
          this.users = ret.data.users;
          console.log('this.users===', this.users);
        }
        
      }
    );
  }

  next() {
    if(this.users && this.users.length == this.pageSize) {
      this.pageNum ++;
      this.getAll();
    }
  }

  prev() {
    if(this.pageNum >= 1) {
      this.pageNum --;
      this.getAll();
    }
  }
}
