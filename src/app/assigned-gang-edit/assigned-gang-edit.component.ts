import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GangService } from '../service/gang/gang.service';
import { WorkService } from '../service/work/work.service';

@Component({
  selector: 'app-assigned-gang-edit',
  templateUrl: './assigned-gang-edit.component.html',
  styleUrls: ['./assigned-gang-edit.component.css']
})
export class AssignedGangEditComponent implements OnInit {

  gangAssignId: number;
  gangAssignForm: FormGroup;
  gangs: any;
  filteredGangs: any;
  workType: string;
  workTypeName: string;
  workCategories: any;
  workLocations: any;
  shiftList: any;

  tbl_id: any;
  work_category_id: any;
  gang_id: any;
  rotation: any;
  crane: any;
  container: any;
  vsl_name: any;
  vvd_gkey: any;
  shed: any;
  work_location_id: any;
  start_time: any;
  end_time: any;
  shift: any;

  bl: any;
  yard: any;

  containerList: any;
  rotList: any;
  blList: any;

  selectedWorkLocation: any;
  selectedGang: any;
  selectedContainer: any;
  selectedRotation: any;



  constructor(
    private gangService: GangService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private workService: WorkService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.gangAssignId = 0;
    this.gangAssignForm = this.formBuilder.group({});
    this.workType = '';
    this.workTypeName = '';
    this.work_category_id = 0;
    this.gang_id = 0;
    this.rotation = '';
    this.crane = 0;
    this.container = '';
    this.vsl_name = '';
    this.vvd_gkey = '';
    this.shed = '';
    this.work_location_id = '';
    this.start_time = '';
    this.end_time = '';
    this.shift = '';
    this.tbl_id = '';

    this.bl = '';
    this.yard = '';


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

    this.gangAssignId = this.activatedRoute.snapshot.params['id'];
    // console.log(this.activatedRoute.snapshot.params['work_category_id']);
    // console.log("gang assign id................");
    // console.log(this.gangAssignId);

    this.gangService.getGangAssignedById(this.gangAssignId).subscribe(data => {
      //console.log("work_category_id....." + data.work_category_id);
      this.tbl_id = data.id;
      this.work_category_id = data.work_category_id;
      this.gang_id = data.gang_id;
      this.rotation = data.rotation;
      this.crane = data.crane;
      this.container = data.container;
      this.vsl_name = data.vsl_name;
      this.vvd_gkey = data.vvd_gkey;
      this.shed = data.shed;
      this.work_location_id = data.work_location_id;
      this.start_time = data.start_time;
      this.end_time = data.end_time;
      this.shift = data.shift;

      this.bl = data.bl;
      this.yard = data.yard;

      if (this.work_category_id == 6) {

        // unstuffing - get container
        let reqData = {
          assignment_date: this.start_time,
          cont_loc_shed: this.shed
        }

        this.gangService.getContainerListForUnstuffing(reqData).subscribe(resData => {
          this.containerList = resData;
        }, err => {
          console.log(err);
        });

        const shed_val = data.shed.replace("/", "-");

        this.gangService.containerListOfGangAssignmentForUnstuffing(this.gangAssignId).subscribe(conts => {

          for (var i = 0; i < conts.length; i++) {

            if (i == 0) {
              this.container = [this.container];
            } else {
              const newCont = conts[i].cont_no;
              this.container.push(newCont);
            }
          }
        }, err => {
          console.log(err);
        });
      }

      if (this.work_category_id == 10) {
        //Delivery from yard - get container
        this.gangService.getContainerList(this.yard, this.start_time).subscribe(data => {
          this.containerList = data;
        }, err => {
          console.log(err);
        });

        this.gangService.containerListOfGangAssignmentForYard(this.gang_id, this.work_location_id, this.shift, this.yard, this.start_time).subscribe(conts => {

          for (var i = 0; i < conts.length; i++) {
            if (i == 0) {
              this.container = [this.container];
            } else {
              const newCont = conts[i].cont_no;
              this.container.push(newCont);
            }
          }
        }, err => {
          console.log(err);
        });

      }

      // Select Gang
      this.gangService.getGangForAssign(localStorage['org_id'], this.work_category_id).subscribe(data => {
        this.gangs = data;
        this.filteredGangs = data;
        // console.log(data);
      }, err => {
        console.log(err);
      });

      // Job location
      this.workService.getWorkLocationListByGangId(this.gang_id).subscribe(data => {
        this.workLocations = data;
        // console.log(data);
      });

    }, err => {
      console.log(err);
    });



    // Job Type
    this.workService.getWorkCategoryList().subscribe(data => {
      // console.log(data);
      this.workCategories = data;
    }, err => {
      console.log(err);
    });

    

    // Shift - not completed
    this.gangService.getShiftList(localStorage['org_id']).subscribe(data => {
      this.shiftList = data;
      // console.log(data);
    });

    // Rotation
    this.gangService.getAssignmentPendingRotationList().subscribe(resData => {
      this.rotList = resData;

    }, err => {
      console.log(err);
    });

  }

  onYardChange() {

    this.container = '';
    var start_time = this.gangAssignForm.get('start_time')?.value;
    var yardName = this.gangAssignForm.get('yard')?.value;

    // return;
    this.gangService.getContainerList(yardName, start_time).subscribe(data => {
      // console.log("container list");
      // console.log(data);
      this.containerList = data;
      // console.log("Container List ......." + this.containerList);
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

  onShedChange() {
    
    this.container = '';
    this.rotation = '';
    
    var work_category_id = this.gangAssignForm.get('work_category_id')?.value;
    var start_time = this.gangAssignForm.get('start_time')?.value;
    var selected_shed = this.gangAssignForm.get('shed')?.value;
    alert(work_category_id);

    // console.log("work_category_id" + work_category_id);
    // console.log("start_time" + start_time);

    let reqData = {
      assignment_date: start_time,
      cont_loc_shed: selected_shed
    }

    // console.log("sending............. " + reqData['assignment_date']);
    // console.log("sending............. " + reqData['cont_loc_shed']);

    if (work_category_id == 6) {
      // unstuffing - get container
      alert(work_category_id);
      alert(selected_shed);
      this.gangService.getContainerListForUnstuffing(reqData).subscribe(resData => {
        // console.log("container list - unstuffing");
        // console.log(resData);
        this.containerList = resData;
      }, err => {
        console.log(err);
      });
    }
    else if (work_category_id == 8) {
      // delivery from shed - get rotation and bl
      // console.log("In dlv from shed");
      // console.log("get rotation");

      this.gangService.getRotByDateAndShed(reqData).subscribe(resData => {
        // console.log("rot list - unstuffing");
        // console.log(resData);

        this.rotList = resData;

      }, err => {
        console.log(err);
      });

      // console.log("get bl no");
      this.gangService.getBlByDateAndShed(reqData).subscribe(resData => {
        // console.log("bl list - unstuffing");
        // console.log(resData);

        this.blList = resData;
      }, err => {
        console.log(err);
      });
    }
  }

  onWorkLocationChange(id: string) {
    console.log(id);
  }

  onGangChange(id: string) {
    this.work_location_id = '';
    // console.log(id);
    this.workService.getWorkLocationListByGangId(id).subscribe(data => {
      // console.log(data);
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

  onWorkCategoryChange(id: string) {
    this.gang_id = '';
    this.rotation = '';
    let tempGangs = [];
    // console.log(id);
    for (var i = 0; i < this.workCategories.length; i++) {
      if (this.workCategories[i].id == id) {
        this.workTypeName = this.workCategories[i].name;
        // console.log(this.workTypeName)
      }
    }

    for (var i = 0; i < this.gangs.length; i++) {
      // console.log(this.gangs[i].work_category_name + '-----' + this.workTypeName);
      if (this.gangs[i].work_category_name == this.workTypeName) {
        tempGangs.push(this.gangs[i]);
        // console.log(tempGangs)
      }
    }

    this.gangService.getAssignmentPendingRotationList().subscribe(resData => {
      this.rotList = resData;
    }, err => {
      console.log(err);
    });

    //this.filteredGangs = tempGangs;

    //Gang...
    this.gangService.getGangForAssign(localStorage['org_id'], id).subscribe(data => {
      this.gangs = data;
      this.filteredGangs = data;
      // console.log(data);
    }, err => {
      console.log(err);
    });

  }

  onCraneChange(id: string) {
    console.log(id);
  }

  onSubmit() {
    // console.log("shift : ");
    // console.log(this.gangAssignForm.value);

    let formData = {
      id: this.tbl_id,
      work_category_id: this.work_category_id,
      gang_id: this.gang_id,
      rotation: this.rotation,
      crane: this.crane,
      container: this.container,
      vsl_name: this.vsl_name,
      vvd_gkey: this.vvd_gkey,
      shed: this.shed,
      work_location_id: this.work_location_id,
      start_time: this.start_time,
      end_time: this.end_time,
      shift: this.shift
    }
    // console.log("edit assigned data");
    // console.log(formData);
    // return;

    this.gangService.updateAssignedGang(formData).subscribe(data => {
      // console.log(data);
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
