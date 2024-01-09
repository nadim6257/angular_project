import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MloDischargeSummaryListService } from '../service/ImportReports/mlo-discharge-summary-list/mlo-discharge-summary-list.service';

@Component({
  selector: 'app-mlo-discharge-summary-list-report',
  templateUrl: './mlo-discharge-summary-list-report.component.html',
  styleUrls: ['./mlo-discharge-summary-list-report.component.css']
})
export class MloDischargeSummaryListReportComponent implements OnInit {
  rotation:any;
  orgName:any;
  mloName:any;
  igmInfo:any;
  dateInfo:any;
  summaryList:any;
  organizationName:any;
  vesselName:any;
  importRotationNo:any;
  importRotation:any;
  voyNo:any;
  etaDate:any;
  etdDate:any;
  res:any;
  row:any;
  row2:any;
  row3:any;
  row4:any;
  row5:any;
  row6:any;
  row7:any;
  row8:any;
  row9:any;
  row10:any;
  row11:any;
  row12:any;
  row13:any;
  row14:any;
  row21:any;
  row22:any;
  row23:any;
  row24:any;
  row25:any;
  row26:any;
  row27:any;
  row110:any;
  row120:any;
  row260:any;
  total1:any;
  total2:any;
  total3:any;
  total4:any;
  total5:any;
  total6:any;
  total7:any;
  total9:any;
  total8:any;
  total10:any;
  total11:any;
  total12:any;
  total13:any;
  total14:any;
  total15:any;

  constructor(
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private router:Router,
    private mloDischargeSummaryListService:MloDischargeSummaryListService 
  ) { 
    this.rotation=localStorage.getItem("mloDischargeSummaryRotation");
    this.importRotation=this.rotation.replace('-','/');
    this.orgName=localStorage.getItem("mloDischargeSummaryOrgName");
    this.mloName=localStorage.getItem("mloDischargeSummaryMloName");
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
      this.mloDischargeSummaryListService.getIgmInfo(this.rotation).subscribe(result=>{
        this.igmInfo=result;
       
        for(let res of this.igmInfo){
          this.organizationName=res.organization_Name;
          this.vesselName=res.vessel_Name;
          this.voyNo=res.voy_No;
          this.importRotationNo=res.import_Rotation_No;

        }
      });
      this.mloDischargeSummaryListService.getDateInfo(this.rotation).subscribe(result=>{
        this.dateInfo=result;
        for(let res of this.dateInfo){
          this.etaDate=res.eta_Date;
          this.etdDate=res.etd_Date;

        }
      });
      this.mloDischargeSummaryListService.getMloDischargeSummaryList(this.rotation,this.orgName,this.mloName).subscribe(result=>{
        this.summaryList=result;
       this.row=this.summaryList[0];
       this.row2=this.summaryList[1];
       this.row3=this.summaryList[2];
       this.row4=this.summaryList[3];
       this.row5=this.summaryList[4];
       this.row6=this.summaryList[5];
       this.row7=this.summaryList[6];
       this.row8=this.summaryList[7];
       this.row9=this.summaryList[8];
       this.row10=this.summaryList[9];
       this.row11=this.summaryList[10];
       this.row12=this.summaryList[11];
       this.row13=this.summaryList[12]; 
       this.row14=this.summaryList[13];
       this.row21=this.summaryList[14];
       this.row22=this.summaryList[15];
       this.row23=this.summaryList[16];
       this.row24=this.summaryList[17];
       this.row25=this.summaryList[18];
       this.row26=this.summaryList[19];
       this.row27=this.summaryList[20];
       this.row110=this.summaryList[21];
       this.row120=this.summaryList[22];
       this.row260=this.summaryList[23];

       this.total1=this.row.number+this.row3.number+this.row5.number+this.row7.number+this.row9.number+this.row11.number;
       this.total2=this.row2.number+this.row4.number+this.row6.number+this.row8.number+this.row10.number+this.row12.number;
       this.total3=this.row21.number+this.row22.number+this.row23.number+this.row24.number+this.row25.number+this.row260.number
       this.total4=this.row.number+this.row3.number+this.row5.number+this.row7.number+this.row9.number+this.row11.number;
       this.total5=this.row2.number+this.row4.number+this.row6.number+this.row8.number+this.row10.number+this.row12.number;
       this.total6=this.row21.number+  this.row22.number+ this.row23.number+  this.row24.number+  this.row25.number+  this.row260.number;
       this.total7=this.row.net_weight+this.row3.net_weight+this.row5.net_weight+this.row7.net_weight+this.row9.net_weight;
       this.total8=this.row2.net_weight+this.row4.net_weight+this.row6.net_weight+this.row8.net_weight+this.row10.net_weight;
       this.total10=this.row.gross_weight+this.row3.gross_weight+this.row5.gross_weight+this.row7.gross_weight+this.row9.gross_weight;
       this.total11=this.row2.gross_weight+this.row4.gross_weight+this.row6.gross_weight+this.row8.gross_weight+this.row10.gross_weight;
       this.total13=this.row.gross_weight+this.row3.gross_weight+this.row5.gross_weight+this.row7.gross_weight+this.row9.gross_weight;
       this.total14=this.row2.gross_weight+this.row4.gross_weight+this.row6.gross_weight+this.row8.gross_weight+this.row10.gross_weight;
       this.total9=this.row21.net_weight+this.row22.net_weight+this.row23.net_weight+this.row24.net_weight+this.row25.net_weight;
       this.total12=this.row21.gross_weight+this.row22.gross_weight+this.row23.gross_weight+this.row24.gross_weight+this.row25.gross_weight;
       this.total15=this.row21.gross_weight+this.row22.gross_weight+this.row23.gross_weight+this.row24.gross_weight+this.row25.gross_weight;
      
      
      
       
        
      });
    }
  }

}
