import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { ImportContainerDischargeExcelDetailLast24HourService } from '../service/ImportReports/import-container-discharge-excel-detail-last24-hour/import-container-discharge-excel-detail-last24-hour.service';

@Component({
  selector: 'app-import-container-discharge-excel-detail-last24-hour',
  templateUrl: './import-container-discharge-excel-detail-last24-hour.component.html',
  styleUrls: ['./import-container-discharge-excel-detail-last24-hour.component.css']
})
export class ImportContainerDischargeExcelDetailLast24HourComponent implements OnInit {
  importContainerDischargeExcelDetailLast24HourForm:FormGroup;
  isEditable:Boolean=true;
  rotation:any;
  fromDate:any;
  fromTime:any;
  toDate:any;
  toTime:any;
  fileType:any;
  resultList:any;
  detailPage:any;
  submissionStatus:any;

  constructor(
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private router:Router,
    private importContainerDischargeExcelDetailLast24HourService:ImportContainerDischargeExcelDetailLast24HourService
  ) {
    this.importContainerDischargeExcelDetailLast24HourForm=this.formBuilder.group({});
    this.rotation="";
    this.fromDate="";
    this.fromTime="";
    this.toDate="";
    this.toTime="";
    this.fileType="";
    this.submissionStatus="";
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
 
  getDetailList(){
    if(this.rotation!=""){
      let importRotation=this.rotation.replace("/","-");
      if(this.fileType=="xl"){
        let vesselInfo=this.importContainerDischargeExcelDetailLast24HourService.getImportContainerDischargeDetailLast24HourVesselInfo(importRotation);
        let voyNo=this.importContainerDischargeExcelDetailLast24HourService.getImportContainerDischargeDetailLast24HourVoyNo(importRotation);
        let detailList=this.importContainerDischargeExcelDetailLast24HourService.getImportContainer24HourDetailList(importRotation,this.fromDate,this.fromTime,this.toDate,this.toTime);
        forkJoin([vesselInfo,voyNo,detailList]).subscribe(result=>{
          this.importContainerDischargeExcelDetailLast24HourService.getDetailListWithExcel(this.rotation,result[0],JSON.stringify(result[1]),result[2])

        });



      }
      else if(this.fileType=="html"){
        localStorage.setItem("importContainerDischargeexcelLasr24HourRotation",importRotation);
        localStorage.setItem("importContainerDischargeexcelLasr24HourFromDate",this.fromDate);
        localStorage.setItem("importContainerDischargeexcelLasr24HourFromTime",this.fromTime);
        localStorage.setItem("importContainerDischargeexcelLasr24HourToDate",this.toDate);
        localStorage.setItem("importContainerDischargeexcelLasr24HourToTime",this.toTime);
        this.router.navigate([]).then(result=>window.open('importReports/importContainerDischargeExcelDetailLast24Hour/detail', '_blank'));
      }
    }
    else{
      this.toastr.error('Rotation is Empty', 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
    }
  
  }
  getSummaryList(){
    if(this.rotation!=""){
      let importRotation=this.rotation.replace("/","-");
      if(this.fileType=="xl"){
        let vesselInfo=this.importContainerDischargeExcelDetailLast24HourService.getImportContainerDischargeDetailLast24HourVesselInfo(importRotation);
        let voyNo=this.importContainerDischargeExcelDetailLast24HourService.getImportContainerDischargeDetailLast24HourVoyNo(importRotation);
        let summaryList=this.importContainerDischargeExcelDetailLast24HourService.getImportContainer24HourSummaryList(importRotation,this.fromDate,this.fromTime,this.toDate,this.toTime);
        forkJoin([vesselInfo,voyNo,summaryList]).subscribe(result=>{
         
         this.importContainerDischargeExcelDetailLast24HourService.getSummaryListWithExcel(this.rotation,result[0],JSON.stringify(result[1]),result[2]);

        });
        
      }
      else if(this.fileType=="html"){
        localStorage.setItem("importContainerDischargeexcelLasr24HourRotation",importRotation);
        localStorage.setItem("importContainerDischargeexcelLasr24HourFromDate",this.fromDate);
        localStorage.setItem("importContainerDischargeexcelLasr24HourFromTime",this.fromTime);
        localStorage.setItem("importContainerDischargeexcelLasr24HourToDate",this.toDate);
        localStorage.setItem("importContainerDischargeexcelLasr24HourToTime",this.toTime);
        this.router.navigate([]).then(result=>window.open('importReports/importContainerDischargeExcelDetailLast24Hour/summary', '_blank'));

      }
    }
    else{
      this.toastr.error('Rotation is Empty', 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
    }

  }

}
