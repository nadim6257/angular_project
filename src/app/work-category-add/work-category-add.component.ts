import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkService } from '../service/work/work.service';

@Component({
  selector: 'app-work-category-add',
  templateUrl: './work-category-add.component.html',
  styleUrls: ['./work-category-add.component.css']
})
export class WorkCategoryAddComponent implements OnInit {

  workCategoryAddForm: FormGroup;

  constructor(
    private router: Router,   
    private formBuilder: FormBuilder, 
    private workService: WorkService,
    private toastr: ToastrService,
    private http: HttpClient
  ) { 
    this.workCategoryAddForm = this.formBuilder.group({});
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

    this.workCategoryAddForm  = this.formBuilder.group({
      name : ['', Validators.required]
    });

  }

  onSubmit() {
    this.workService.addWorkCategory(this.workCategoryAddForm.value).subscribe(data => {
      
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
      
    });
  }

}
