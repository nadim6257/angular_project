import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { ContainerDischargeListAppService } from '../service/ImportReports/container-discharge-list-app/container-discharge-list-app.service';

@Component({
  selector: 'app-container-discharge-list-app',
  templateUrl: './container-discharge-list-app.component.html',
  styleUrls: ['./container-discharge-list-app.component.css']
})
export class ContainerDischargeListAppComponent implements OnInit {
  contanerDischargeAppForm:FormGroup;
  isEditable:Boolean=true;
  rotation:string;
  searchBy:string;
  searchYard:string;
  fromDate:string;
  fromTime:string;
  toDate:string;
  toTime:string;
  fileType:any;
  resultList:any;
  detailPage:any;
  searchValues:any;
  isEditableYard:Boolean=true;
  isEditableFormDate:Boolean=true;
  isEditableToDate:Boolean=true;
  isEditableFromTime:Boolean=true;
  isEditableToTime:Boolean=true;
  cotainerDischargeTitle:any;
  filterTerm: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12,15,18,21,24,27,30];


  constructor(
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private router:Router,
    private containerDischargeListAppService:ContainerDischargeListAppService
  ) {
    this.contanerDischargeAppForm=this.formBuilder.group({});
    this.rotation="";
    this.searchBy="";
    this.searchYard="";
    this.fromDate="";
    this.fromTime="";
    this.toDate="";
    this.toTime="";
    this.cotainerDischargeTitle="";
  
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
      this.containerDischargeListAppService.getAllContainerDischargeList().subscribe(data=>{
        this.resultList=data;
      })
    }
  }

  onSearchByChange(value:any){
    console.log(value);
    if(value=="all"){
    this.isEditableYard=true;
    this.isEditableFormDate=true;
    this.isEditableFromTime=true;
    this.isEditableToDate=true;
    this.isEditableToTime=true;

    }
    else if(value=="yard"){
      this.isEditableYard=false;
      this.isEditableFormDate=false;
      this.isEditableFromTime=true;
      this.isEditableToDate=false;
      this.isEditableToTime=true;
      this.containerDischargeListAppService.getYardList().subscribe(data=>{
        this.searchValues=data;
        console.log(this.searchValues);

      });
    }
    else if(value=="dateRange"){
      this.isEditableYard=true;
      this.isEditableFormDate=false;
      this.isEditableFromTime=true;
      this.isEditableToDate=false;
      this.isEditableToTime=true;
     
    }
    else if(value=="dateTime"){
      this.isEditableYard=true;
      this.isEditableFormDate=false;
      this.isEditableFromTime=false;
      this.isEditableToDate=false;
      this.isEditableToTime=false;
    }

  }
  onYardValueChange(value:any){

  }
  onSearchInput(){
    this.page = 1;
  }
  onTableDataChange(event: any) {
    this.page = event;
   
  }
  
  onSubmit(event:any){
    let  importRotation="";
    this.rotation=event.rotation.value;
    this.searchBy=event.searchBy.value;
    this.searchYard=event.searchYard.value;
    this.fromDate=event.fromDate.value;
    this.toDate=event.toDate.value;
    this.fromTime=event.fromDate.value;
    this.toTime=event.toTime.value;
    this.fileType=event.fileType.value;
    importRotation=this.rotation.replace("/","-");

    if(this.searchBy=="yard" && this.rotation==""){
      this.cotainerDischargeTitle="DISCHARGE CONTAINER FOR THE YARD "+this.searchYard;
    }
    if(this.searchBy=="yard" && this.rotation!=""){
      this.cotainerDischargeTitle="DISCHARGE CONTAINER FOR THE YARD "+this.searchYard;

    }
    if(this.searchBy=="all" && this.rotation!=""){
      this.cotainerDischargeTitle="DISCHARGE CONTAINER FOR THE ROTATION "+this.rotation;

    }
    else if(this.searchBy=="dateRange"){
      this.cotainerDischargeTitle="DISCHARGE CONTAINER FROM "+this.fromDate+" TO "+this.toDate;

    }
    else if(this.searchBy=="dateTime"){
      this.cotainerDischargeTitle="DISCHARGE CONTAINER FROM "+this.fromDate+" "+this.fromTime+" TO "+this.toDate+" "+this.toTime;

    }
    if(this.fileType=="xl"){
      console.log("comes to xl");
      let vesselInfo=this.containerDischargeListAppService.getVesselInfo(importRotation);
      let contaninerDischargeList=this.containerDischargeListAppService.getContainerDischargeList(importRotation,this.searchBy,this.searchYard,this.fromDate,this.toDate,this.fromTime,this.toTime);
      let containerOnBoardSummary=this.containerDischargeListAppService.getContainerDischargeOnBoardSummary(importRotation);
      let containerBalanceSummary=this.containerDischargeListAppService.getContainerDischargeBalanceSummary(importRotation);
      let voyNo=this.containerDischargeListAppService.getVoyNo(importRotation);
      forkJoin([vesselInfo,contaninerDischargeList,containerOnBoardSummary,containerBalanceSummary,voyNo]).subscribe(result=>{
        this.containerDischargeListAppService.getResultWithExcel(this.rotation,result[0],result[1],result[2],result[3],JSON.stringify(result[4]),this.cotainerDischargeTitle);
        
      

        });
      

    }
    else if(this.fileType=="html"){

      localStorage.setItem("containerDischargeAppRotation",importRotation);
      localStorage.setItem("containerDischargeAppSearchBy",this.searchBy);
      localStorage.setItem("containerDischargeAppSearchYard",this.searchYard);
      localStorage.setItem("containerDischargeAppFromDate",this.fromDate); 
      localStorage.setItem("containerDischargeAppToDate",this.toDate);
      localStorage.setItem("containerDischargeAppFromTime",this.fromTime); 
      localStorage.setItem("containerDischargeAppToTime",this.toTime);
      localStorage.setItem("containerDischargeAppToTitle",this.cotainerDischargeTitle)
      this.router.navigate([]).then(result=>window.open('importReports/containerDischargeListAppReport/report', '_blank'));

    }

    
    //**** validation start
 /*   if( this.rotation == "" ){
            this.toastr.error('Please provide Rotation!', 'Error',{
              // timeOut:5000,
              disableTimeOut: true,
              tapToDismiss: false,
              progressBar:true,
              progressAnimation:'increasing',
              positionClass:'toast-center-center',
              closeButton:true
            });
           
            return this.sendToService(false);
         }
		 if( this.searchBy == "" ){
            this.toastr.error('Please provide Search By!', 'Error',{
              // timeOut:5000,
              disableTimeOut: true,
              tapToDismiss: false,
              progressBar:true,
              progressAnimation:'increasing',
              positionClass:'toast-center-center',
              closeButton:true
            });
            return this.sendToService(false);
         }
		  if( this.searchYard == "yard" ){
              if( this.searchBy == "" ){
              this.toastr.error('Please provide Search Value!', 'Error',{
                // timeOut:5000,
                disableTimeOut: true,
                tapToDismiss: false,
                progressBar:true,
                progressAnimation:'increasing',
                positionClass:'toast-center-center',
                closeButton:true
              });
              
              return this.sendToService(false);
            }
            else
            {
              return this.sendToService(true); 
            }
      }
		  if( this.searchBy == "dateRange" ){
             if( this.fromDate == "" || this.toDate == ""){
              this.toastr.error('Please provide Search Date!', 'Error',{
                // timeOut:5000,
                disableTimeOut: true,
                tapToDismiss: false,
                progressBar:true,
                progressAnimation:'increasing',
                positionClass:'toast-center-center',
                closeButton:true
              });
            
              return this.sendToService(false);
            }
            else
            {
              return this.sendToService(true); 
            }
      }

		  if( this.searchBy == "dateTime" ){
            if( this.fromDate == "" || this.toDate == "" || this.fromTime == "" || this.toTime == ""){
              this.toastr.error('Please provide Search Date & Time!', 'Error',{
                // timeOut:5000,
                disableTimeOut: true,
                tapToDismiss: false,
                progressBar:true,
                progressAnimation:'increasing',
                positionClass:'toast-center-center',
                closeButton:true
              });
            
              return this.sendToService(false);
            }
            else
            {
              return this.sendToService(true); 
            }
     }
     
     return this.sendToService(true); */
     
//***** validation end
   
  }

  sendToService(check:boolean){
    if(check==true){
      let importRotation="";
      if(this.rotation!=""){
         importRotation=this.rotation.replace("/","-");
      }
      if(this.fileType=="xl"){
        console.log("comes to xl");
        let vesselInfo=this.containerDischargeListAppService.getVesselInfo(importRotation);
        let contaninerDischargeList=this.containerDischargeListAppService.getContainerDischargeList(importRotation,this.searchBy,this.searchYard,this.fromDate,this.toDate,this.fromTime,this.toTime);
        let containerOnBoardSummary=this.containerDischargeListAppService.getContainerDischargeOnBoardSummary(importRotation);
        let containerBalanceSummary=this.containerDischargeListAppService.getContainerDischargeBalanceSummary(importRotation);
        let voyNo=this.containerDischargeListAppService.getVoyNo(importRotation);
        forkJoin([vesselInfo,contaninerDischargeList,containerOnBoardSummary,containerBalanceSummary,voyNo]).subscribe(result=>{
          //this.containerDischargeListAppService.getResultWithExcel(this.rotation,result[0],result[1],result[2],result[3],JSON.stringify(result[4]));
          
        
  
          });
        

      }
      else if(this.fileType=="html"){

        localStorage.setItem("containerDischargeAppRotation",importRotation);
        localStorage.setItem("containerDischargeAppSearchBy",this.searchBy);
        localStorage.setItem("containerDischargeAppSearchYard",this.searchYard);
        localStorage.setItem("containerDischargeAppFromDate",this.fromDate); 
        localStorage.setItem("containerDischargeAppToDate",this.toDate);
        localStorage.setItem("containerDischargeAppFromTime",this.fromTime); 
        localStorage.setItem("containerDischargeAppToTime",this.toTime);
        this.router.navigate([]).then(result=>window.open('importReports/containerDischargeListAppReport/report', '_blank'));

      }

       


    }
    else{
      console.log("problem");
       return;
    }

  }

}
