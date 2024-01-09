import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BerthService } from '../service/berth/berth.service';
import { GangService } from '../service/gang/gang.service';

@Component({
  selector: 'app-assigned-gang-list',
  templateUrl: './assigned-gang-list.component.html',
  styleUrls: ['./assigned-gang-list.component.css']
})
export class AssignedGangListComponent implements OnInit {

  filterTerm: any;
  CATEGORIES: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  assignedGangs: any[];
  tempAssignedGangs: any[];
  berthOperators: any;
  userRoleId: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private gangService: GangService,
    private berthService: BerthService
  ) {
    this.tempAssignedGangs = [];
    this.assignedGangs = [];
  }

  ngOnInit(): void {

    if (localStorage['status'] != 1) {
      // console.log("### User logged out already ### ");
      this.router.navigate(['/login']);
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

    this.fetchAssignedGangs();

  }

  fetchAssignedGangs(): void {

    this.userRoleId = localStorage['userRoleId'];
    var org_id = localStorage['org_id'];

    this.berthService.getBerthOperatorList().subscribe(data => {      
      this.berthOperators = data;
      console.log("All Berth Operators..." + this.berthOperators);
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
    

    if (this.userRoleId == 1 || this.userRoleId == 2) {
      this.gangService.getAssignedGangList().subscribe(data => {
        console.log(data);
        this.assignedGangs = data;
        let flag = false;

        for (var i = 0; i < this.assignedGangs.length; i++) {
          this.assignedGangs[i].shift_name = this.assignedGangs[i].shift_name.toUpperCase();
        }
        for (var i = 0; i < this.assignedGangs.length; i++) {
          for (var j = 0; j < this.tempAssignedGangs.length; j++) {

            if ((this.assignedGangs[i].gang_name === this.tempAssignedGangs[j].gang_name) && (this.assignedGangs[i].work_location_name === this.tempAssignedGangs[j].work_location_name) && (this.assignedGangs[i].shift === this.tempAssignedGangs[j].shift)) {
              flag = true;
            }
          }
          if (!flag) {
            this.tempAssignedGangs[this.tempAssignedGangs.length] = this.assignedGangs[i];
          }
          flag = false;
        }



        for (var i = 0; i < this.assignedGangs.length; i += 1) {

          for (var j = 0; j < this.berthOperators.length; j += 1) {
            console.log(this.tempAssignedGangs[i].berth_operator_id + ' - ' + this.berthOperators[j].id);
            if (this.tempAssignedGangs[i].berth_operator_id == this.berthOperators[j].id) {
              this.tempAssignedGangs[i].berth_operator_name = this.berthOperators[j].name;
            }
          }
        }

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
    else {
      this.gangService.getAssignedGangListByOrg(org_id).subscribe(data => {
        console.log(data);
        this.assignedGangs = data;
        let flag = false;

        for (var i = 0; i < this.assignedGangs.length; i++) {
          this.assignedGangs[i].shift_name = this.assignedGangs[i].shift_name.toUpperCase();
        }
        for (var i = 0; i < this.assignedGangs.length; i++) {
          for (var j = 0; j < this.tempAssignedGangs.length; j++) {

            if ((this.assignedGangs[i].gang_name === this.tempAssignedGangs[j].gang_name) && (this.assignedGangs[i].work_location_name === this.tempAssignedGangs[j].work_location_name) && (this.assignedGangs[i].shift === this.tempAssignedGangs[j].shift)) {
              flag = true;
            }
          }
          if (!flag) {
            this.tempAssignedGangs[this.tempAssignedGangs.length] = this.assignedGangs[i];
          }
          flag = false;
        }
        
        for (var q = 0; q < this.assignedGangs.length; q += 1) {
          for (var r = 0; r < this.berthOperators.length; r += 1) {
            console.log("Assigned Berth Op : " + this.assignedGangs[q].berth_operator_id + "In Loop Berth Op : " + this.berthOperators[r].id);
            if (this.assignedGangs[q].berth_operator_id == this.berthOperators[r].id) {
              this.assignedGangs[q].berth_operator_name = this.berthOperators[r].name;
            }
          }
        }

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

  EndTime(id: Number) {
    console.log(id);
    //return;
    this.gangService.endTimeAssignedGang(id).subscribe(data => {
      console.log('End Time', data);
      window.location.reload();
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

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onSearchInput() {
    this.page = 1;
  }

}
