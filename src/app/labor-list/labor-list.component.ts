import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LaborService } from '../service/labor/labor.service';

@Component({
  selector: 'app-labor-list',
  templateUrl: './labor-list.component.html',
  styleUrls: ['./labor-list.component.css']
})
export class LaborListComponent implements OnInit {

  filterTerm: any;
  LABORS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  loader = true;
  
  constructor(
    private router: Router,
    private laborService: LaborService,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

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

    this.fetchLabors();
  }

  fetchLabors():void {
    var orgId = localStorage['org_id'];   
    this.laborService.getLaborList(orgId).subscribe(
      (response) => {
        this.LABORS = response;
        //console.log(response);
        this.loader = false;
      },
      (error) => {
        console.log(error);
      }
    );
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

  deleteLabor(id: number) {
    if(confirm("Do you want to delete ?")) {      
      this.laborService.deleteLabor(id).subscribe(data => {
        //console.log('Deleted', data);
  
        this.toastr.warning(data.message, 'Success',{
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });
  
        this.fetchLabors();
      }, err => {
  
        //console.log(err);
  
        this.toastr.error(err.error.message, 'Error',{
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });
  
        this.fetchLabors();
      });

    }
  }


}
