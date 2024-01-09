import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  prevTime : any;
  nextTime : any;
  duration : any;

   ngOnInit(): void {
    this.nextTime = new Date().getTime();
    this.prevTime = localStorage.getItem("ep");
    this.duration = localStorage.getItem("dr");

    if((this.nextTime - this.prevTime) > this.duration)
    {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
