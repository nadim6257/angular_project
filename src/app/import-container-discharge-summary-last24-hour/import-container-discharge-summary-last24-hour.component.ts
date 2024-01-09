import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { ImportContainerDischargeSummaryLast24HourService } from '../service/ImportReports/import-container-discharge-summary-last24-Hour/import-container-discharge-summary-last24-hour.service';

@Component({
  selector: 'app-import-container-discharge-summary-last24-hour',
  templateUrl: './import-container-discharge-summary-last24-hour.component.html',
  styleUrls: ['./import-container-discharge-summary-last24-hour.component.css']
})
export class ImportContainerDischargeSummaryLast24HourComponent implements OnInit {
  importContainerDischargeSummaryLast24HourForm:FormGroup;
  rotation:any;
  assignDate:any;
  mloName:any;
  orgList:any;
  mloList:any;
  fileType:any;
  showOrgName:Boolean=false;
  showMlo:Boolean=false;


  constructor(
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private router:Router,
    private importContainerDischargeSummaryLast24HourService:ImportContainerDischargeSummaryLast24HourService
  ) {
    this.rotation="";
    this.assignDate="";
    this. importContainerDischargeSummaryLast24HourForm=this.formBuilder.group({});
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
    this.rotation=event.rotation.value;
    this.assignDate=event.assignDate.value;
    this.fileType=event.fileType.value;
  
    if(this.rotation!=""){
      let importRotation=this.rotation.replace("/","-");
      if(this.assignDate!=""){
        if(this.fileType=="xl"){
          let voyNo=this.importContainerDischargeSummaryLast24HourService.getVoyNo(importRotation);
          let vesselInfo=this.importContainerDischargeSummaryLast24HourService.getVesselInfo(importRotation);
          let summary=this.importContainerDischargeSummaryLast24HourService.getImportContainer24HourSummary(importRotation);
          let summary2=this.importContainerDischargeSummaryLast24HourService.getImportContainer24HourSummary2(importRotation);
          let summary3=this.importContainerDischargeSummaryLast24HourService.getImportContainer24HourSummary3(importRotation,this.assignDate);
          let summary4=this.importContainerDischargeSummaryLast24HourService.getImportContainer24HourSummary4(importRotation,this.assignDate);
          let summary5=this.importContainerDischargeSummaryLast24HourService.getImportContainer24HourSummary5(importRotation);
          let summary6=this.importContainerDischargeSummaryLast24HourService.getImportContainer24HourSummary6(importRotation);
          forkJoin([voyNo,vesselInfo,summary,summary2,summary3,summary4,summary5,summary6]).subscribe(result=>{
          /*  this.importContainerDischargeSummaryLast24HourService.getSummaryListWithExcel(importRotation,this.assignDate,JSON.stringify(result[0]),
              JSON.stringify(result[1]),JSON.stringify(result[2]),
              JSON.stringify(result[3]),JSON.stringify(result[4]),
              JSON.stringify(result[5]),JSON.stringify(result[6]),JSON.stringify(result[7]));*/
              this.importContainerDischargeSummaryLast24HourService.getSummaryListWithExcel(importRotation,this.assignDate,result[0],
              result[1],result[2],
              result[3],result[4],
              result[5],result[6],result[7]);
             

          });
          

        } 
        else if(this.fileType=="html"){

          localStorage.setItem("importContainerDischargeSummaryLast24HourRotation",importRotation);
          localStorage.setItem("importContainerDischargeSummaryLast24HourAssignDate",this.assignDate);
          this.router.navigate([]).then(result=>window.open('importReports/importContainerDischargeSummaryLast24HourReport/report', '_blank'));

        }


      }
      else{
        this.toastr.error('Date is Empty', 'Error',{
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
    else{
      this.toastr.error('Import Rotation is Empty', 'Error',{
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
