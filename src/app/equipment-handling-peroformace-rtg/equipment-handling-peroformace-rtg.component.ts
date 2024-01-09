import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EquipmentHandlingPerformanceReportRtgService } from '../service/ImportReports/equipment-handling-performance-report-rtg/equipment-handling-performance-report-rtg.service';


@Component({
  selector: 'app-equipment-handling-peroformace-rtg',
  templateUrl: './equipment-handling-peroformace-rtg.component.html',
  styleUrls: ['./equipment-handling-peroformace-rtg.component.css']
})
export class EquipmentHandlingPeroformaceRtgComponent implements OnInit {
  equipmentRtgPerformaceHandingForm:FormGroup;
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
    private equipmentHandlingPerformanceReportRtgService:EquipmentHandlingPerformanceReportRtgService,
    private router:Router
  ) {
    this.equipmentRtgPerformaceHandingForm=this.formBuilder.group({});
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
       
       //let response=this.operatorScHandingPerformaceService.getOperationScPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
      // response.subscribe(data=>{this.operatorScHandingPerformaceService.getResultWithExcel(data,this.shift,this.fromDate,this.toDate)});
      let response=this.equipmentHandlingPerformanceReportRtgService.getEquipmentHandlingPerformaceHistoryRtgList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
      response.subscribe(data=>{this.equipmentHandlingPerformanceReportRtgService.getResultWithExcel(data,this.shift,this.fromDate,this.toDate)});

      }
      else{
        if(this.fromTime!="" && this.toDate!="" && this.toTime!=""){
         
         //let response=this.operatorScHandingPerformaceService.getOperationScPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
        //response.subscribe(data=>{this.operatorScHandingPerformaceService.getResultWithExcel(data,this.shift,this.fromDate,this.toDate)});
        let response=this.equipmentHandlingPerformanceReportRtgService.getEquipmentHandlingPerformaceHistoryRtgList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
        response.subscribe(data=>{this.equipmentHandlingPerformanceReportRtgService.getResultWithExcel(data,this.shift,this.fromDate,this.toDate)});

         }

      }

    }
    else if(this.fileType=="html" && this.shift!="" && this.fromDate!=""){

      if(this.shift=="Day" || this.shift=="Night"){
       this.fromTime="00:00";
        this.toDate="00-00-00"
       this.toTime="00:00"
       localStorage.setItem("equipmentPerformanceRtgShift",this.shift);
       localStorage.setItem("equipmentPerformanceRtgFromDate",this.fromDate);
       this.router.navigate([]).then(result=>window.open('importReports/equipmentHandlingPerformanceRtgHistory/report', '_blank'));
       
        
   }
     else {
       if(this.fromTime!="" && this.toDate!="" && this.toTime!=""){
            localStorage.setItem("equipmentPerformanceRtgShift",this.shift);
            localStorage.setItem("equipmentPerformanceRtgFromDate",this.fromDate);
            localStorage.setItem("equipmentPerformanceRtgFromTime",this.fromTime);
            localStorage.setItem("equipmentPerformanceRtgToDate",this.toDate);
            localStorage.setItem("equipmentPerformanceRtgToTime",this.toTime);
            this.router.navigate([]).then(result=>window.open('importReports/equipmentHandlingPerformanceRtgHistory/report', '_blank'));
          }
   
     }


    }

  }

}
