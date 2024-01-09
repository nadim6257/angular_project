import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeederDischargeSummaryListService } from '../service/ImportReports/feeder-discharge-summary-list/feeder-discharge-summary-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feeder-discharge-summary-list',
  templateUrl: './feeder-discharge-summary-list.component.html',
  styleUrls: ['./feeder-discharge-summary-list.component.css']
})
export class FeederDischargeSummaryListComponent implements OnInit {
  feederDichargeSummaryListForm:FormGroup;
  rotation:String;
  checkBox:Boolean;
  resultList:any;
   vesselAndRotation:any;
  orgWiseList:any;
  districtWiseList:any;
  vvdgkey:any;
  rs:any;
  type:string;

  constructor(
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private router:Router,
    private feederDischargeSummaryListService:FeederDischargeSummaryListService
  ) {
    this.feederDichargeSummaryListForm=this.formBuilder.group({});
    this.rotation="";
    this.type="";
    this.checkBox=false;
   }

  ngOnInit(): void {
    //alert("hello");
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
    this.checkBox=event.offDockSelected.checked;
    if(this.checkBox){
      this.type="selected";
     
    }
    else{
      this.type="notSelected";
     
    }

    if(this.rotation!=""){
      let importRotation=this.rotation.replace("/","-");
  
      localStorage.setItem("feederDischargeSummaryListRotaion",importRotation);
      localStorage.setItem("feederDischargeSummaryListType",this.type);
      this.router.navigate([]).then(result=>window.open('importReports/feederDischargeSummaryList/report', '_blank'));

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
