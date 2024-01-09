import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { RoleService } from '../service/role/role.service';
import { OrganizationService } from '../service/organization/organization.service';

import * as shajs from 'sha.js'; 

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  loginId: any;
  password: any;
  uName: any;
  email: any;
  userRole: any;
  organization: any;
  mobileNo: any;
  telephone: any;
  address: any;

  roles: any[];
  orgList: any[];

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private roleService: RoleService,
    private organizationService: OrganizationService
  ) {
    this.loginId = '';
    this.password = '';
    this.uName = '';
    this.email = '';
    this.userRole = '';
    this.organization = '';
    this.mobileNo = '';
    this.telephone = '';
    this.address = '';

    this.roles = [];
    this.orgList = [];
   }

  ngOnInit(): void {
    // var sha1Val = shajs('sha1').update(this.password).digest('hex');
    this.fetchRoleList();
    this.fetchOrganizationList();
  }

  fetchRoleList(): void{
    this.roleService.getRoleList().subscribe(data => {
      // console.log(data.id);
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

  fetchOrganizationList(): void{
    this.organizationService.getOrganizationList().subscribe(data => {
      // console.log(data.id);
      this.orgList = data;
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

  saveUser(){
    var sha1Val = shajs('sha1').update(this.password).digest('hex');

    let UserAddData = {
      loginId : this.loginId,
      loginPassword : sha1Val,
      ptext : this.password,
      uname : this.uName,
      email : this.email,
      roleId : this.userRole,
      orgId : this.organization,
      mobileNo : this.mobileNo,
      telephoneNo : this.telephone,
      address : this.address,
      entryBy : localStorage.getItem('loginId')
    }

    console.log("UserAddData");
    console.log(UserAddData);

    this.userService.addUser(UserAddData).subscribe(data => {

      this.toastr.success(data.message, 'Success',{
        timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      this.router.navigate(['user/list']);
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, err.error.message,{
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
