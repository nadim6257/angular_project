import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BerthService } from '../service/berth/berth.service';
import { GangService } from '../service/gang/gang.service';
import { WorkService } from '../service/work/work.service';

@Component({
  selector: 'app-gang-add',
  templateUrl: './gang-add.component.html',
  styleUrls: ['./gang-add.component.css']
})
export class GangAddComponent implements OnInit {

  gangAddForm: FormGroup;
  berthOperators: any;
  workCategories: any;

  login_id: String;
  user_name: String;
  user_role_id: number;
  org_id: number;

  constructor(
    private router: Router, 
    private gangService: GangService,
    private berthService: BerthService,
    private workService: WorkService,
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { 
    this.gangAddForm = this.formBuilder.group({});
    this.login_id = "";
    this.user_name = "";
    this.user_role_id = 0;
    this.org_id = 0;
  }

  ngOnInit(): void {

    if(localStorage['status']!=1)
    {
      // console.log("### User logged out already ### ");
      this.router.navigate(['/pcs']);
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

    this.login_id=localStorage['loginId'];
    this.user_name=localStorage['userName'];
    this.user_role_id=localStorage['userRoleId'];
    this.org_id=localStorage['org_id'];

    this.berthService.berthOperatorListByOrgType(this.user_role_id,this.org_id).subscribe(data => {
      console.log("get berth by id");
      console.log(data);
      this.berthOperators = data;
    }, err => {
      console.log(err);
    });

    this.workService.getWorkCategoryList().subscribe(data => {
      console.log(data);
      this.workCategories = data;
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

    if(this.user_role_id==1)
    {
      this.gangAddForm  = this.formBuilder.group({
        name : ['', Validators.required],
        berth_operator_id: ['', Validators.required],
        work_category_id: ['', Validators.required]
      });
    }
    else
    {
      this.gangAddForm  = this.formBuilder.group({
        name : ['', Validators.required],
        berth_operator_id: [this.org_id, Validators.required],
        work_category_id: ['', Validators.required]
      });
    }  
  
  }

  onBerthOperatorChange(id: string) {
    console.log(id);
  }
  
  onWorkCategoryChange(id: string) {
    console.log(id);
  }

  onSubmit() {
    this.gangService.addGang(this.gangAddForm.value).subscribe(data => {
      console.log(data);
      this.toastr.success(data.message, 'Success',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      this.router.navigate(['gang/list']);
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



}
