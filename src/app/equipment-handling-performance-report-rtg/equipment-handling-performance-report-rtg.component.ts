import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EquipmentHandlingPerformanceReportRtgService } from '../service/ImportReports/equipment-handling-performance-report-rtg/equipment-handling-performance-report-rtg.service';

@Component({
  selector: 'app-equipment-handling-performance-report-rtg',
  templateUrl: './equipment-handling-performance-report-rtg.component.html',
  styleUrls: ['./equipment-handling-performance-report-rtg.component.css']
})
export class EquipmentHandlingPerformanceReportRtgComponent implements OnInit {
  searchText:any;
  shift:any;
  fromDate:any;
  fromTime:any;
  toDate:any;
  toTime:any;
  resultList:any;
  show:Boolean=false;
   imRtotal:number=0;
   keepDTotal:number=0;
   dOffTotal:number=0;
   shiftTotal:number=0;
   total:number=0;

  constructor(
    private toastr:ToastrService,
    private equipmentHandlingPerformanceReportRtgService:EquipmentHandlingPerformanceReportRtgService,
    private router:Router
  ) { 
    this.shift= localStorage.getItem("equipmentPerformanceRtgShift");
    this.fromDate=localStorage.getItem("equipmentPerformanceRtgFromDate");
    this.fromTime=localStorage.getItem("equipmentPerformanceRtgFromTime");
    this.toDate=localStorage.getItem("equipmentPerformanceRtgToDate");
    this.toTime=localStorage.getItem("equipmentPerformanceRtgToTime");
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
        
     // let response= this.operatorScHandingPerformaceService.getOperationScPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
          //response.subscribe(data=>{this.resultList=data});
          let response=this.equipmentHandlingPerformanceReportRtgService.getEquipmentHandlingPerformaceHistoryRtgList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
          response.subscribe(
            data=>{
              this.resultList=data;
              for(let result of this.resultList){
                this.imRtotal=this.imRtotal+result["impRcv"];
                this.keepDTotal=this.keepDTotal+result["keepDlv"];
                this.dOffTotal=this.dOffTotal+result["dlvOcdOffDock"];
                this.shiftTotal=this.shiftTotal+result["shift"];
               }
               this.total=this.imRtotal+this.keepDTotal+this.dOffTotal+this.shiftTotal;
          });
          

    
      }
      else{
        if(this.fromTime!="" && this.toDate!="" && this.toTime!=""){
          this.show=true;
         // let response= this.operatorScHandingPerformaceService.getOperationScPerformanceHandlingList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
         // response.subscribe(data=>{this.resultList=data});
         let response=this.equipmentHandlingPerformanceReportRtgService.getEquipmentHandlingPerformaceHistoryRtgList(this.shift,this.fromDate,this.fromTime,this.toDate,this.toTime);
          response.subscribe(
            data=>{
              this.resultList=data;
              for(let result of this.resultList){
                this.imRtotal=this.imRtotal+result["impRcv"];
                this.keepDTotal=this.keepDTotal+result["keepDlv"];
                this.dOffTotal=this.dOffTotal+result["dlvOcdOffDock"];
                this.shiftTotal=this.shiftTotal+result["shift"];
               }
               this.total=this.imRtotal+this.keepDTotal+this.dOffTotal+this.shiftTotal;
          });
         }

      }

    }
  }
  
  

}
