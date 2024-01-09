import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ImportContainerDischargeAndBalanceService } from '../service/ImportReports/import-container-discharge-and-balance/import-container-discharge-and-balance.service';

@Component({
  selector: 'app-import-container-discharge-and-balance-report',
  templateUrl: './import-container-discharge-and-balance-report.component.html',
  styleUrls: ['./import-container-discharge-and-balance-report.component.css']
})
export class ImportContainerDischargeAndBalanceReportComponent implements OnInit {
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


  constructor(
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private router:Router,
   private importContainerDischargeAndBalanceService:ImportContainerDischargeAndBalanceService
  ) {
    this.rotation=localStorage.getItem("rotationForContainerDischargeAndBalanceOnBoard");
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

    if(this.rotation!=""){
      let importRotation=this.rotation.replace("/","-");
      let vesselInfo=this.importContainerDischargeAndBalanceService.getVesselInfo(importRotation);
      let balanceList=this.importContainerDischargeAndBalanceService.getBalanceOnBoardList(importRotation);
      let dischargeContainerList=this.importContainerDischargeAndBalanceService.getDischargeContainerList(importRotation);
      let balanceOnBoardSummary=this.importContainerDischargeAndBalanceService.getDischargeContainerBanlaceOnBoardSummary(importRotation);
      let dischargeContianerSummary=this.importContainerDischargeAndBalanceService.getDischargeContainerSummary(importRotation);
      let voyNo=this.importContainerDischargeAndBalanceService.getVoyNo(importRotation);
      forkJoin([vesselInfo,balanceList,dischargeContainerList,balanceOnBoardSummary,dischargeContianerSummary,voyNo]).subscribe(result=>{
      this.vesselInfoResult=result[0];
      this.balanceResultList=result[1];
      this.dischargeContainerResultList=result[2];
      this.balanceOnBoardWiseSummaryResult=result[3];
      this.dischargeContianerWiseSummaryResult=result[4];
      this.voyNumberResult=result[5];
      for(let rs of this.voyNumberResult ){
        this.voyNumber=rs;

      }
      for(let result of this.balanceOnBoardWiseSummaryResult){
        this.balanceOnBoardSummaryResult=result;
      }
       for(let res of this.dischargeContianerWiseSummaryResult){
         this.dischargeContianerSummaryResult=res;
        
       }
   
      

      });
      
    }

  }

}
