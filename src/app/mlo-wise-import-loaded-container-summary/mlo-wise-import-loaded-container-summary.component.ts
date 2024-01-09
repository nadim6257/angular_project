import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MloWiseImportLoadedContainerSummaryService } from '../service/ImportReports/mlo-wise-import-loaded-container-summary/mlo-wise-import-loaded-container-summary.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mlo-wise-import-loaded-container-summary',
  templateUrl: './mlo-wise-import-loaded-container-summary.component.html',
  styleUrls: ['./mlo-wise-import-loaded-container-summary.component.css']
})
export class MloWiseImportLoadedContainerSummaryComponent implements OnInit {
  mloWiseImportContainerLoadedSummaryForm:FormGroup;
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
    private mloWiseImportLoadedContainerSummaryService:MloWiseImportLoadedContainerSummaryService
  ) {
    this.mloWiseImportContainerLoadedSummaryForm=this.formBuilder.group({});
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
        let vesselInfo=this.mloWiseImportLoadedContainerSummaryService.getVesselInfo(importRotation);
        let voyNo=this.mloWiseImportLoadedContainerSummaryService.getVoyNo(importRotation);
        let resultList=this.mloWiseImportLoadedContainerSummaryService.getMloWiseImportLoadedContainerSummaryList(importRotation)
        forkJoin([vesselInfo,voyNo,resultList]).subscribe(result=>{
        this.mloWiseImportLoadedContainerSummaryService.getListWithExcel(this.rotation,result[0],JSON.stringify(result[1]) ,result[2]);
      
        });

  }
      else if(this.fileType=="html"){
        localStorage.setItem("rotationMloWiseLoadedContainerSummary",importRotation);
        this.router.navigate([]).then(result=>window.open('importReports/mloWiseImportLoadedContainerSummaryReport/report', '_blank'));
        
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
