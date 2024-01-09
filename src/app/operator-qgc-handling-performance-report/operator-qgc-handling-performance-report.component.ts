import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperatorQgcHandlingPerformanceService } from '../service/operator-qgc-handling-performance/operator-qgc-handling-performance.service';

@Component({
  selector: 'app-operator-qgc-handling-performance-report',
  templateUrl: './operator-qgc-handling-performance-report.component.html',
  styleUrls: ['./operator-qgc-handling-performance-report.component.css']
})
export class OperatorQgcHandlingPerformanceReportComponent implements OnInit {

  searchText:any;
  shift:any;
  fromDate:any;
  fromTime:any;
  toDate:any;
  toTime:any;
  resultList:any;
  show:Boolean=false;

  constructor(
    private operatorQgcHandlingPerformanceService:OperatorQgcHandlingPerformanceService,
    private toastr:ToastrService,
    private router:Router
  ) {
    this.shift= localStorage.getItem("operatorQgcShift");
    this.fromDate=localStorage.getItem("operatorQgcFromDate");
    this.fromTime=localStorage.getItem("operatorQgcFromTime");
    this.toDate=localStorage.getItem("operatorQgcToDate");
    this.toTime=localStorage.getItem("operatorQgcToTime");
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
        
      let response= this.operatorQgcHandlingPerformanceService.getOperationQgcPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
      response.subscribe(data=>{this.resultList=data});
    
      }
      else{
        if(this.fromTime!="" && this.toDate!="" && this.toTime!=""){
          this.show=true;
          let response= this.operatorQgcHandlingPerformanceService.getOperationQgcPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
          response.subscribe(data=>{this.resultList=data});
         }

      }

    }
  }

}
