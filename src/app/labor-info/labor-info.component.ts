import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BerthService } from '../service/berth/berth.service';
import { DesignationService } from '../service/designation/designation.service';
import { LaborService } from '../service/labor/labor.service';

@Component({
  selector: 'app-labor-info',
  templateUrl: './labor-info.component.html',
  styleUrls: ['./labor-info.component.css']
})
export class LaborInfoComponent implements OnInit {

  userName: any;
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
  designation : string;
  nid: any;
  laborId: any;
  berthOperators: any;
  expiration_date: any;

  labor: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private laborService: LaborService,
    private designationService: DesignationService,
    private activatedRoute: ActivatedRoute,
    private berthService: BerthService
  ) {
    this.labor_type_id = '';
    this.userName=localStorage.getItem("userName");
    this.designation = '';
   }

  ngOnInit(): void {

    var orgId = localStorage['org_id'];
    console.log(orgId);
    console.log("orgId");

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
      this.designation = this.labor.designation;
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

  onDesignationCategoryChange(id: string) {
    console.log(id);
  }


  onLaborCategoryChange(id: string) {
    console.log(id);
  }
  onBerthOperatorChange(id: string) {
    console.log(id);
  }

}
