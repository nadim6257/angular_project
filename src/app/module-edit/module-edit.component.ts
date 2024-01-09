import { Component, OnInit } from '@angular/core';
import { ModuleService} from '../service/module/module.service';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.css']
})
export class ModuleEditComponent implements OnInit {
  modId: any;
  modName:any;
  modTypeList: any[] | undefined;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private moduleService: ModuleService,
    private toastr: ToastrService
 ) {
    this.modName = '';
   }

  ngOnInit(): void {
    // this.fetchModTypeList();
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

    this.modId = this.activatedRoute.snapshot.params['id'];
    //   this.moduleService.getModuleById(this.modId).subscribe(data =>{
    //   this.modName = data.moduleName;
    //  });
   this.moduleService.getModuleById(this.modId).subscribe(data =>{
    console.log(data);

    this.modName = data.moduleName; //this.modName ,name data FROM ng model


   }, err =>{
    console.log(err);

   });
  }

  // fetchModTypeList(): void{
  //   this.moduleService.getModuleTypeList().subscribe(data => {
  //     this.modTypeList = data;
  //   }, err => {
  //     console.log(err);
  //     this.toastr.error(err.error.message, 'Error', {
  //       timeOut:5000,
  //       disableTimeOut: true,
  //       tapToDismiss: false,
  //       progressBar: true,
  //       progressAnimation: 'increasing',
  //       positionClass: 'toast-center-center',
  //       closeButton: true
  //     });
  //   });
  // }

  updateMod(){
    let ModUpdateData = {
      id: this.modId,
      moduleName: this.modName,
     lastUpdateById: localStorage.getItem('loginId')
    }
    console.log(ModUpdateData);

    this.moduleService.editModuleCategory(ModUpdateData).subscribe(data => {

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
