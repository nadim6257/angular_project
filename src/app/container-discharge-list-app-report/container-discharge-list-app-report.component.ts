import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContainerDischargeListAppService } from '../service/ImportReports/container-discharge-list-app/container-discharge-list-app.service';


@Component({
  selector: 'app-container-discharge-list-app-report',
  templateUrl: './container-discharge-list-app-report.component.html',
  styleUrls: ['./container-discharge-list-app-report.component.css']
})
export class ContainerDischargeListAppReportComponent implements OnInit {
  rotation:any;
  voyNumberResult:any;
  voyNumber:any;
  searchText:any;
  vesselInfoResult:any;
  balanceResultList:any;
  dischargeContainerResultList:any;
  balanceOnBoardSummaryResult:any;
  dischargeContianerSummaryResult:any;
  balanceOnBoardWiseSummaryResult:any
  dischargeContianerWiseSummaryResult:any;
  searchBy:any;
  searchYard:any;
  fromDate:any;
  fromTime:any;
  toDate:any;
  toTime:any;
  resultList:any;
  balanceSummaryResult:any;
  vesselName:any;
  voy:any;
  ata:any;
  allContainer:string="";
  onBoardLD20:any;
  onBoardLD40:any;
  onBoardMT20:any;
  onBoardMT40:any;
  onBoardLDTues:any;
  onBoardMTTues:any;

  balanceLD20:any;
  balanceLD40:any;
  balanceMT20:any;
  balanceMT40:any;
  balanceLDTues:any;
  balanceMTTues:any;
  cotainerDischargeTitle:any;


  constructor(
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private router:Router,
    private containerDischargeListAppService:ContainerDischargeListAppService
  ) {
    this.rotation=localStorage.getItem("containerDischargeAppRotation");
    this.searchBy=localStorage.getItem("containerDischargeAppSearchBy");
    this.searchYard=localStorage.getItem("containerDischargeAppSearchYard");
    this.fromDate=localStorage.getItem("containerDischargeAppFromDate");
    this.toDate=localStorage.getItem("containerDischargeAppToDate");
    this.fromTime=localStorage.getItem("containerDischargeAppFromTime");
    this.toTime=localStorage.getItem("containerDischargeAppToTime");
    this.cotainerDischargeTitle=localStorage.getItem("containerDischargeAppToTitle");

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
      this.containerDischargeListAppService.getVesselInfo(this.rotation).subscribe(result=>{
        this.vesselInfoResult=result;
       for(let res of this.vesselInfoResult){
         this.vesselName=res.vsl_name
         this.ata=res.ata;
         

       }
      });
      this.containerDischargeListAppService.getVoyNo(this.rotation).subscribe(result=>{
        this.voyNumberResult=result;
        for(let res of this.voyNumberResult){
          this.voy=res.voy_No;    
 
        }
      });
      this.containerDischargeListAppService.getContainerDischargeList(this.rotation,this.searchBy,this.searchYard,this.fromDate,this.toDate,this.fromTime,this.toTime).subscribe(result=>{
        this.resultList=result;
        for(let res of this.resultList){
          this.allContainer=this.allContainer+res.id+",";    
 
        }
      
      });
      this.containerDischargeListAppService.getContainerDischargeOnBoardSummary(this.rotation).subscribe(result=>{
        this.balanceOnBoardWiseSummaryResult=result;
     for(let res of this.balanceOnBoardWiseSummaryResult){
       this.onBoardLD20=res.onboard_LD_20;
       this.onBoardLD40=res.onboard_LD_40;
       this.onBoardMT20=res.onboard_MT_20;
       this.onBoardMT40=res.ononboard_MT_40;
       this.onBoardLDTues=res.onboard_LD_tues;
       this.onBoardMTTues=res.onboard_MT_tues;
      
     }

      });
      this.containerDischargeListAppService.getContainerDischargeBalanceSummary(this.rotation).subscribe(result=>{
        this.balanceSummaryResult=result;
        for(let res of this.balanceSummaryResult){
          this.balanceLD20=res.balance_LD_20;
          this.balanceLD40=res.balance_LD_40;
          this.balanceMT20=res.balance_MT_20;
          this.balanceMT40=res.balance_MT_40;
          this.balanceLDTues=res.balance_LD_tues;
          this.balanceMTTues=res.balance_MT_tues;
        }

      });
    }
  }

}
