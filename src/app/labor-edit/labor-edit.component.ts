import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BerthService } from '../service/berth/berth.service';
import { DesignationService } from '../service/designation/designation.service';
import { LaborService } from '../service/labor/labor.service';

@Component({
  selector: 'app-labor-edit',
  templateUrl: './labor-edit.component.html',
  styleUrls: ['./labor-edit.component.css']
})
export class LaborEditComponent implements OnInit {

  laborCategories: any;
  berth_operator_id: any;
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
  nid: any;
  laborId: any;
  berthOperators: any;
  expiration_date: any;
  user_role_id: number;
  org_id: number;

  labor: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private laborService: LaborService,
    private designationService: DesignationService,
    private activatedRoute: ActivatedRoute,
    private berthService: BerthService
  ) {
    this.labor_type_id = '';
    this.designation_category_id = '';

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
      console.log(data);
      this.berthOperators = data;
    }, err => {
      console.log(err);
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

    this.laborId = this.activatedRoute.snapshot.params['id'];

    this.laborService.getLaborCategoryList().subscribe(data => {
      console.log(data);
      this.laborCategories = data;
    });

    this.designationService.getDesignationCategoryList().subscribe(data => {
      console.log(data);
      this.designationCategories = data;
    });

    this.laborService.getLaborById(this.laborId).subscribe(data => {
      console.log(data);
      this.labor = data;
      this.entry_pass_no = this.labor.entry_pass_no;
      this.name = this.labor.name;
      this.present_address = this.labor.present_address;
      this.permanent_address = this.labor.permanent_address;
      this.phone = this.labor.phone;
      this.berth_operator_id = this.labor.berth_operator_id;
      this.date_of_birth = this.labor.date_of_birth;
      this.date_of_joining = this.labor.date_of_joining;
      this.nid = this.labor.nid;
      this.labor_type_id = this.labor.labor_type_id;
      this.designation_category_id = this.labor.designation_category_id;
      this.expiration_date = this.labor.expiration_date;
    }, err => {
      console.log(err);
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

  onBerthOperatorChange(id: string) {
    console.log(id);
  }

  onSubmit() {
    let data = {
      id: this.labor.id,
      date_of_birth: this.date_of_birth,
      date_of_joining: this.date_of_joining,
      entry_pass_no: this.entry_pass_no,
      berth_operator_id: this.berth_operator_id,
      name: this.name,
      labor_type_id: this.labor_type_id,
      designation_category_id: this.designation_category_id,
      present_address: this.present_address,
      permanent_address: this.permanent_address,
      phone: this.phone,
      nid: this.nid,
      expiration_date: this.expiration_date,

      org_id:this.berth_operator_id
    }
    this.laborService.editLabor(data).subscribe(data => {
      console.log(data);
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
      console.log(err);
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
    console.log(id);
  }

  onLaborCategoryChange(id: string) {
    console.log(id);
  }

}
