import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role/role.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roles: any[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  filterTerm: any;

  constructor(
    private router: Router,
    private roleService: RoleService,
    private toastr: ToastrService
  ) { 
    this.roles = [];
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

    this.fetchRoleList();
  }

  fetchRoleList(): void{
    this.roleService.getRoleList().subscribe(data => {
      console.log(data.id);
      this.roles = data;
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

  deleteRole(id: number) {

    if(confirm('Do you want to delete this role?')){
      this.roleService.deleteRole(id).subscribe(data => {

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
