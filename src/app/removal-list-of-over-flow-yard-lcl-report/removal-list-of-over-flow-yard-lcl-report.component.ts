import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RemovalListOfOverFlowYardLclService } from '../service/ImportReports/removal-List-Of-Over-Flow-Yard-Lcl/removal-list-of-over-flow-yard-lcl.service';

@Component({
  selector: 'app-removal-list-of-over-flow-yard-lcl-report',
  templateUrl: './removal-list-of-over-flow-yard-lcl-report.component.html',
  styleUrls: ['./removal-list-of-over-flow-yard-lcl-report.component.css']
})
export class RemovalListOfOverFlowYardLclReportComponent implements OnInit {
  assignDate:any;
  modify:any;
  resultList:any;
  header:any;
  searchText:any;
  length:number=0;
  show:Boolean=true;
  fileType:any;
  showFooter:Boolean=true;
  serialNumberShow:Boolean=true;

  constructor(
    private toastr:ToastrService,
    private router:Router,
    private removalListOfOverFlowYardLclService:RemovalListOfOverFlowYardLclService
  ) { 
    this.fileType=localStorage.getItem("fileTypeForremovalListOfOverFlowYardLcl");
    this.assignDate=localStorage.getItem("assignDateForremovalListOfOverFlowYardLcl");
    this.modify=localStorage.getItem("modifyForremovalListOfOverFlowYardLcl");
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
    if(this.assignDate!="" && this.modify!=""){
      if(this.modify=="overflow"){
        this.header="Removal Tally of Overflow Yard";
        this.showFooter=true;
        this.serialNumberShow=true;

      }
      else if(this.modify=="all"){
        this.showFooter=false;
        this.serialNumberShow=false;
        this.header="List of CTMS Assignment";

      }
      this.removalListOfOverFlowYardLclService.getRemovalListOfOverFlowYardLcl(this.assignDate).subscribe(data=>
        {
          if(data){
          this.resultList=data;
          this.length=this.resultList.length;
         
        }
        });
      
    }
  }
  print(){

    window.print();
    this.show=false;
  }


}
