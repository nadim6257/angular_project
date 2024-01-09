import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImportContainerDischargeAndBalanceService } from '../service/ImportReports/import-container-discharge-and-balance/import-container-discharge-and-balance.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-import-container-discharge-and-balance-form',
  templateUrl: './import-container-discharge-and-balance-form.component.html',
  styleUrls: ['./import-container-discharge-and-balance-form.component.css']
})
export class ImportContainerDischargeAndBalanceFormComponent implements OnInit {
  importCotainerdischargeandbalacereport:FormGroup;
  rotation:String;
  fileType:any;
  resultList:any;
   vesselAndRotation:any;
  orgWiseList:any;
  districtWiseList:any;
  vvdgkey:any;
  rs:any;

  constructor(
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private router:Router,
   private importContainerDischargeAndBalanceService:ImportContainerDischargeAndBalanceService
  ) {
    this.importCotainerdischargeandbalacereport=this.formBuilder.group({});
    this.rotation="";
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
    this.fileType=event.fileType.value;
    if(this.rotation!=""){
      let importRotation=this.rotation.replace("/","-");
      if(this.fileType=="xl"){
        let vesselInfo=this.importContainerDischargeAndBalanceService.getVesselInfo(importRotation);
        let balanceList=this.importContainerDischargeAndBalanceService.getBalanceOnBoardList(importRotation);
        let dischargeContainerList=this.importContainerDischargeAndBalanceService.getDischargeContainerList(importRotation);
        let balanceOnBoardSummary=this.importContainerDischargeAndBalanceService.getDischargeContainerBanlaceOnBoardSummary(importRotation);
        let dischargeContianerSummary=this.importContainerDischargeAndBalanceService.getDischargeContainerSummary(importRotation);
        let voyNo=this.importContainerDischargeAndBalanceService.getVoyNo(importRotation);
        forkJoin([vesselInfo,balanceList,dischargeContainerList,balanceOnBoardSummary,dischargeContianerSummary,voyNo]).subscribe(result=>{
        this.importContainerDischargeAndBalanceService.getResultWithExcel(this.rotation,result[0],result[1],result[2],result[3],result[4],result[5]);
        //this.importContainerDischargeAndBalanceService.getResultWithExcel(this.rotation,JSON.stringify(balanceList),JSON.stringify(dischargeContainerList),balanceOnBoardSummary,dischargeContianerSummary);
      

        });

  }
      else if(this.fileType=="html"){
        localStorage.setItem("rotationForContainerDischargeAndBalanceOnBoard",importRotation);
        this.router.navigate([]).then(result=>window.open('importReports/importContainerDischargeAndBalance/report', '_blank'));
        
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
