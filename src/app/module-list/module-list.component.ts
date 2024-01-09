import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../service/module/module.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {
  Modules: any[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes:any=[3,6,9,12];
  filterTerm: any;
  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private toastr: ToastrService,
  ) {
    this.Modules=[];
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

    this.fetchModulesList();
  }

  fetchModulesList():void {


    this.moduleService.getModuleList().subscribe(data => {
      console.log(data.id);
      this.Modules = data;
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error', {
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });
    });
  }

  deleteModule(id: number) {

    if(confirm('Do you want to delete this Module?')){
      this.moduleService.deleteModule(id).subscribe(data => {

        this.toastr.warning(data.message, 'Success',{
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });
        // this.router.navigate(['organization/list']);
        // location.reload();
        this.fetchModulesList();
      }, err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error',{
          timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });
        this.fetchModulesList();
      });
    }

  }

    onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onSearchInput(){
    this.page = 1;
  }

}
