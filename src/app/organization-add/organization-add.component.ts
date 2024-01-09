import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../service/organization/organization.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-add',
  templateUrl: './organization-add.component.html',
  styleUrls: ['./organization-add.component.css']
})
export class OrganizationAddComponent implements OnInit {

 orgName: any;
  orgType: any;
  licNo: any;
  licValidityDate: any;
  addressOne: any;
  addressTwo: any;
  ainNo: any;
  email: any;
  cellPhone: any;
  faxNo: any;
  telephone: any;
  website: any;

  orgTypeList: any[];

  constructor(
    private router: Router,
    private organizationService: OrganizationService,
    private toastr: ToastrService
  ) {
    this.orgName = '';
    this.orgType = '';
    this.licNo = '';
    this.licValidityDate = '';
    this.addressOne = '';
    this.addressTwo = '';
    this.ainNo = '';
    this.email = '';
    this.cellPhone = '';
    this.faxNo = '';
    this.telephone = '';
    this.website = '';

    this.orgTypeList = [];
   }

  ngOnInit(): void {
    this.fetchOrgTypeList();
  }

  fetchOrgTypeList(): void{
    this.organizationService.getOrganizationTypeList().subscribe(data => {
      this.orgTypeList = data;
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

  saveOrg(){
    let OrgAddData = {
      orgTypeId: this.orgType,
      organizationName: this.orgName,
      ainNo: this.ainNo,
      ainNoNew: this.ainNo,
      licenseNo: this.licNo,
      licenceValidityDate: this.licValidityDate,
      address1: this.addressOne,
      address2: this.addressTwo,
      telephoneNoLand: this.telephone,
      cellNo1: this.cellPhone,
      email: this.email,
      faxNo: this.faxNo,
      url: this.website,
      lastUpdateById: localStorage.getItem('loginId'),
      enteredBy: localStorage.getItem('loginId')
    }
//  console.log(OrgAddData);
    this.organizationService.addOrganization(OrgAddData).subscribe(data => {

      // console.log(data);

      this.toastr.success(data.message, 'Success',{
        timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      this.router.navigate(['organization/list']);
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
