import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OperatorRtgHandlingPerformaceService } from '../service/ImportReports/operator-rtg-handling-performace/operator-rtg-handling-performace.service';
@Component({
  selector: 'app-operator-rtg-handling-performance',
  templateUrl: './operator-rtg-handling-performance.component.html',
  styleUrls: ['./operator-rtg-handling-performance.component.css']
})
export class OperatorRtgHandlingPerformanceComponent implements OnInit {
  operatorRtgPerformaceHandingForm:FormGroup;
  isEditable:Boolean=true;
  shift:any;
  fromDate:any;
  fromTime:any;
  toDate:any;
  toTime:any;
  fileType:any;
  resultList:any;
  

  constructor(
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private operatorRtgHandlingPerformaceService:OperatorRtgHandlingPerformaceService,
    private router:Router
  ) { 
    this.operatorRtgPerformaceHandingForm=this.formBuilder.group({});
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
  onSubmit(event:any){
    this.shift=event.shift.value;
   this.fromDate=event.fromDate.value;
   this.fromTime=event.fromTime.value;
   this.toDate=event.toDate.value;
   this.toTime=event.toTime.value;
   this.fileType=event.fileType.value;
   if(this.fileType=="xl" && this.shift!="" && this.fromDate!=""){
      if(this.shift=="Day" || this.shift=="Night"){
      let response=this.operatorRtgHandlingPerformaceService.getOperationRtgPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
      response.subscribe(data=>{
        this.operatorRtgHandlingPerformaceService.getResultWithExcel(data,this.shift,this.fromDate,this.toDate);
      });
    }
    else{
      if(this.fromTime!="" && this.toDate!="" && this.toTime!=""){
        let response=this.operatorRtgHandlingPerformaceService.getOperationRtgPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
        response.subscribe(data=>{
          this.operatorRtgHandlingPerformaceService.getResultWithExcel(data,this.shift,this.fromDate,this.toDate);
        });

      }
    }

  }
    else if(this.fileType=="html" &&  this.shift!="" && this.fromDate!=""){

      if(this.shift=="Day" || this.shift=="Night"){
       this.fromTime="00:00";
        this.toDate="00-00-00"
       this.toTime="00:00"
       localStorage.setItem("operatorRtgShift",this.shift);
       localStorage.setItem("operatorRtgFromDate",this.fromDate);
       this.router.navigate([]).then(result=>window.open('importReports/operatorRtgHandlingPerformance/report', '_blank'));
   }
     else {
      if(this.fromTime!="" && this.toDate!="" && this.toTime!=""){ 
      localStorage.setItem("operatorRtgShift",this.shift);
      localStorage.setItem("operatorRtgFromDate",this.fromDate);
      localStorage.setItem("operatorRtgFromTime",this.fromTime);
      localStorage.setItem("operatorRtgToDate",this.toDate);
      localStorage.setItem("operatorRtgToTime",this.toTime);
      this.router.navigate([]).then(result=>window.open('importReports/operatorRtgHandlingPerformance/report', '_blank'));
      }

     }
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
}
