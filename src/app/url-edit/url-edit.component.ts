import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UrlService } from '../service/url/url.service';
import { ModuleService } from '../service/module/module.service';



@Component({
  selector: 'app-url-edit',
  templateUrl: './url-edit.component.html',
  styleUrls: ['./url-edit.component.css']
})
export class UrlEditComponent implements OnInit {

  disabledValue=false;
  disabledValue1=false;
  disabledValue2=false;
  disabledValue3=false;
  disabledValue4=false;

  modType:any;
  modTypes: any[];

  // modules: any;
  label_name: any;
  action_name:any;
  no_of_param:number;
  params_one:any;
  params_two:any;
  params_three:any;
  params_four:any;

  url: any;
  urlId: any;



  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private urlService:UrlService,
    private moduleService:ModuleService,
 )

   {
    this.modType='';
    this.modTypes = [];
    this.label_name = '';
    this.action_name = '';
    this.no_of_param = 0;
    this.params_one = '';
    this.params_two = '';
    this.params_three = '';
    this.params_four = '';



  }

  ngOnInit(): void {

    this.fetchModTypeList();
    this.urlId = this.activatedRoute.snapshot.params['id'];
    // alert(this.urlId);
    this.urlService.getUrlById(this.urlId).subscribe(data =>{


      this.modType = data.module.id;

      this.label_name = data.labelName;
      this.action_name = data.routerLink;
      this.no_of_param = data.noOfParam;
      this.params_one=data.paramOne;
      this.params_two=data.paramTwo;
      this.params_three=data.paramThree;
      this.params_four=data.paramFour;
      // alert(this.no_of_param);
      // alert(this.params_one)
      // alert(this.params_two)
      // alert(this.params_three)
      // alert(this.no_of_param)

      this.getParamEditValue(this.no_of_param);

    });



  }

  fetchModTypeList(): void{
    this.moduleService.getModuleList().subscribe(data => {
      // alert(data);
      this.modTypes = data;
      // alert(this.modTypes);
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error', {
        timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });
    });
  }



  updateUrl(){
    let module = {
      id:this.modType
    }

    let UrlUpdateData = {
      id: this.urlId,
      module:module,
      "labelName": this.label_name,
      "routerLink": this.action_name,
      "noOfParam": this.no_of_param,
      "paramOne": this.params_one,
      "paramTwo": this.params_two,
      "paramThree": this.params_three,
      "paramFour": this.params_four,
     lastUpdateById: localStorage.getItem('loginId')
    }
 
    this.urlService.editUrl(UrlUpdateData).subscribe(data => {


      this.toastr.success(data.message, 'Success',{
        timeOut:5000,
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


  getParamEditValue(val:any){
    if(this.no_of_param==1){
     this.params_two = '';
     this.params_three = '';
     this.params_four = '';
     this.disabledValue1=false;
     this.disabledValue2=true;
     this.disabledValue3=true;
     this.disabledValue4=true;

   }
   else if(this.no_of_param==2){
     this.params_three = '';
     this.params_four = '';

     this.disabledValue1=false;
     this.disabledValue2=false;
     this.disabledValue3=true;
     this.disabledValue4=true;
    }
   else if(this.no_of_param==3){
     this.params_four = '';
     this.disabledValue1=false;
     this.disabledValue2=false;
     this.disabledValue3=false;
     this.disabledValue4=true;
    }
  else if(this.no_of_param==4){
    //  this.params_one = '';
    //  this.params_two = '';
    //  this.params_three = '';
     this.disabledValue1=false;
     this.disabledValue2=false;
     this.disabledValue3=false;
     this.disabledValue4=false;
    }
    else if(this.no_of_param==0){
     this.params_one = '';
     this.params_two = '';
     this.params_three = '';
     this.params_four = '';
     this.disabledValue1=true;
     this.disabledValue2=true;
     this.disabledValue3=true;
     this.disabledValue4=true;
    }


  }

 onChangeParamInput(val:any){
    // alert(val);
    if(val==''){
      this.params_one;
      this.params_two;
      this.params_three;
      this.params_four;


    }
         else if (val==1){


          this.params_two = '';
          this.params_three = '';
          this.params_four = '';
          this.disabledValue1=false;
          this.disabledValue2=true;
          this.disabledValue3=true;
          this.disabledValue4=true;
         }

    else if(val==2){


   ;

      this.params_three = '';
      this.params_four = '';
      this.disabledValue1=false;
      this.disabledValue2=false;
      this.disabledValue3=true;
      this.disabledValue4=true;

    }


   else if(val==3){

      this.params_four = '';
      this.disabledValue1=false;
      this.disabledValue2=false;
      this.disabledValue3=false;
      this.disabledValue4=true;
     }
     else if(val==4){

      this.disabledValue1=false;
      this.disabledValue2=false;
      this.disabledValue3=false;
      this.disabledValue4=false;

    }
     else if(val==0){

      this.params_one = '';
      this.params_two = '';
      this.params_three = '';
      this.params_four = '';
      this.disabledValue1=true;
      this.disabledValue2=true;
      this.disabledValue3=true;
      this.disabledValue4=true;
    }

     else {
      alert("Invalid Number of Parameter");
      this.params_one = '';
      this.params_two = '';
      this.params_three = '';
      this.params_four = '';
      this.disabledValue1=true;
      this.disabledValue2=true;
      this.disabledValue3=true;
      this.disabledValue4=true;


    }



 }










}

