import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../service/role/role.service';
import { ModuleService } from '../service/module/module.service';
import { UrlService } from '../service/url/url.service';
import { PrivilegeService } from '../service/privilege/privilege.service';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-privilege-add',
  templateUrl: './privilege-add.component.html',
  styleUrls: ['./privilege-add.component.css'],
})
export class PrivilegeAddComponent implements OnInit {
  selectedUrls: any[];

  checked: any[];
  user_role_id: any;
  roleTypes: any[];
  modType: any;
  moduleTypes: any[];
  user_module_id: any;
  status: number | undefined;
  // modules: any;
  roles: any;
  urls: any;
  // urls: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private roleService: RoleService,
    private moduleService: ModuleService,
    private urlService: UrlService,
    private privilegeService: PrivilegeService
  ) {
    this.user_module_id = 0;
    this.user_role_id = '';
    this.roleTypes = [];
    this.moduleTypes = [];
    this.selectedUrls = [];
    this.checked = [];
  }

  ngOnInit(): void {
    if (localStorage['status'] != 1) {
      // console.log("### User logged out already ### ");
      this.router.navigate(['/pcs']);
      this.toastr.error('Login and try again.', 'Error', {
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true,
      });
      return;
    }
    // this.user_role_id = localStorage['role.id'];
    // this.user_module_id = localStorage['module.id'];

    this.roleService.getRoleList().subscribe(
      (data) => {
        // console.log(data);

        this.roleTypes = data;
      },
      (err) => {
        console.log(err);
      }
    );

    this.moduleService.getModuleList().subscribe(
      (data) => {
        this.moduleTypes = data;
      },
      (err) => {
        // console.log(err);
        this.toastr.error(err.error.message, 'Error', {
          timeOut: 5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-center-center',
          closeButton: true,
        });
      }
    );
  }

  onRoleChange(id: number) {
    // console.log("######## onRoleChange ########");
    // console.log("User Role : "+id);
    // alert(id);
  }

  onModuleChange(id: number) {
    // console.log("Module Id : "+this.user_module_id);
    this.user_module_id = id;
    // alert(this.user_module_id);

    // console.log('Module-id', this.user_module_id);
    if (this.user_role_id == 0) {
      alert('User Role have to select');
    } else {
      this.urlService
        .getUrlListByModuleId(this.user_module_id, this.user_role_id)
        .subscribe(
          (data) => {
            // console.log("----- URL List according to role and module -----");

            this.urls = data;
            // alert(this.urls);
            // console.log(this.urls);

            // console.log(data)

            var i = 0;
            var len = data.length;

            // console.log('Checked array');
            this.checked = [];
            // console.log(this.checked);

            for (i; i < len; i++) {
              var statusVal = data[i].status;
              // console.log(statusVal);
              var urlId = data[i].id;
              // console.log('url-id', urlId);
              // console.log("Status "+statusVal);
              if (statusVal == 1) {
                this.checked.push(urlId);
              } else {
                // this.checked.splice(urlId, 1);
                // this.checked.filter(m=>m!=id)
              }
            }
            // console.log('-- checked after loop --');
            // console.log(this.checked);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  selectedUrl(e: any, id: number) {
    if (e.target.checked) {
      // console.log(id + 'checked');
      this.checked.push(id);
    } else {
      // console.log(id + 'unchecked');
      this.checked = this.checked.filter((m) => m != id);
      // console.log(this.checked);
    }
    // console.log('Array:' + this.checked);
  }

  onSubmit() {
    // console.log('######## onSubmit ########');
    let privilegeData = {
      user_role_id: this.user_role_id,
      url_module_id: this.user_module_id,
      user_url_id: this.checked,
      // lastUpdateById: localStorage.getItem('loginId'),
      // enteredBy: localStorage.getItem('loginId')
    };

    // console.log("----- privilegeData -----");
    // console.log(privilegeData);

    this.privilegeService.addPrivilege(privilegeData).subscribe(
      (data) => {
        // console.log(data);
        this.toastr.success(data.message, 'Success', {
          timeOut: 5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-center-center',
          closeButton: true,
        });
        this.resetForm();
        // this.router.navigate(['role/list']);
      },
      (err) => {
        // console.log(err);
        this.toastr.error(err.error.message, err.error.message, {
          timeOut: 5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-center-center',
          closeButton: true,
        });
      }
    );
  }

  resetForm() {
    this.user_role_id = '';
    this.user_module_id = '';
    this.urls = null;
  }
}
