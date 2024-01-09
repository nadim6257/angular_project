import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OperatorRtgHandlingPerformaceService } from '../service/ImportReports/operator-rtg-handling-performace/operator-rtg-handling-performace.service';

@Component({
  selector: 'app-operator-rtg-handling-performance-report',
  templateUrl: './operator-rtg-handling-performance-report.component.html',
  styleUrls: ['./operator-rtg-handling-performance-report.component.css']
})
export class OperatorRtgHandlingPerformanceReportComponent implements OnInit {
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
    private operatorRtgHandlingPerformaceService:OperatorRtgHandlingPerformaceService 
  ) {
    this.shift= localStorage.getItem("operatorRtgShift");
    this.fromDate=localStorage.getItem("operatorRtgFromDate");
    this.fromTime=localStorage.getItem("operatorRtgFromTime");
    this.toDate=localStorage.getItem("operatorRtgToDate");
    this.toTime=localStorage.getItem("operatorRtgToTime");
    console.log("todate:"+this.toDate);
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
      let response=this.operatorRtgHandlingPerformaceService.getOperationRtgPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
      response.subscribe(data=>{console.log(data);
      this.resultList=data;});
    }
    else{
      if(this.fromTime!="" && this.toDate!="" && this.toTime!=""){
        this.show=true;
        let response=this.operatorRtgHandlingPerformaceService.getOperationRtgPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
        response.subscribe(data=>{console.log(data);
        this.resultList=data;});
      }

    }
     

    }
   
    if(this.shift=="Day" || this.shift=="Night"){
      this.show=false;
     
    }
    else{
      this.show=true;
     // localStorage.removeItem("shift");
      //localStorage.removeItem("fromDate");
     // localStorage.removeItem("fromTime");
     // localStorage.removeItem("toDate");
     // localStorage.removeItem("toTime");

    }
  

  }

}
