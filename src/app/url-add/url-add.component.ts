import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NotifierModule } from 'angular-notifier';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UrlService } from '../service/url/url.service';
import { ModuleService } from '../service/module/module.service';
import { RoleService } from './../service/role/role.service';


@Component({
  selector: 'app-url-add',
  templateUrl: './url-add.component.html',
  styleUrls: ['./url-add.component.css']
})
export class UrlAddComponent implements OnInit {

 roles: any[];
 user_module_id: number;
 user_role_id: number;
 urlAddForm: FormGroup;
 modules: any;
 selected: any[];
 no_of_param:number;
 //params_five:number;
 label_name:any;
 params_one:any;
 params_two:any;
 params_three:any;
 params_four:any;
 modTypeList: any[];

//  notifier: NotifierService;
 action_name:any;
  form: any;
  reactiveForm: any;
  valueParam: any;



  // notifier: NotifierService;

    constructor(
    private router: Router,
    private toastr: ToastrService,
    private urlService:UrlService,
    private roleService:RoleService,
    private moduleService:ModuleService,
    private formBuilder:FormBuilder,
  )  {

       this.form='';
       this.label_name= '';
       this.no_of_param= 0;
       this.params_one='';
       this.params_two='';
       this.params_three='';
       this.params_four='';
       this.action_name='';

       this.user_role_id = 0;
       this.user_module_id=0;
       this.modTypeList = [];

       this.roles = [];
       this.selected=[];
       this.urlAddForm = this.formBuilder.group({});
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


    this.urlAddForm = this.formBuilder.group({
      user_module_id: ['', Validators.required],
      label_name: ['', Validators.required],
      action_name: ['', Validators.required],
      no_of_param: ['', Validators.required],
      params_one: [{value: '0', disabled: true}, Validators.required],
      params_two: [{value: '0', disabled: true}, Validators.required],
      // params_one: ['', Validators.required]
      params_three: [{value: '0', disabled: true}, Validators.required],
      params_four: [{value: '0', disabled: true}, Validators.required]

    });

    this.moduleService.getModuleList().subscribe(data => {
      this.modules = data;
    });

	  this.roleService.getRoleList().subscribe(data => {
      this.roles = data;
    }, err => {
      // console.log(err);
      // this.notifieService.notify('error', err.error.message);
    });




  }






 checkboxClick(e:any,id: number) {


  if (e.target.checked) {

    // console.log(id+'checked')
    this.selected.push(id);
  }

   else {
     // console.log(id+'unchecked');
    // this filter are removing which are unchecked
    this.selected=this.selected.filter(m=>m!=id)
    //  console.log(this.selected);
    }
  //  console.log("Array:"+this.selected);
  }






  onModuleTypeChange(id: String) {
   // console.log(id);
  }



  onSubmit() {
    let module = {
      id:this.user_module_id
    }
    let priviewUrl = {
          module: module,
          labelName:this.label_name,
          routerLink:this.action_name,
          noOfParam:this.no_of_param,
          paramOne:this.params_one,

          paramTwo:this.params_two,
          paramThree:this.params_three,
          paramFour:this.params_four,
          role_id_arr: this.selected,
       }
          console.log(priviewUrl);

    this.urlService.addUrl(priviewUrl).subscribe(data => {

      // console.log(data);

      this.toastr.success(data.message, 'Success',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });

      this.router.navigate(['url/list']);

    }, err => {
      console.log(err);
      console.log(err.error.message);
      // this.toastr.error(err.error.message, 'Error',{
      //   timeOut:5000,
      //   disableTimeOut: true,
      //   tapToDismiss: false,
      //   progressBar:true,
      //   progressAnimation:'increasing',
      //   positionClass:'toast-center-center',
      //   closeButton:true
      // });

    });
  }








  
  onChangeParamInput(val:any){

            if(val==1){
            // alert(val);
            // initially zero
            this.params_two = '';
            this.params_three = '';
            this.params_four = '';

            this.urlAddForm.controls['params_one'].enable();
            this.urlAddForm.controls['params_two'].disable();
            this.urlAddForm.controls['params_three'].disable();
            this.urlAddForm.controls['params_four'].disable();
          } else if(val==2){
            this.params_one = '';
            this.params_three = '';
            this.params_four = '';

            this.urlAddForm.controls['params_one'].enable();
            this.urlAddForm.controls['params_two'].enable();
            this.urlAddForm.controls['params_three'].disable();
            this.urlAddForm.controls['params_four'].disable();
          } else if(val==3){
            this.params_one = '';
            this.params_two = '';
            this.params_four = '';

            this.urlAddForm.controls['params_one'].enable();
            this.urlAddForm.controls['params_two'].enable();
            this.urlAddForm.controls['params_three'].enable();
            this.urlAddForm.controls['params_four'].disable();
          } else if(val==4){
            this.params_one = '';
            this.params_two = '';
            this.params_three = '';

            this.urlAddForm.controls['params_one'].enable();
            this.urlAddForm.controls['params_two'].enable();
            this.urlAddForm.controls['params_three'].enable();
            this.urlAddForm.controls['params_four'].enable();
          } else if(val==0){
            this.params_one = '';
            this.params_two = '';
            this.params_three = '';
            this.params_four = '';

            this.urlAddForm.controls['params_one'].disable();
            this.urlAddForm.controls['params_two'].disable();
            this.urlAddForm.controls['params_three'].disable();
            this.urlAddForm.controls['params_four'].disable();
          } else {
            alert("Invalid Number of Parameter");
            this.params_one = '';
            this.params_two = '';
            this.params_three = '';
            this.params_four = '';

            this.urlAddForm.controls['params_one'].disable();
            this.urlAddForm.controls['params_two'].disable();
            this.urlAddForm.controls['params_three'].disable();
            this.urlAddForm.controls['params_four'].disable();
          }





  }


}









