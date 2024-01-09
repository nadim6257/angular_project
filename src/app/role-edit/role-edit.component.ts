import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  userRoleId: any;
  role_name: any;
  role_type:any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private roleService: RoleService
  ) {
    // get selected id from route
    // fetch data for that id
  }

  ngOnInit(): void {
    this.userRoleId = this.activatedRoute.snapshot.params['id'];
    this.roleService.getRoleById(this.userRoleId).subscribe(data =>{
      console.log(data);

      this.role_name = data.roleName;
      this.role_type = data.roleType;
    });
  }

  SelectedType(role_type:any){
    this.role_type=role_type;
  }

  updateRole(){
    let RoleUpdateData = {
      id: this.userRoleId,
      roleName: this.role_name,
      roleType: this.role_type,
      updatedBy: localStorage.getItem("loginId")
    }

    this.roleService.editRole(RoleUpdateData).subscribe(data => {

      console.log("update data");
      console.log(data);

      this.toastr.success(data.message, data.message,{
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
      console.log("Role edit error");
      console.log(err);
      this.toastr.error(err.error.message,err.error.message,{
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
