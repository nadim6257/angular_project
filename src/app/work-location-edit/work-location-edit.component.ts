import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkService } from '../service/work/work.service';

@Component({
  selector: 'app-work-location-edit',
  templateUrl: './work-location-edit.component.html',
  styleUrls: ['./work-location-edit.component.css']
})
export class WorkLocationEditComponent implements OnInit {

  name: string;
  workLocationId: string;
  workLocation: any;
  work_category_id: any;
  workCategories: any;
  locations: any;

  selectedItems = [] as any[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private workService: WorkService,
    private toastr: ToastrService,
    private http: HttpClient
  ) { 
    this.name = '';
    this.workLocationId = '';
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

    this.workLocationId = this.activatedRoute.snapshot.params['id'];

    this.workService.getWorkCategoryList().subscribe(data => {
      this.workCategories = data;
      console.log(this.workCategories);
    }, err => {
      console.log(err);
    });

    this.workService.getLocationList().subscribe(data => {
      this.locations = data;
      console.log(this.locations);
    }, err => {
      console.log(err);
    });

    this.selectedItems = [
      { work_category_id: 6, work_category_name: 'Unstuffing' }
    ];

    this.workService.getWorkLocationById(this.workLocationId).subscribe(data =>{
      console.log(data);
      this.workLocation = data;
      this.name = data.name;
      this.work_category_id = data.work_category_id;
    }, err =>{
      console.log(err);
    });


  }

  onWorkCategoryChange(id: string){
    console.log(id);
  }

  saveWorkLocation() {
    let workLocation = {
      id: this.workLocation.id,
      name: this.name,
      work_category_id: this.work_category_id
    }

    this.workService.editWorkLocation(workLocation).subscribe(data => {
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
