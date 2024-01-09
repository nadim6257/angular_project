import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OffDockBlockedContainerListService } from '../service/ImportReports/off-dock-blocked-container-list/off-dock-blocked-container-list.service';

@Component({
  selector: 'app-off-dock-blocked-container-list',
  templateUrl: './off-dock-blocked-container-list.component.html',
  styleUrls: ['./off-dock-blocked-container-list.component.css']
})
export class OffDockBlockedContainerListComponent implements OnInit {
  offDockWiseBockedCotainerList:any;
  offDockName:String="";
  total:number=0;
  orgNameShowStatus:Boolean=false;
  totalShowStatus:Boolean=false;
  j:number=0;
  i:number=0;

  constructor(
    private toastr:ToastrService,
    private router:Router,
    private offDockBlockedContainerListService: OffDockBlockedContainerListService
  ) { }

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
    this.offDockBlockedContainerListService.getOffDockWiseBlockContainerList().subscribe(data=>{
      console.log(data);
      this.offDockWiseBockedCotainerList=data;

      for(let rs of this.offDockWiseBockedCotainerList ){
        this.i++;
      }
    });
  }
  setOffDock(offDock:String){

    if(offDock!=this.offDockName){
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
    this.offDockName=offDock;
  }
  setInitialValueForOrgWiseList(){
    
    this.j=0;
    
   }

}
