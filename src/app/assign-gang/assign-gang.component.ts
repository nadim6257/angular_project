import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GangService } from '../service/gang/gang.service';
import { WorkService } from '../service/work/work.service';

@Component({
  selector: 'app-assign-gang',
  templateUrl: './assign-gang.component.html',
  styleUrls: ['./assign-gang.component.css']
})
export class AssignGangComponent implements OnInit {

  gangs: any;
  workCategories: any;
  workLocations: any;
  gangAssignForm: FormGroup;
  workType: string;
  workTypeName: string;
  filteredGangs: any;
  shiftList: any;

  containerList: any;
  rotList: any;
  blList: any;

  selectedWorkLocation: any;
  selectedGang: any;
  selectedContainer: any;
  selectedRotation: any;

  constructor(
    private gangService: GangService,
    private workService: WorkService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.gangAssignForm = this.formBuilder.group({});
    this.workType = '';
    this.workTypeName = '';
  }

  ngOnInit(): void {

    if (localStorage['status'] != 1) {
      // console.log("### User logged out already ### ");
      this.router.navigate(['/pcs']);
      this.toastr.error('Login and try again.', 'Error', {
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });
      return;
    }

    //Gang By Organization...
    this.gangService.getGangListByOrg(localStorage['org_id']).subscribe(data => {
      this.gangs = data;
      this.filteredGangs = data; //gang list by org id will be loaded on page load...
      this.filteredGangs = ''; //no gang list will be loaded on page load...
      console.log(data);
    }, err => {
      console.log(err);
    });

    // Work Category
    this.workService.getWorkCategoryList().subscribe(data => {
      console.log(data);
      this.workCategories = data;
    }, err => {
      console.log(err);
    });

    // Work location
    this.workService.getWorkLocationList().subscribe(data => {
      this.workLocations = data;
      console.log(data);
    });

    this.gangService.getShiftList(localStorage['org_id']).subscribe(data => {
      this.shiftList = data;
      console.log(data);
    });

    this.gangAssignForm = this.formBuilder.group({
      // gang_id : ['', Validators.required],
      // work_category_id : ['', Validators.required],
      // work_location_id : ['', Validators.required],
      // start_time : ['', Validators.required],
      // end_time : ['', Validators.required],
      // crane: ['', Validators.required],
      // rotation: ['', Validators.required],
      // shed: ['', Validators.required],
      // vvd_gkey: ['', Validators.required],
      // bl: ['', Validators.required],
      // container: ['', Validators.required],
      // vsl_name: ['', Validators.required],
      // shift: ['', Validators.required],

      // yard: ['', Validators.required],

      gang_id: '',
      work_category_id: '',
      work_location_id: '',
      start_time: '',
      end_time: '',
      crane: '',
      rotation: '',
      shed: '',
      vvd_gkey: '',
      bl: '',
      container: '',
      vsl_name: '',
      shift: '',

      yard: '',

    });




  }

  onGangChange(id: string) {
    this.selectedWorkLocation = '';
    console.log(id);
    this.workService.getWorkLocationListByGangId(id).subscribe(data => {
      console.log(data);
      this.workLocations = data;
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error', {
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });

    });
  }

  onYardChange() {

    this.selectedContainer = '';
    var start_time = this.gangAssignForm.get('start_time')?.value;
    var yardName = this.gangAssignForm.get('yard')?.value;

    // return;
    this.gangService.getContainerList(yardName, start_time).subscribe(data => {
      console.log("container list");
      console.log(data);
      this.containerList = data;
      console.log("Container List ......." + this.containerList);
      // return;
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error', {
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });
    });
  }

  onWorkCategoryChange(id: string) {
    this.selectedGang = '';

    let tempGangs = [];
    console.log(id);
    for (var i = 0; i < this.workCategories.length; i++) {
      if (this.workCategories[i].id == id) {
        this.workTypeName = this.workCategories[i].name;
      }
    }

    if (localStorage['userRoleId'] == 3) {
      let berth_operator_id = localStorage['org_id'];
      let job_type = id;

      this.gangService.getGangForAssign(berth_operator_id, job_type).subscribe(data => {
        this.gangs = data;
        this.filteredGangs = data;
        console.log(data);
      }, err => {
        console.log(err);
      });
    }
    else {
      for (var i = 0; i < this.gangs.length; i++) {
        console.log(this.gangs[i].work_category_name + '-----' + this.workTypeName);
        if (this.gangs[i].work_category_name == this.workTypeName) {
          tempGangs.push(this.gangs[i]);
          console.log(tempGangs)
        }
      }
    }

    if (id == "2" || id == "4" || id == "8" || id == "12") {
      this.gangService.getAssignmentPendingRotationList().subscribe(resData => {
        this.rotList = resData;
        console.log(resData);
      }, err => {
        console.log(err);
      });
    }

    // for(var i=0; i < this.gangs.length; i++) {
    //   console.log(this.gangs[i].work_category_name + '-----' +this.workTypeName);
    //   if(this.gangs[i].work_category_name == this.workTypeName) {
    //     tempGangs.push(this.gangs[i]);
    //     console.log(tempGangs)
    //   }
    // }

    this.filteredGangs = tempGangs;

  }

  onWorkLocationChange(id: string) {
    console.log(id);
  }

  onRotationChange(id: string) {
    console.log(id);
  }

  onShedChange() {
    this.selectedContainer = '';
    this.selectedRotation = '';
    var work_category_id = this.gangAssignForm.get('work_category_id')?.value;
    var start_time = this.gangAssignForm.get('start_time')?.value;
    var selected_shed = this.gangAssignForm.get('shed')?.value;


    console.log("work_category_id" + work_category_id);

    console.log("start_time" + start_time);

    let reqData = {
      assignment_date: start_time,
      cont_loc_shed: selected_shed
    }

    console.log("sending............. " + reqData['assignment_date']);
    console.log("sending............. " + reqData['cont_loc_shed']);

    if (work_category_id == 6) {
      // unstuffing - get container
      this.gangService.getContainerListForUnstuffing(reqData).subscribe(resData => {
        console.log("container list - unstuffing");
        console.log(resData);
        this.containerList = resData;
      }, err => {
        console.log(err);
      });
    }
    else if (work_category_id == 8) {
      // delivery from shed - get rotation and bl
      console.log("In dlv from shed");

      console.log("get rotation");
      this.gangService.getRotByDateAndShed(reqData).subscribe(resData => {
        console.log("rot list - unstuffing");
        console.log(resData);

        this.rotList = resData;

      }, err => {
        console.log(err);
      });

      console.log("get bl no");
      this.gangService.getBlByDateAndShed(reqData).subscribe(resData => {
        console.log("bl list - unstuffing");
        console.log(resData);

        this.blList = resData;
      }, err => {
        console.log(err);
      });
    }
  }

  onCraneChange(id: string) {
    console.log(id);
  }

  onSubmit() {
    // console.log(this.gangAssignForm.value);   
    // console.log(this.gangAssignForm.value['container']);

    const work_cat_id = this.gangAssignForm.value['work_category_id'];
    if(work_cat_id==2 || work_cat_id==4 || work_cat_id==8 || work_cat_id==12){
      this.gangAssignForm.value['container'] = [];
    }
    
    this.gangService.assignGang(this.gangAssignForm.value).subscribe(data => {      
      this.toastr.success(data.message, 'Success', {
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });
      this.router.navigate(['gang/assigned/list']);
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error', {
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });
    });
  }


}
