import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BerthService } from '../service/berth/berth.service';
import { GangService } from '../service/gang/gang.service';

@Component({
  selector: 'app-gang-list',
  templateUrl: './gang-list.component.html',
  styleUrls: ['./gang-list.component.css']
})
export class GangListComponent implements OnInit {

  filterTerm: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];

  gangs: any[];
  tempGangs: any[];
  searchText: any;
  berthOperators: any[];

  constructor(
    private router: Router,
    private gangService: GangService,
    private berthService: BerthService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.gangs = [];
    this.tempGangs = [];
    this.berthOperators = [];
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

    this.fetchGangs();

  }

  fetchGangs(): void {

    //Fetching Berth Operator List from API...
    this.berthService.getBerthOperatorList().subscribe(data => {
      console.log(data);
      this.berthOperators = data;
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


    var org_id = localStorage['org_id'];
    var userRoleId = localStorage['userRoleId'];

    if (userRoleId == 1 || userRoleId == 2) {

      this.gangService.getGangList().subscribe(data => {
        console.log(data);
        this.tempGangs = data;
        for (var i = 0; i < this.tempGangs.length; i += 1) {

          for (var j = 0; j < this.berthOperators.length; j += 1) {
            console.log(this.tempGangs[i].berth_operator_id + ' - ' + this.berthOperators[j].id);
            if (this.tempGangs[i].berth_operator_id == this.berthOperators[j].id) {
              this.tempGangs[i].berth_operator_name = this.berthOperators[j].name;
            }
          }
        }
        this.gangs = this.tempGangs;
      }, err => {
        console.log(err);
      });

    }
    else {
      this.gangService.getGangListByOrg(org_id).subscribe(data => {
        console.log(data);
        this.tempGangs = data;
        for (var i = 0; i < this.tempGangs.length; i += 1) {

          for (var j = 0; j < this.berthOperators.length; j += 1) {
            console.log(this.tempGangs[i].berth_operator_id + ' - ' + this.berthOperators[j].id);
            if (this.tempGangs[i].berth_operator_id == this.berthOperators[j].id) {
              this.tempGangs[i].berth_operator_name = this.berthOperators[j].name;
            }
          }
        }
        this.gangs = this.tempGangs;
      }, err => {
        console.log(err);
      });
    }



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

  deleteGang(id: number) {
    if (confirm("Do you want to delete ?")) {
      this.gangService.deleteGang(id).subscribe(data => {
        console.log('Deleted', data);

        this.toastr.warning(data.message, 'Success', {
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-center-center',
          closeButton: true
        });

        this.fetchGangs();
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

}
