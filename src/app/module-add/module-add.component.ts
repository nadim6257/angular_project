import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ModuleService } from '../service/module/module.service';
@Component({
  selector: 'app-module-add',
  templateUrl: './module-add.component.html',
  styleUrls: ['./module-add.component.css']
})
export class ModuleAddComponent implements OnInit {
  modName:any;
  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private toastr: ToastrService,
  ) {
    this.modName='';
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
  }

  saveMod(){
    let modAddData = {

      moduleName: this.modName,

      lastUpdateById: localStorage.getItem('loginId'),
      enteredBy: localStorage.getItem('loginId')
    }
//  console.log(OrgAddData);
    this.moduleService.addModuleCategory(modAddData).subscribe(data => {

      // console.log(data);

      this.toastr.success(data.message, 'Success',{
        timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      this.router.navigate(['module/list']);
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, err.error.message,{
        timeOut:5000,
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
