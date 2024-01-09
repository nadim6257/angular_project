import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OffDockDestinationWiseContainerService } from '../service/ImportReports/off-dock-destination-wise-container/off-dock-destination-wise-container.service';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-off-dock-destination-wise-container',
  templateUrl: './off-dock-destination-wise-container.component.html',
  styleUrls: ['./off-dock-destination-wise-container.component.css']
})
export class OffDockDestinationWiseContainerComponent implements OnInit {
 offDockDestinationWiseContainerForm:FormGroup;
 rotation:String;
  fileType:any;
  resultList:any;
   vesselAndRotation:any;
  orgWiseList:any;
  districtWiseList:any;
  rs:any;

  constructor(
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private router:Router,
    private offDockDestinationWiseContainerService:OffDockDestinationWiseContainerService 
  ) {
    this.offDockDestinationWiseContainerForm=this.formBuilder.group({});
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
      let responseForvesellName=this.offDockDestinationWiseContainerService.getVesselNameAndRotation(importRotation);
      let responseForOrgWiseList=this.offDockDestinationWiseContainerService.getOrganizationWiseContainerList(importRotation);
      let responseForDistrictWiseList=this.offDockDestinationWiseContainerService.getDistrictWiseContainerList(importRotation);
      forkJoin([responseForvesellName,responseForOrgWiseList,responseForDistrictWiseList]).subscribe(result=>{
      //console.log(JSON.stringify(result[1]));console.log(JSON.stringify(result[2]));
       this.offDockDestinationWiseContainerService.getResultWithExcel(importRotation,JSON.stringify(result[0]),JSON.stringify(result[1]),JSON.stringify(result[2]));
      });


       }
      else if(this.fileType=="html"){
        localStorage.setItem("rotationForOffDOckContainerList",importRotation);
        this.router.navigate([]).then(result=>window.open('importReports/offDockDestinationWiseContainer/report', '_blank'));
        
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
  getResult( responseForvesellName:any,  responseForOrgWiseList:any){
  // forkJoin(responseForvesellName,responseForOrgWiseList).subscribe()
 }
 

}
