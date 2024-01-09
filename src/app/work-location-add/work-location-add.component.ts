import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkService } from '../service/work/work.service';

@Component({
  selector: 'app-work-location-add',
  templateUrl: './work-location-add.component.html',
  styleUrls: ['./work-location-add.component.css']
})
export class WorkLocationAddComponent implements OnInit {

  workLocationAddForm: FormGroup;
  workCategories: any;
  locations: any;

  selectListData = [] as any[];
  selectedData: any;

  constructor(
    private router: Router, 
    private workService: WorkService,
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { 
    this.workLocationAddForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    if(localStorage['status']!=1)
    {
      // console.log("### User logged out already ### ");
      this.router.navigate(['/pcs']);
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

    this.workService.getWorkCategoryList().subscribe(data => {
      this.workCategories = data;
    });

    this.workService.getLocationList().subscribe(data => {
      this.locations = data;
    });

    this.workLocationAddForm  = this.formBuilder.group({
      name : ['', Validators.required],
      work_category_id: ['', Validators.required]
    });

    
  }

  onWorkCategoryChange(id: String) {
    console.log(id);
  }

  onSubmit() {
    this.workService.addWorkLocation(this.workLocationAddForm.value).subscribe(data => {
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

      this.router.navigate(['work/location/list']);

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
