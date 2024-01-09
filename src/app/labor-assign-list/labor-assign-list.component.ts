import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GangService } from '../service/gang/gang.service';
import { LaborService } from '../service/labor/labor.service';

@Component({
  selector: 'app-labor-assign-list',
  templateUrl: './labor-assign-list.component.html',
  styleUrls: ['./labor-assign-list.component.css']
})
export class LaborAssignListComponent implements OnInit {

  gangId: string;
  laborToGang: any[];

  filterTerm: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private laborService: LaborService,
    private gangService: GangService,
    private http: HttpClient
  ) {
    this.gangId = '';
    this.laborToGang = [];
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

    this.fetchAssignedLaborList();

  }

  fetchAssignedLaborList(){
    var org_id = localStorage['org_id'];
    var userRoleId = localStorage['userRoleId'];

    this.gangId = this.activatedRoute.snapshot.params['id'];

    this.gangService.getAssignedLaborByGangId(this.gangId).subscribe(data => {
      // console.log("assigned labor to gang - in list");
      // console.log(data);

      this.laborToGang = data;

      //console.log("----------------------");

    }, err => {
      //console.log(err);
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

  onTableDataChange(event: any) {
    this.page = event;
    //this.fetchWorkLocations();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    //this.fetchWorkLocations();
  }
  onSearchInput() {
    this.page = 1;
  }

  rmvLaborFromGang(labor_id: string) {
    // console.log("Labor ID...");
    // console.log(labor_id);

    // console.log("Gand ID...");
    // console.log(this.gangId);
    // return;
    if (confirm("Do you want to remove ?")) {
      this.laborService.removeLaborFromGang(this.gangId, labor_id).subscribe(data => {
        console.log("delete labor from gang response");
        console.log(data);
        this.toastr.warning(data.message, 'Success', {
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-center-center',
          closeButton: true
        });

        this.fetchAssignedLaborList();
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
