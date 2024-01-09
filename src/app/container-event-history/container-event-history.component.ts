import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContainerEventHistoryService} from '../service/cotainer-event-history/container-event-history.service';



@Component({
  selector: 'app-container-event-history',
  templateUrl: './container-event-history.component.html',
  styleUrls: ['./container-event-history.component.css']
})
export class ContainerEventHistoryComponent implements OnInit {
  containerEventHistoryList:any;
  contNumber:String;
  searchText:any;
  show:boolean=false;
  filterTerm: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  constructor( private router: Router,
    //private notifierService: NotifierService,
    private toastr:ToastrService,
    private cotainerEventService:ContainerEventHistoryService)
     { 
     this.show=false;
     this.contNumber="";
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
  onSearchInput(){
    this.page = 1;
  }
  onTableDataChange(event: any) {
    this.page = event;
   
  }

  getContainerEventHistoryList(contNumber:String){
    if(contNumber!="" || contNumber==null){
    let response=this.cotainerEventService.getContainerEventList(contNumber);
    response.subscribe(data=>{console.log(data);this.containerEventHistoryList=data;})
    this.show=true;
  }
  else{
    this.toastr.error('Import Rotation is Empty', 'Error',{
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
