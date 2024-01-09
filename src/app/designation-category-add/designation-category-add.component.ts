import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DesignationService } from '../service/designation/designation.service';
import { LaborService } from '../service/labor/labor.service';

@Component({
  selector: 'app-designation-category-add',
  templateUrl: './designation-category-add.component.html',
  styleUrls: ['./designation-category-add.component.css']
})
export class DesignationCategoryAddComponent implements OnInit {

  designationCategoryAddForm: FormGroup;
  laborTypes: any;

  constructor(
    private router: Router,
    private designationService: DesignationService,
    private laborService: LaborService,
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.designationCategoryAddForm = this.formBuilder.group({});
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

    this.laborService.getLaborCategoryList().subscribe(data => {
      this.laborTypes = data;
    });

    this.designationCategoryAddForm  = this.formBuilder.group({
      name : ['', Validators.required],
      labor_type_id: ['', Validators.required]
    });

  }

  onLaborTypeChange(id: String) {
    console.log(id);
  }

  onSubmit() {
    this.designationService.addDesignationCategory(this.designationCategoryAddForm.value).subscribe(data => {
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

      this.router.navigate(['designation/category/list']);

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
