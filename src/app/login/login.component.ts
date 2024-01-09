import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth/auth.service';

// const shajs = require('sha.js'); // error
import * as shajs from 'sha.js'; 
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginId: any;
  password: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private authService: AuthService
  ) { 
    this.loginForm = this.formBuilder.group({});
    this.loginId = "";
    this.password = "";
  }

  currTime : any;

  ngOnInit(): void {

    if(localStorage.getItem("accessToken")){      
      this.router.navigate(['/dashboard']);
    }
    else{
      this.loginForm = this.formBuilder.group({
        loginId: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  }

  onSubmit() {

    var sha1Val = shajs('sha1').update(this.password).digest('hex');
    this.password = sha1Val;
    const md5 = new Md5();
    var md5Val = md5.appendStr(sha1Val).end();

    let addLoginData = {        
      loginId : this.loginId,
      password: md5Val
    }
      
    this.authService.login(addLoginData).subscribe(data => {

      if(data.status==1)    // login success
      {
        this.currTime = new Date().getTime();
    
        console.log("Role Id when logged in : "+data.userRoleId);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userRoleId", data.userRoleId);
        localStorage.setItem("userRoleName", data.userRoleName);
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("loginId", data.loginId);
        localStorage.setItem("status", data.status);
        localStorage.setItem("org_id", data.org_id);
        localStorage.setItem("lic_no", data.lic_no);

        localStorage.setItem("dr",data.duration);
        localStorage.setItem("ep",this.currTime);
        
        this.router.navigate(['/dashboard']);
      }
      else{
        this.router.navigate(['/login']);
        this.toastr.error('Invalid Username or Password', 'Error',{
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });
      }        
    },err => {
      console.log("Err");
      console.log(err);

      this.toastr.error('Failed', 'Error',{
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      this.router.navigate(['/login']);
      });
  }

}
