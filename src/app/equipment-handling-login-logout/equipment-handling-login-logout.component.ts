import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EquipmentHandlingLoginLogoutService } from '../service/equipment-handling-login-logout/equipment-handling-login-logout.service';
import { EquipmentHandingPerformanceHistoryService } from '../service/equipment-handling-login-logout/equipment-handing-performance-history.service';


@Component({
  selector: 'app-equipment-handling-login-logout',
  templateUrl: './equipment-handling-login-logout.component.html',
  styleUrls: ['./equipment-handling-login-logout.component.css']
})
export class EquipmentHandlingLoginLogoutComponent implements OnInit {
  equipmentLoginLogoutForm: FormGroup;
  fromDate:any;
  shift:any;
  searchCriteria:any;
  searchValue:any;
  fileType:any;
  searchValues:any;
  resultList:any;
  i:number=0;
  
  

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private equipmentHandlingLoginLogoutService:EquipmentHandlingLoginLogoutService,
    private equipmentHandingPerformanceHistoryService: EquipmentHandingPerformanceHistoryService
  ) { 
    this.equipmentLoginLogoutForm=this.formBuilder.group({})
    
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
    this.fromDate=event.fromDate.value;
    console.log(this.fromDate);
   // localStorage.setItem("equipmentLoginLogoutfromDate",this.fromDate);
    this.shift=event.shift.value;
   // localStorage.setItem("equipmentLoginLogoutshift",this.shift)
    this.searchCriteria=event.searchCriteria.value;
    //localStorage.setItem("equipmentLoginLogoutsearchCriteria",this.searchCriteria);
    this.searchValue=event.searchValue.value;
   // localStorage.setItem("equipmentLoginLogoutsearchValue",this.searchValue);
    this.fileType=event.fileType.value;
    console.log(this.fileType);
    if(this.fromDate!=""){
    if(this.fileType=="html"){
      localStorage.setItem("equipmentLoginLogoutfromDate",this.fromDate);
      localStorage.setItem("equipmentLoginLogoutshift",this.shift);
      localStorage.setItem("equipmentLoginLogoutsearchCriteria",this.searchCriteria);
      localStorage.setItem("equipmentLoginLogoutsearchValue",this.searchValue);
      this.router.navigate([]).then(result=>window.open('importReports/equipmentLoginLogoutHistory', '_blank'));
    }
    else if(this.fileType=="xl"){
      let response=this.equipmentHandlingLoginLogoutService.getEquipmentLoginLogoutList(this.fromDate,this.shift,this.searchCriteria,this.searchValue);
      response.subscribe(data=>{  this.resultList=data;
      //this.equipmentHandingPerformanceHistoryService.getResult(data);
      this.equipmentHandingPerformanceHistoryService.getResultWithExcel(data,this.shift);
  
      });
    }
  }
  else{
    this.toastr.error('Form Date Or Shift Or SearchCriteria is Empty', 'Error',{
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
  onShiftChange(value:any){

  }
  onSearchCriteriaChange(value:any){
    let response=this.equipmentHandlingLoginLogoutService.getSearchValue(value);
    response.subscribe(data=>{console.log(data);this.searchValues=data;},
    err => {
      console.log(err);
     });

  }
  onSearchValueChange(value:any){}

  getDataFromLocalStorage(dataKey: string): any {
    const data = localStorage.getItem(dataKey);
    //const parsedData = JSON.parse(data);
   const parsedData=data;
    return parsedData;
   }


}
