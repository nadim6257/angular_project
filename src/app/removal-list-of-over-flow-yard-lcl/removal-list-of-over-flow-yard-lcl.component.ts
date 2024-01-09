import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RemovalListOfOverFlowYardLclService } from '../service/ImportReports/removal-List-Of-Over-Flow-Yard-Lcl/removal-list-of-over-flow-yard-lcl.service';

@Component({
  selector: 'app-removal-list-of-over-flow-yard-lcl',
  templateUrl: './removal-list-of-over-flow-yard-lcl.component.html',
  styleUrls: ['./removal-list-of-over-flow-yard-lcl.component.css']
})
export class RemovalListOfOverFlowYardLclComponent implements OnInit {
  RemovalListOfOverFlowFormLcl:FormGroup;
  assignDate:any;
  fileType:any;
  modify:any;
  resultList:any;
  header:any="";

  constructor(
    private router: Router,
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute:ActivatedRoute,
    private removalListOfOverFlowYardLclService:RemovalListOfOverFlowYardLclService
  ) {
    this.assignDate="";
    this.modify="";
   
    this.RemovalListOfOverFlowFormLcl=this.formBuilder.group({});
   }

  ngOnInit(): void {
    if(localStorage['status']!=1)
    {
    
      this.router.navigate(['/login']);
      this.toastr.error('Login and try again.', 'Error',{
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      return;
    }
    this.modify =this.activatedRoute.snapshot.url[2].path;
    if(this.modify=="overflow"){
      this.header="Removal List Of Overflow Yard (LCL)";
     

    }
    else if(this.modify=="all"){
     
      this.header="List of CTMS Assignment";
    }

  }
  onSubmit(event:any){
    this.assignDate=event.assignDate.value;
    this.fileType=event.fileType.value;
    if(this.assignDate!=""){
        if(this.fileType=="xl"){
       let response=this.removalListOfOverFlowYardLclService.getRemovalListOfOverFlowYardLcl(this.assignDate);
       response.subscribe(data=>{
         this.resultList=data;
         this.removalListOfOverFlowYardLclService.getResultWithExcel(this.resultList,this.modify);
        });
      }
      else if(this.fileType=="html"|| this.fileType=="pdf"){
        localStorage.setItem("fileTypeForremovalListOfOverFlowYardLcl",this.fileType);
        localStorage.setItem("assignDateForremovalListOfOverFlowYardLcl",this.assignDate);
        localStorage.setItem("modifyForremovalListOfOverFlowYardLcl",this.modify);
        this.router.navigate([]).then(result=>window.open('importReports/removalListOfOverFlowYardLcl/report', '_blank'));
     

      }
    
}
     else{
       this.toastr.error('Assignment Date is Empty', 'Error',{
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
