import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EquipmentHandingPerformanceHistoryService } from '../service/equipment-handling-login-logout/equipment-handing-performance-history.service';
import { EquipmentHandlingLoginLogoutService } from '../service/equipment-handling-login-logout/equipment-handling-login-logout.service';


@Component({
  selector: 'app-equipment-handling-performance-history',
  templateUrl: './equipment-handling-performance-history.component.html',
  styleUrls: ['./equipment-handling-performance-history.component.css']
})
export class EquipmentHandlingPerformanceHistoryComponent implements OnInit {
@ViewChild('TABLE', { static: false }) TABLE:any; 
searchText:any;
resultList:any;
fromDate:any;
shift:any;
searchCriteria:any;
searchValue:any;
s:any;
i:number=0;
fileName= 'ExcelSheet.xlsx';
 title:any = 'Equipment Performance History';
  header:any = ["VMT Logln/LogOut Time", "Log Type", "User Name", "Operator Name", "Program"];

  constructor(
    private equipmentHandingPerformanceHistoryService:EquipmentHandingPerformanceHistoryService,
    private router: Router,
    private toastr:ToastrService,
    private equipmentHandlingLoginLogoutService:EquipmentHandlingLoginLogoutService
  ) {
    this.fromDate=localStorage.getItem("equipmentLoginLogoutfromDate")
    this.shift=localStorage.getItem("equipmentLoginLogoutshift");
    this.searchCriteria=localStorage.getItem("equipmentLoginLogoutsearchCriteria");
    this.searchValue=localStorage.getItem("equipmentLoginLogoutsearchValue");

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

   /* this.equipmentHandingPerformanceHistoryService.share.subscribe(data=>{//console.log(data);
      //this.resultList=data;
    });*/
    let response=this.equipmentHandlingLoginLogoutService.getEquipmentLoginLogoutList(this.fromDate,this.shift,this.searchCriteria,this.searchValue);
    response.subscribe(data=>{console.log(data);this.resultList=data});
   // localStorage.removeItem("fromDate");
   // localStorage.removeItem("shift");
   // localStorage.removeItem("searchCriteria");
  //  localStorage.removeItem("searchValue");



      //this.resultList = JSON.parse(localStorage.getItem("res"));
     // this.resultList=localStorage.getItem("res");
    
    // this.resultList=this.getDataFromLocalStorage("res");
    // console.log(localStorage.getItem("res"));
     //console.log(localStorage.getItem("res"));

 


  }
  getDataFromLocalStorage(dataKey: string): any {
    const data = localStorage.getItem(dataKey);
    //const parsedData = JSON.parse(data);
   const parsedData=data;
    return parsedData;
   }

}
