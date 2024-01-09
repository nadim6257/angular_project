import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MloWiseImportLoadedContainerSummaryService } from '../service/ImportReports/mlo-wise-import-loaded-container-summary/mlo-wise-import-loaded-container-summary.service';

@Component({
  selector: 'app-mlo-wise-import-loaded-container-summary-report',
  templateUrl: './mlo-wise-import-loaded-container-summary-report.component.html',
  styleUrls: ['./mlo-wise-import-loaded-container-summary-report.component.css']
})
export class MloWiseImportLoadedContainerSummaryReportComponent implements OnInit {
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
  mlo:any;
  j:number=0;
  weight:number=0;
  totalShowStatus:Boolean=false;
  sailedNo:any;
  show:boolean=true;
  totalShow:boolean=false;

  constructor(
    private toastr:ToastrService,
    private router:Router,
    private mloWiseImportLoadedContainerSummaryService:MloWiseImportLoadedContainerSummaryService
  ) {
    this.rotation=localStorage.getItem("rotationMloWiseLoadedContainerSummary");
    this.impRotation=this.rotation.replace('-','/');
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
      this.mloWiseImportLoadedContainerSummaryService.getVesselInfo(this.rotation).subscribe(data=>{
        this.vesselInfo=data;
        for(let vessel of this.vesselInfo){
          this.vesselName=vessel.vsl_name;
          this.arrivalDate=vessel.ata;
          this.berth=vessel.berth;
          this.sailedNo=vessel.atd;

        }
      });
      this.mloWiseImportLoadedContainerSummaryService.getVoyNo(this.rotation).subscribe(data=>{
        this.voyList=data;
        for(let res of this.voyList){
          this.voyNo=res.voy_No;
        }

      });
      this.mloWiseImportLoadedContainerSummaryService.getMloWiseImportLoadedContainerSummaryList(this.rotation).subscribe(data=>{
      this.resultList=data;
     

      });
      
     
    }
  }
  checkMlo(resultMlo:any){
    if(resultMlo==null){
      this.show=false;
      this.totalShow=true;
    }
    else{
      this.show=true;
      this.totalShow=false;
    }
    
  }

}
