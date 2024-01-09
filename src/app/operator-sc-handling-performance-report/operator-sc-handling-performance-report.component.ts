import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OperatorScHandingPerformaceService } from '../service/ImportReports/operator-sc-handing-performace/operator-sc-handing-performace.service';

@Component({
  selector: 'app-operator-sc-handling-performance-report',
  templateUrl: './operator-sc-handling-performance-report.component.html',
  styleUrls: ['./operator-sc-handling-performance-report.component.css']
})
export class OperatorScHandlingPerformanceReportComponent implements OnInit {
  searchText:any;
  shift:any;
  fromDate:any;
  fromTime:any;
  toDate:any;
  toTime:any;
  resultList:any;
  show:Boolean=false;


  constructor(
    private toastr:ToastrService,
    private router:Router,
    private operatorScHandingPerformaceService:OperatorScHandingPerformaceService
  ) {
    this.shift= localStorage.getItem("operatorScShift");
    this.fromDate=localStorage.getItem("operatorScFromDate");
    this.fromTime=localStorage.getItem("operatorScFromTime");
    this.toDate=localStorage.getItem("operatorScToDate");
    this.toTime=localStorage.getItem("operatorScToTime");
    
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

    if( this.shift!="" && this.fromDate!=""){
      if(this.shift=="Day" || this.shift=="Night"){
        
      let response= this.operatorScHandingPerformaceService.getOperationScPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
          response.subscribe(data=>{this.resultList=data});
    
      }
      else{
        if(this.fromTime!="" && this.toDate!="" && this.toTime!=""){
          this.show=true;
          let response= this.operatorScHandingPerformaceService.getOperationScPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
          response.subscribe(data=>{this.resultList=data});
         }

      }

    }
  }

}
