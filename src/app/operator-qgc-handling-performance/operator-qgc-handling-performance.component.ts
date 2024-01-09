import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperatorQgcHandlingPerformanceService } from '../service/operator-qgc-handling-performance/operator-qgc-handling-performance.service';

@Component({
  selector: 'app-operator-qgc-handling-performance',
  templateUrl: './operator-qgc-handling-performance.component.html',
  styleUrls: ['./operator-qgc-handling-performance.component.css']
})
export class OperatorQgcHandlingPerformanceComponent implements OnInit {
  operatorQgcPerformaceHandingForm:FormGroup;
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
    private operatorQgcHandlingPerformanceService:OperatorQgcHandlingPerformanceService
  ) {
    this.operatorQgcPerformaceHandingForm=this.formBuilder.group({});
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
        let response= this.operatorQgcHandlingPerformanceService.getOperationQgcPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
        response.subscribe(data=>{this.operatorQgcHandlingPerformanceService.getResultWithExcel(data,this.shift,this.fromDate,this.toDate)});

      }
      else{
        if(this.fromTime!="" && this.toDate!="" && this.toTime!=""){
          let response= this.operatorQgcHandlingPerformanceService.getOperationQgcPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
          response.subscribe(data=>{this.operatorQgcHandlingPerformanceService.getResultWithExcel(data,this.shift,this.fromDate,this.toDate)});

         }

      }

    }
    else if(this.fileType=="html" && this.shift!="" && this.fromDate!=""){

      if(this.shift=="Day" || this.shift=="Night"){
       this.fromTime="00:00";
        this.toDate="00-00-00"
       this.toTime="00:00"
       localStorage.setItem("operatorQgcShift",this.shift);
       localStorage.setItem("operatorQgcFromDate",this.fromDate);
       this.router.navigate([]).then(result=>window.open('importReports/operatorQgcHandlingPerformanceReport', '_blank'));
       
        
   }
     else {
       if(this.fromTime!="" && this.toDate!="" && this.toTime!=""){
            localStorage.setItem("operatorQgcShift",this.shift);
            localStorage.setItem("operatorQgcFromDate",this.fromDate);
            localStorage.setItem("operatorQgcFromTime",this.fromTime);
            localStorage.setItem("operatorQgcToDate",this.toDate);
            localStorage.setItem("operatorQgcToTime",this.toTime);
            this.router.navigate([]).then(result=>window.open('importReports/operatorQgcHandlingPerformanceReport', '_blank'));
          }
   
     }


    }

  }

}
