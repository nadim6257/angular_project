import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PodService } from '../service/ExportReports/pod/pod.service';

@Component({
  selector: 'app-pod-list',
  templateUrl: './pod-list.component.html',
  styleUrls: ['./pod-list.component.css']
})
export class PodListComponent implements OnInit {

  pod_code:any;
  podInfo:any;
  
  IsoList:any;
  filterTerm: any;
  CATEGORIES: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  constructor(
    private podService:PodService,
    private toastr:ToastrService,
    private router:Router
  ) {
    this.pod_code="";
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

    this.podService.podlist().subscribe(data => {
      console.log(data);
      this.podInfo = data;
      
    });
    this.onSubmit();
  }

  onSubmit(){
    this.podService.podForlistdata(this.pod_code).subscribe(data => {
      this.podInfo=data;     
      //console.log(data);   
    });
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
