import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RemovalListOfOverFlowYardService } from 'src/app/service/ImportReports/removal-list-of-over-flow-yard/removal-list-of-over-flow-yard.service';

@Component({
  selector: 'app-removal-list-of-over-flow-yard',
  templateUrl: './removal-list-of-over-flow-yard.component.html',
  styleUrls: ['./removal-list-of-over-flow-yard.component.css']
})
export class RemovalListOfOverFlowYardComponent implements OnInit {
  RemovalListOfOverFlowForm:FormGroup;
  assignDate:any;
  fileType:any;
  modify:any;
  resultList:any;

  constructor(
    private router: Router,
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute:ActivatedRoute,
    private removalListOfOverFlowYardService:RemovalListOfOverFlowYardService
    
  ) {
    this.assignDate="";
    this.modify="";
    this.RemovalListOfOverFlowForm=this.formBuilder.group({});
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

  }
  onSubmit(event:any){
    this.assignDate=event.assignDate.value;
    this.fileType=event.fileType.value;
    if(this.assignDate!=""){
      if(this.modify=="overflow"){
        if(this.fileType=="xl"){
       let response=this.removalListOfOverFlowYardService.getRemovalListOfOverFlowYard(this.assignDate,this.modify);
       response.subscribe(data=>{
         this.resultList=data;
         this.removalListOfOverFlowYardService.getResultWithExcel(this.resultList);
        });
      }
      else if(this.fileType=="html"|| this.fileType=="pdf"){
        localStorage.setItem("fileTypeForremovalListOfOverFlowYard",this.fileType);
        localStorage.setItem("assignDateForremovalListOfOverFlowYard",this.assignDate);
        localStorage.setItem("modifyForremovalListOfOverFlowYard",this.modify);
        this.router.navigate([]).then(result=>window.open('importReports/removalListOfOverFlowYard/report', '_blank'));
     

      }
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
