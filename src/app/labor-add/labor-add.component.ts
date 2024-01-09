import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BerthService } from '../service/berth/berth.service';
import { DesignationService } from '../service/designation/designation.service';
import { LaborService } from '../service/labor/labor.service';

@Component({
  selector: 'app-labor-add',
  templateUrl: './labor-add.component.html',
  styleUrls: ['./labor-add.component.css']
})
export class LaborAddComponent implements OnInit {

  laborCategories: any;
  berth_operator_id: string;
  designationCategories: any;
  entry_pass_no: any;
  name: any;
  present_address: any;
  permanent_address: any;
  date_of_birth: any;
  date_of_joining: any;
  phone: any;
  labor_type_id: string;
  designation_category_id : string;
  expiration_date: any;
  nid: any;
  berthOperators:any;

  user_role_id: number;
  org_id: number;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private laborService: LaborService,
    private designationService: DesignationService,
    private berthService: BerthService
  ) { 
      this.labor_type_id = '';
      this.designation_category_id = '';
      this.berth_operator_id = '';

      if(localStorage['userRoleId']=='3')
        this.berth_operator_id = localStorage['org_id'];
      else
        this.berth_operator_id = '';

      this.user_role_id = 0;
      this.org_id = 0;
  }

  ngOnInit(): void {

    if(localStorage['status']!=1)
    {
      // console.log("### User logged out already ### ");
      this.router.navigate(['/login']);
      this.toastr.error('Login and try again.', 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      return;
    }

    this.user_role_id=localStorage['userRoleId'];
    this.org_id=localStorage['org_id'];

    this.berthService.getBerthOperatorList().subscribe(data => {
      //console.log(data);
      this.berthOperators = data;
    }, err => {
      //console.log(err);
      this.toastr.error(err.error.message, 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
    });

    this.laborService.getLaborCategoryList().subscribe(data => {
      //console.log(data);
      this.laborCategories = data;
    });

    this.designationService.getDesignationCategoryList().subscribe(data => {
      //console.log(data);
      this.designationCategories = data;
    });

  }

  addLaborInfo(newValue: string) {
    if (newValue.length === 13) {
      // add org_id as parameter to get labor of that org
      var orgId = localStorage['org_id'];
      // console.log("Entry with org id");
      this.laborService.getLaborByEntryPassNo(newValue,orgId).subscribe(data => {
        // console.log("Entry pass return data");
        //console.log(data);
        this.name = data.name;
        this.phone = data.phone;
        this.nid = data.nid;
        this.expiration_date = data.expiration_date;
        this.date_of_birth=data.date_of_birth;
        this.present_address=data.present_address;
        this.permanent_address=data.permanent_address;
      }, err => {
        //console.log(err);
        this.toastr.error(err.error.message, 'Error',{
          // timeOut:5000,
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

  onBerthOperatorChange(id: string) {
    //console.log(id);
  }

  onSubmit() {
    // let data = {
    //   date_of_birth: this.date_of_birth,
    //   date_of_joining: this.date_of_joining,
    //   entry_pass_no: this.entry_pass_no,
    //   berth_operator_id: this.berth_operator_id,
    //   name: this.name,
    //   labor_type_id: this.labor_type_id,
    //   designation_category_id: this.designation_category_id,
    //   present_address: this.present_address,
    //   permanent_address: this.permanent_address,
    //   phone: this.phone,
    //   nid: this.nid
    // }

    let data = {
      entry_pass_no: this.entry_pass_no,
      name: this.name,
      nid: this.nid,
      permanent_address: this.permanent_address,
      berth_operator_id: this.berth_operator_id,
      labor_type_id: this.labor_type_id,

      date_of_birth: this.date_of_birth,
      expiration_date: this.expiration_date,
      phone: this.phone,
      present_address: this.present_address,
      date_of_joining: this.date_of_joining,
      designation_category_id: this.designation_category_id,

      org_id:this.berth_operator_id
    }

    //console.log("labor data");
    //console.log(data);
    // return;
    this.laborService.addLabor(data).subscribe(data => {
      //console.log(data);
      this.toastr.warning(data.message, 'Success',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      this.router.navigate(['labor/list']);
    }, err => {
      //console.log(err);
      this.toastr.error(err.error.message, 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
    });
  }

  onDesignationCategoryChange(id: string) {
    //console.log(id);
  }

  onLaborCategoryChange(id: string) {
    //console.log(id);
  }

}
