import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BerthService } from '../service/berth/berth.service';
import { GangService } from '../service/gang/gang.service';
import { WorkService } from '../service/work/work.service';

@Component({
  selector: 'app-gang-edit',
  templateUrl: './gang-edit.component.html',
  styleUrls: ['./gang-edit.component.css']
})
export class GangEditComponent implements OnInit {

  name: string;
  gangId: string;
  gang: any;
  berthOperators: any;
  berth_operator_id: any;
  work_category_id: any;
  workCategories: any;

  login_id: String;
  user_name: String;
  user_role_id: number;
  org_id: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gangService: GangService,
    private berthService: BerthService,
    private workService: WorkService,
    private toastr: ToastrService,
    private http: HttpClient
  ) { 
    this.name = '';
    this.gangId = '';
    this.work_category_id = '';

    this.login_id = "";
    this.user_name = "";
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

    this.login_id=localStorage['loginId'];
    this.user_name=localStorage['userName'];
    this.user_role_id=localStorage['userRoleId'];
    this.org_id=localStorage['org_id'];

    this.gangId = this.activatedRoute.snapshot.params['id'];

    this.gangService.getGangById(this.gangId).subscribe(data => {
      console.log(data);
      this.gang = data;
      this.name = this.gang.name;
      this.berth_operator_id = this.gang.berth_operator_id;
      this.work_category_id = this.gang.work_category_id;
    }, err => {
      console.log(err);
    });

    this.berthService.getBerthOperatorList().subscribe(data => {
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

  }

  onBerthOperatorChange(id: string) {
    console.log(id);
  }

  onWorkCategoryChange(id: string) {
    console.log(id);
  }

  saveGang() {
    let gang = {
      id: this.gang.id,
      name: this.name,
      berth_operator_id: this.berth_operator_id,
      work_category_id: this.work_category_id
    }
    console.log("edit gang data");
    console.log(gang);

    this.gangService.editGang(gang).subscribe(data => {
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
