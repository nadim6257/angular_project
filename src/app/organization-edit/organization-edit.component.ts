import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../service/organization/organization.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.css']
})
export class OrganizationEditComponent implements OnInit {

  orgId: any;

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
    private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService,
    private toastr: ToastrService
  ) {
    this.orgId = '';

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

    this.orgId = this.activatedRoute.snapshot.params['id'];
    this.organizationService.getOrganizationById(this.orgId).subscribe(data =>{

      this.orgName = data.organizationName;
      this.orgType = data.orgTypeId;
      this.licNo = data.licenseNo;
      this.licValidityDate = data.licenceValidityDate;
      this.addressOne = data.address1;
      this.addressTwo = data.address2;
      this.ainNo = data.ainNo;
      this.email = data.email;
      this.cellPhone = data.cellNo1;
      this.faxNo = data.faxNo;
      this.telephone = data.telephoneNoLand;
      this.website = data.url;
    });
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

  updateOrg(){
    let OrgUpdateData = {
      id: this.orgId,
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
      lastUpdateById: localStorage.getItem('loginId')
    }

 console.log(OrgUpdateData);

    this.organizationService.editOrganization(OrgUpdateData).subscribe(data => {

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
