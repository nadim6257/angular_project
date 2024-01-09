import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ImportContainerDischargeExcelDetailLast24HourService } from '../service/ImportReports/import-container-discharge-excel-detail-last24-hour/import-container-discharge-excel-detail-last24-hour.service';

@Component({
  selector: 'app-import-container-discharge-excel-detail-last24-hour-report-detail',
  templateUrl: './import-container-discharge-excel-detail-last24-hour-report-detail.component.html',
  styleUrls: ['./import-container-discharge-excel-detail-last24-hour-report-detail.component.css']
})
export class ImportContainerDischargeExcelDetailLast24HourReportDetailComponent implements OnInit {
  rotation:any;
  impRotation:any;
  fromDate:any;
  fromTime:any;
  toDate:any;
  toTime:any;
  resultList:any;
  vesselInfo:any;
  vesselName:any;
  arrivalDate:any;
  voyList:any;
  voyNo:any;
  berth:any;
  mlo:any="";
  j:number=0;
  weight:number=0;
  totalShowStatus:Boolean=true;

  constructor(
    private toastr:ToastrService,
    private router:Router,
    private importContainerDischargeExcelDetailLast24HourService:ImportContainerDischargeExcelDetailLast24HourService

  ) {
    this.rotation=localStorage.getItem("importContainerDischargeexcelLasr24HourRotation");
    this.impRotation=this.rotation.replace('-','/');
    this.fromDate=localStorage.getItem("importContainerDischargeexcelLasr24HourFromDate");
    this.fromTime=localStorage.getItem("importContainerDischargeexcelLasr24HourFromTime");
    this.toDate=localStorage.getItem("importContainerDischargeexcelLasr24HourToDate");
    this.toTime=localStorage.getItem("importContainerDischargeexcelLasr24HourToTime");
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
    else{
      this.importContainerDischargeExcelDetailLast24HourService.getImportContainerDischargeDetailLast24HourVesselInfo(this.rotation).subscribe(data=>{
        this.vesselInfo=data;
        for(let vessel of this.vesselInfo){
          this.vesselName=vessel.vsl_name;
          this.arrivalDate=vessel.ata;
          this.berth=vessel.berth;

        }
      });
      this.importContainerDischargeExcelDetailLast24HourService.getImportContainerDischargeDetailLast24HourVoyNo(this.rotation).subscribe(data=>{
        this.voyList=data;
        for(let res of this.voyList){
          this.voyNo=res.voy_No;
        }

      });
      this.importContainerDischargeExcelDetailLast24HourService.getImportContainer24HourDetailList(this.rotation,this.fromDate,this.fromTime,this.toDate,this.toTime).subscribe(data=>{
      this.resultList=data;

      });
      
     
    }
  }

  setMlo(rowMlo:String,rowWeight:number){

    if(rowMlo!=this.mlo){
          if(this.j > 0){
          // this.total=this.j;
            
            this.totalShowStatus=true;
        }
        else{
          this.totalShowStatus=false;
        }
     //this.orgNameShowStatus=true;
     this.j=1;
     this.weight=0;
     this.weight=rowWeight;

    }
    else{
      this.j++;
      this.weight=this.weight+rowWeight;
    }
    this.mlo=rowMlo;

  
  }
  setInitialValue(){
    
    this.j=0;
    this.weight=0;
   
   }

}
