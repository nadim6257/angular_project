import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImportContainerDischargeSummaryLast24HourService } from '../service/ImportReports/import-container-discharge-summary-last24-Hour/import-container-discharge-summary-last24-hour.service';


@Component({
  selector: 'app-import-container-discharge-summary-last24-hour-report',
  templateUrl: './import-container-discharge-summary-last24-hour-report.component.html',
  styleUrls: ['./import-container-discharge-summary-last24-hour-report.component.css']
})
export class ImportContainerDischargeSummaryLast24HourReportComponent implements OnInit {
  rotation:any;
  assignDate:any;
  importRotation:any;
  voyResult:any;
  voyNo:any;
  vesselInfo:any;
  vesselInfoRow:any;
  summaryResult:any;
  summaryRow:any;
  summary1Result:any;
  summary1Row:any;
  summary2Result:any;
  summary2Row:any;
  summary3Result:any;
  summary3Row:any;
  summary4Result:any;
  summary4Row:any;
  summary5Result:any;
  summary5Row:any;
  summary6Result:any;
  summary6Row:any;
  footer:any;
  footerRow:any;
  a:number=5;
  berth:any="";


  constructor(
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private router:Router,
    private importContainerDischargeSummaryLast24HourService:ImportContainerDischargeSummaryLast24HourService
  ) {
    this.rotation=localStorage.getItem("importContainerDischargeSummaryLast24HourRotation");
    this.importRotation=this.rotation.replace('-','/');
    this.assignDate=localStorage.getItem("importContainerDischargeSummaryLast24HourAssignDate");
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
      this.importContainerDischargeSummaryLast24HourService.getVoyNo(this.rotation).subscribe(data=>{
        this.voyResult=data;
        this.voyNo=this.voyResult[0].voy_No;

      });
      this.importContainerDischargeSummaryLast24HourService.getVesselInfo(this.rotation).subscribe(data=>{
        this.vesselInfo=data;
        console.log(this.vesselInfo)
        this.vesselInfoRow=this.vesselInfo[0];

      });
      this.importContainerDischargeSummaryLast24HourService.getImportContainer24HourSummary(this.rotation).subscribe(data=>{
        this.summaryResult=data;
        this.summaryRow=this.summaryRow[0];

      });
      this.importContainerDischargeSummaryLast24HourService.getImportContainer24HourSummary2(this.rotation).subscribe(data=>{
        this.summary2Result=data;
        this.summary2Row=this.summary2Result[0];

      });
      this.importContainerDischargeSummaryLast24HourService.getImportContainer24HourSummary3(this.rotation,this.assignDate).subscribe(data=>{
        this.summary3Result=data;
        this.summary3Row=this.summary3Result[0];

      });
      this.importContainerDischargeSummaryLast24HourService.getImportContainer24HourSummary4(this.rotation,this.assignDate).subscribe(data=>{
        this.summary4Result=data;
        this.summary4Row=this.summary4Result[0];

      });
      this.importContainerDischargeSummaryLast24HourService.getImportContainer24HourSummary5(this.rotation).subscribe(data=>{
        this.summary5Result=data;
        this.summary5Row=this.summary5Result[0];

      });
      this.importContainerDischargeSummaryLast24HourService.getImportContainer24HourSummary6(this.rotation).subscribe(data=>{
        this.summary6Result=data;
        this.summary6Row=this.summary6Result[0];

      });
      this.importContainerDischargeSummaryLast24HourService.getVesselInfo(this.rotation).subscribe(data=>{
        this.footer=data;
        for(let val of this.footer){
          this.berth=val.berth;
          console.log("berth "+ this.berth);

        }
      });

      




    }
  }

}
