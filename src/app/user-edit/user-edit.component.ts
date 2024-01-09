import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { RoleService } from '../service/role/role.service';
import { OrganizationService } from '../service/organization/organization.service';

import * as shajs from 'sha.js';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userId: any;

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
    private organizationService: OrganizationService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.userId = '';

    this.loginId = '';
    // this.password = '';
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
    this.fetchRoleList();
    this.fetchOrganizationList();

    this.userId = this.activatedRoute.snapshot.params['id'];
    this.userService.getUserById(this.userId).subscribe(data =>{
      console.log(data);

      this.loginId = data.loginId;
      this.uName = data.uname;
      this.email = data.email;

      this.userRole = data.role.id;
      this.organization = data.organizationProfile.id;

      this.mobileNo = data.mobileNo;
      this.telephone = data.telephoneNo;
      this.address = data.address;
    });
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

  updateUser(){

    var blankPass = 'password';

    let UserUpdateData = {
      id:  this.userId,
      loginId : this.loginId,
      loginPassword: blankPass,
      uname : this.uName,
      email : this.email,
      roleId : this.userRole,
      orgId : this.organization,
      mobileNo : this.mobileNo,
      telephoneNo : this.telephone,
      address : this.address,
      updateBy : localStorage.getItem('loginId')
    }

    console.log("UserUpdateData");
    console.log(UserUpdateData);

    this.userService.editUser(UserUpdateData).subscribe(data => {

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
