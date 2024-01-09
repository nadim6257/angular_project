import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {
  
  role_name: any;
  role_type:any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private roleService: RoleService
  ) {
    this.role_name = "";
  }

  ngOnInit(): void {
  }

  SelectedType(role_type:any){
    this.role_type=role_type;
  }

  saveRole(){
    console.log(this.role_type);  

    let RoleAddData = {
      roleName: this.role_name,
      roleType: this.role_type,
      createdBy: localStorage.getItem("loginId")
    }
    // console.log(RoleAddData);

    this.roleService.addRole(RoleAddData).subscribe(data => {

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
      this.router.navigate(['role/list']);
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error',{
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
