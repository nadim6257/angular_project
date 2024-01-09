import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkService } from '../service/work/work.service';

@Component({
  selector: 'app-work-category-edit',
  templateUrl: './work-category-edit.component.html',
  styleUrls: ['./work-category-edit.component.css']
})
export class WorkCategoryEditComponent implements OnInit {

  name: any;
  workCategoryId: any;
  workCategory: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private workService: WorkService,
    private toastr: ToastrService,
    private http: HttpClient
  ) { 
    this.name = '';
    this.workCategoryId = '';
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

    this.workCategoryId = this.activatedRoute.snapshot.params['id'];
    this.workService.getWorkCategoryById(this.workCategoryId).subscribe(data =>{      
      this.workCategory = data;
      this.name = data.name;
    });

  }

  saveWorkCategory() {

    let workCategory = {
      id: this.workCategory.id,
      name: this.name
    }
    this.workService.editWorkCategory(workCategory).subscribe(data => {
      console.log(data);
      this.toastr.success(data.message, 'Success',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      this.router.navigate(['work/category/list']);
    }, err => {      
      console.log(err);
      console.log(err.error.message);
      this.toastr.error(err.error.message, 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      this.router.navigate(['work/category/list']);
    });
  }

}
