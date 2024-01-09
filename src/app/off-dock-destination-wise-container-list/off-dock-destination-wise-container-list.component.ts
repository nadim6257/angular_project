import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OffDockDestinationWiseContainerService } from '../service/ImportReports/off-dock-destination-wise-container/off-dock-destination-wise-container.service';

@Component({
  selector: 'app-off-dock-destination-wise-container-list',
  templateUrl: './off-dock-destination-wise-container-list.component.html',
  styleUrls: ['./off-dock-destination-wise-container-list.component.css']
})
export class OffDockDestinationWiseContainerListComponent implements OnInit {
  rotation:any;
  showStatus:Boolean=true;
  vessleName:any;
  resultForVesselAndRotation:any;
  orgWiseResultList:any;
  districtWiseResultList:any;
  j:number=0;
  offDockId:String="";
  searchText:any;
  orgNameShowStatus:Boolean=false;
  totalShowStatus:Boolean=false;
  total:number=0;
  district:String="";
  k:number=0;
  i:number=0;
  countEachDistrictWise:number=0;
  totalContainerDistrictWiseShowStatus:Boolean=false;
  districtNameShowStatus:Boolean=false;
  totalContainer:number=0;
  countDistrictWiseTotalContainer:number=0;
  countOrgWiseTotalContainer:number=0;
  start:Boolean=false;
  


  constructor(
    private toastr:ToastrService,
    private router:Router,
    private offDockDestinationWiseContainerService:OffDockDestinationWiseContainerService

  ) {
    this.rotation=localStorage.getItem("rotationForOffDOckContainerList");
  
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
      console.log(this.rotation);
       this.offDockDestinationWiseContainerService.getVesselNameAndRotation(this.rotation).subscribe(data=>{
      this.resultForVesselAndRotation=data;
      console.log(this.resultForVesselAndRotation);
      for(let result of this.resultForVesselAndRotation ){
        this.vessleName=result.vessel_Name;
        console.log(this.vessleName);

      }
    });
    this.offDockDestinationWiseContainerService.getOrganizationWiseContainerList(this.rotation).subscribe(data=>{
      this.orgWiseResultList=data;
      for(let orgWise of this.orgWiseResultList ){
        this.i++;
      }
     
    });
    this.offDockDestinationWiseContainerService.getDistrictWiseContainerList(this.rotation).subscribe(data=>{
      this.districtWiseResultList=data;
      //console.log(this.districtWiseResultList);
      for(let districtWise of this.districtWiseResultList ){
        this.i++;
      }
    });

    }
   
    
  }
 
  
  setOffDock(offDock:String){

    if(offDock!=this.offDockId){
      if(this.j > 0){
        this.total=this.j;
        //this.countOrgWiseTotalContainer=this.countOrgWiseTotalContainer+this.total;
        this.totalShowStatus=true;
     }
     this.orgNameShowStatus=true;
     this.j=1;
    }
    else{
      this.totalShowStatus=false;
      this.orgNameShowStatus=false;
      this.j=this.j+1;
    }
    this.offDockId=offDock;
  }
 
  setInitialValueForOrgWiseList(){
    
   this.j=0;
   this.start=true;

  }
  /*setValues(){
    this.i=this.i+1;
    
  }*/

  setDistrict(dist:String){
    if(dist!=this.district){
      if(this.k >0){
        this.countEachDistrictWise=this.k;
       // this.countDistrictWiseTotalContainer=this.countDistrictWiseTotalContainer + this.countEachDistrictWise;
        this.totalContainerDistrictWiseShowStatus=true;
        
      }
      this.districtNameShowStatus=true;
      this.k=1;
    }
    else{
      this.totalContainerDistrictWiseShowStatus=false;
      this.districtNameShowStatus=false;
      this.k=this.k+1;
    }
    this.district=dist;

  }
  setInitialValueForDistrictWiseList(){
    //this.totalContainer=this.countDistrictWiseTotalContainer;
    this.k=0;
  }

} 


