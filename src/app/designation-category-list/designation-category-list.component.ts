import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DesignationService } from '../service/designation/designation.service';

@Component({
  selector: 'app-designation-category-list',
  templateUrl: './designation-category-list.component.html',
  styleUrls: ['./designation-category-list.component.css']
})
export class DesignationCategoryListComponent implements OnInit {

  filterTerm: any;
  CATEGORIES: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];

  constructor(
    private router: Router,
    private workService: DesignationService,
    private toastr: ToastrService,
    private http: HttpClient
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

    this.fetchDesignationCategories();

  }

  fetchDesignationCategories():void {
    this.workService.getDesignationCategoryList().subscribe(
      (response) => {
        this.CATEGORIES = response;
        //console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
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

  deleteDesignationCategory(id: number) {
    if(confirm("Do you want to delete ?")) {      
      this.workService.deleteDesignationCategory(id).subscribe(data => {
        //console.log('Deleted', data);
  
        this.toastr.warning(data.message, 'Success',{
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });
  
        this.fetchDesignationCategories();
      }, err => {
  
        //console.log(err);
  
        this.toastr.error(err.error.message, 'Error',{
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });
  
        this.fetchDesignationCategories();
      });

    }
  }



}
