import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RemovalListOfOverFlowYardService } from 'src/app/service/ImportReports/removal-list-of-over-flow-yard/removal-list-of-over-flow-yard.service';

@Component({
  selector: 'app-removal-list-of-over-flow-yard-report',
  templateUrl: './removal-list-of-over-flow-yard-report.component.html',
  styleUrls: ['./removal-list-of-over-flow-yard-report.component.css']
})
export class RemovalListOfOverFlowYardReportComponent implements OnInit {
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
    private removalListOfOverFlowYardService:RemovalListOfOverFlowYardService
  ) {
    this.fileType=localStorage.getItem("fileTypeForremovalListOfOverFlowYard");
    this.assignDate=localStorage.getItem("assignDateForremovalListOfOverFlowYard");
    this.modify=localStorage.getItem("modifyForremovalListOfOverFlowYard");
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
      this.removalListOfOverFlowYardService.getRemovalListOfOverFlowYard(this.assignDate,this.modify).subscribe(data=>
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
