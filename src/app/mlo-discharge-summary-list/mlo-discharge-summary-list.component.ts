import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { MloDischargeSummaryListService } from '../service/ImportReports/mlo-discharge-summary-list/mlo-discharge-summary-list.service';

@Component({
  selector: 'app-mlo-discharge-summary-list',
  templateUrl: './mlo-discharge-summary-list.component.html',
  styleUrls: ['./mlo-discharge-summary-list.component.css']
})
export class MloDischargeSummaryListComponent implements OnInit {
  
  mloDischargeSummaryListForm:FormGroup;
  rotation:any;
  orgName:any;
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
    private mloDischargeSummaryListService:MloDischargeSummaryListService 
  ) {
    this. mloDischargeSummaryListForm=this.formBuilder.group({});
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
  getOrg(event:any){
    this.showOrgName=true;
    this.rotation=event.value;
    let importRotation=this.rotation.replace("/","-");

    this.mloDischargeSummaryListService.getAgentList(importRotation).subscribe(result=>{
      this.orgList=result;
    });

  }
  showMloList(event:any){
    this.showMlo=true;

  }
  orgNameChange(orgId:any){
    this.mloDischargeSummaryListService.getMloList(orgId).subscribe(result=>{
      this.mloList=result;
    });
}
  mloNameChange(mloCode:any){
   
  

  }
  onSubmit(event:any){
    this.rotation=event.rotation.value;
    this.orgName=event.orgName.value;
    this.mloName=event.mloName.value;
    this.fileType=event.fileType.value;
    if(this.rotation!=""){
     let importRotation=this.rotation.replace("/","-");
     // this.rotation=event.rotation.value;
     // this.orgName=event.orgName.value;
     // this.mloName=event.mloName.value;
     // this.fileType=event.fileType.value;
      if(this.fileType=="xl"){
        let igmInfo=this.mloDischargeSummaryListService.getIgmInfo(importRotation);
        let dateInfo=this.mloDischargeSummaryListService.getDateInfo(importRotation);
        let summaryList=this.mloDischargeSummaryListService.getMloDischargeSummaryList(importRotation,this.orgName,this.mloName);
        forkJoin([igmInfo,dateInfo,summaryList]).subscribe(result=>{
          this.mloDischargeSummaryListService.getSummaryListWithExcel(JSON.stringify(result[0]),JSON.stringify(result[1]),result[2],this.rotation,this.mloName)
        })

      }
      else if(this.fileType=="html"){
        localStorage.setItem("mloDischargeSummaryRotation",importRotation);
        localStorage.setItem("mloDischargeSummaryOrgName",this.orgName);
        localStorage.setItem("mloDischargeSummaryMloName",this.mloName);
        this.router.navigate([]).then(result=>window.open('importReports/mloDischargeSummaryListReport/report', '_blank'));

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
