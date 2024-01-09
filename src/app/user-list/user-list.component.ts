import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  filterTerm: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) { 
    this.users = [];
  }

  ngOnInit(): void {
    if (localStorage['status'] != 1) {
     
      this.router.navigate(['/login']);
      this.toastr.error('Login and try again.', 'Error', {
        timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });
      return;
    }

    this.fetchUserList();
  }

  fetchUserList():void{
    this.userService.getUserList().subscribe(data => {
      // console.log("user list");
      // console.log(data.id);
      this.users = data;
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error', {
        timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });
    });
  }

  deleteUser(id: number){
    if(confirm('Do you want to delete this user?')){
      this.userService.deleteUser(id).subscribe(data => {

        this.toastr.success(data.message, data.message,{
          timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });
        // this.router.navigate(['role/list']);
        location.reload();
      }, err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error',{
          timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });
      });
    }
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onSearchInput(){
    this.page = 1;
  }

}
