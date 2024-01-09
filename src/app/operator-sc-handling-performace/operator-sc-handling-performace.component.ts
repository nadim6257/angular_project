import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperatorScHandingPerformaceService } from '../service/ImportReports/operator-sc-handing-performace/operator-sc-handing-performace.service';

@Component({
  selector: 'app-operator-sc-handling-performace',
  templateUrl: './operator-sc-handling-performace.component.html',
  styleUrls: ['./operator-sc-handling-performace.component.css']
})
export class OperatorScHandlingPerformaceComponent implements OnInit {
  operatorScPerformaceHandingForm:FormGroup;
  isEditable:Boolean=true;
  shift:any;
  fromDate:any;
  fromTime:any;
  toDate:any;
  toTime:any;
  fileType:any;
  resultList:any;
  detailPage:any;

  constructor(
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private router:Router,
    private operatorScHandingPerformaceService:OperatorScHandingPerformaceService
  ) {
    this.operatorScPerformaceHandingForm=this.formBuilder.group({});
    this.shift="";
    this.fromDate="";
    this.fromTime="";
    this.toDate="";
    this.toTime="";
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
  }

  onShiftChange(value:any){
    if(value=="TimeWise"){
      this.isEditable=false;
    }
    else{
      this.isEditable=true;
    }

  }

  onSubmit(event:any){
    this.shift=event.shift.value;
    this.fromDate=event.fromDate.value;
    this.fromTime=event.fromTime.value;
    this.toDate=event.toDate.value;
    this.toTime=event.toTime.value;
    this.fileType=event.fileType.value;
    console.log(this.fileType);

    if(this.fileType=="xl" && this.shift!="" && this.fromDate!=""){
      if(this.shift=="Day" || this.shift=="Night"){
       // let response= this.operatorScHandlingPerformanceService.getOperationQgcPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
       // response.subscribe(data=>{this.operatorQgcHandlingPerformanceService.getResultWithExcel(data,this.shift,this.fromDate,this.toDate)});
       let response=this.operatorScHandingPerformaceService.getOperationScPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
       response.subscribe(data=>{this.operatorScHandingPerformaceService.getResultWithExcel(data,this.shift,this.fromDate,this.toDate)});

      }
      else{
        if(this.fromTime!="" && this.toDate!="" && this.toTime!=""){
         // let response= this.operatorQgcHandlingPerformanceService.getOperationQgcPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
         // response.subscribe(data=>{this.operatorQgcHandlingPerformanceService.getResultWithExcel(data,this.shift,this.fromDate,this.toDate)});
         let response=this.operatorScHandingPerformaceService.getOperationScPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
        response.subscribe(data=>{this.operatorScHandingPerformaceService.getResultWithExcel(data,this.shift,this.fromDate,this.toDate)});

         }

      }

    }
    else if(this.fileType=="html" && this.shift!="" && this.fromDate!=""){

      if(this.shift=="Day" || this.shift=="Night"){
       this.fromTime="00:00";
        this.toDate="00-00-00"
       this.toTime="00:00"
       localStorage.setItem("operatorScShift",this.shift);
       localStorage.setItem("operatorScFromDate",this.fromDate);
       this.router.navigate([]).then(result=>window.open('importReports/operatorScHandlingPerformance/report', '_blank'));
       
        
   }
     else {
       if(this.fromTime!="" && this.toDate!="" && this.toTime!=""){
            localStorage.setItem("operatorScShift",this.shift);
            localStorage.setItem("operatorScFromDate",this.fromDate);
            localStorage.setItem("operatorScFromTime",this.fromTime);
            localStorage.setItem("operatorScToDate",this.toDate);
            localStorage.setItem("operatorScToTime",this.toTime);
            this.router.navigate([]).then(result=>window.open('importReports/operatorScHandlingPerformance/report', '_blank'));
          }
   
     }


    }

  }

  

}
