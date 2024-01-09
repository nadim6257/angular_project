import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../service/organization/organization.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit {

  organizations: any[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  filterTerm: any;

  constructor(
    private router: Router,
    private organizationService: OrganizationService,
    private toastr: ToastrService
  ) {
    this.organizations = [];
   }

  ngOnInit(): void {
    if (localStorage['status'] != 1) {

      this.router.navigate(['/login']);
      this.toastr.error('Login and try again.', 'Error', {
        timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });
      return;
    }

    this.fetchOrganizationList();
  }

  fetchOrganizationList(): void{
    this.organizationService.getOrganizationList().subscribe(data => {
      console.log(data.id);
      this.organizations = data;
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error', {
        timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });
    });
  }

  deleteOrganization(id: number) {

    if(confirm('Do you want to delete this organization?')){
      this.organizationService.deleteOrganization(id).subscribe(data => {

        this.toastr.success(data.message, data.message,{
          timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });
        // this.router.navigate(['organization/list']);
        location.reload();
      }, err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error',{
          timeOut:5000,
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

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onSearchInput(){
    this.page = 1;
  }
}
