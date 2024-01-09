import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DesignationService } from '../service/designation/designation.service';
import { LaborService } from '../service/labor/labor.service';

@Component({
  selector: 'app-designation-category-edit',
  templateUrl: './designation-category-edit.component.html',
  styleUrls: ['./designation-category-edit.component.css']
})
export class DesignationCategoryEditComponent implements OnInit {

  name: string;
  designationCategoryId: string;
  designationCategory: any;
  labor_type_id: any;
  laborTypes: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private designationService: DesignationService,
    private laborService: LaborService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.name = '';
    this.designationCategoryId = '';
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

    this.designationCategoryId = this.activatedRoute.snapshot.params['id'];

    this.laborService.getLaborCategoryList().subscribe(data => {
      this.laborTypes = data;
      console.log(this.laborTypes);
    }, err => {
      console.log(err);
    });

    this.designationService.getDesignationCategoryById(this.designationCategoryId).subscribe(data =>{
      console.log(data);
      this.designationCategory = data;
      this.name = data.name;
      this.labor_type_id = data.labor_type_id;
    }, err =>{
      console.log(err);
    });

  }

  onLaborTypeChange(id: string){
    console.log(id);
  }

  saveDesignationCategory() {
    let designationCategory = {
      id: this.designationCategory.id,
      name: this.name,
      labor_type_id: this.labor_type_id
    }

    this.designationService.editDesignationCategory(designationCategory).subscribe(data => {
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
