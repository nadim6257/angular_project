import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { DesignationService } from '../service/designation/designation.service';
import { GangService } from '../service/gang/gang.service';
import { LaborService } from '../service/labor/labor.service';

@Component({
  selector: 'app-labor-assign',
  templateUrl: './labor-assign.component.html',
  styleUrls: ['./labor-assign.component.css']
})
export class LaborAssignComponent implements OnInit {

  gangs: any;
  designationCategories: any;
  laborCategories: any;
  laborAssignForm: FormGroup;
  laborNames: string[];
  filteredLabors: Observable<string[]>;
  labor_name = new FormControl();
  laborCategoryId: string;
  designationCategoryId: string;
  laborId: string;

  availableLabors: any;
  gangId: string;

  laborExists: Boolean;
  gangMemberExists: number;

  existingLabors: any;

  user_role_id: number;
  org_id: number;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private laborService: LaborService,
    private gangService: GangService,
    private designationService: DesignationService
  ) {
    this.laborAssignForm = this.formBuilder.group({});
    this.laborNames = [];
    this.laborCategoryId = '';
    this.designationCategoryId = '';
    this.laborId = '';
    this.gangId = '';
    this.filteredLabors = this.labor_name.valueChanges.pipe(
      startWith(''),
      map(value => this.filterValues(value))
    );
    this.laborExists = true;
    this.gangMemberExists = 0;


    this.user_role_id = 0;
    this.org_id = 0;
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
        closeButton: true
      });
      return;
    }

    this.user_role_id = localStorage['userRoleId'];
    this.org_id = localStorage['org_id'];

    this.gangService.getGangListByOrgType(this.user_role_id, this.org_id).subscribe(data => {
      this.gangs = data;
      console.log(data);
    }, err => {
      console.log(err);
    });

    this.laborService.getLaborCategoryList().subscribe(data => {
      console.log(data);
      this.laborCategories = data;
    }, err => {
      console.log(err);
    });

    this.designationService.getDesignationCategoryList().subscribe(data => {
      console.log(data);
      this.designationCategories = data;
    }, err => {
      console.log(err);
    });



    this.laborAssignForm = this.formBuilder.group({
      gang_id: ['', Validators.required],
      labor_category_id: ['', Validators.required],
      designation_category_id: ['', Validators.required],
      labor_id: ['', Validators.required]
    });

  }

  onGangChange(id: string) {
    this.laborId = ''; //clears selected labor name
    console.log("gang id");
    console.log(id);
    this.gangId = id;

    if (this.gangId !== '') {
      this.gangService.getAssignedLaborByGangId(this.gangId).subscribe(data => {
        console.log("assigned labor to gang");
        console.log(data);
        console.log("----------------------");
        this.existingLabors = data;
        if (this.existingLabors.length > 0) {
          this.gangMemberExists = 2;
        } else {
          this.gangMemberExists = 1;
        }
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

      if (this.designationCategoryId !== '' && this.laborCategoryId !== '') {
        var org_id = localStorage['org_id'];
        this.laborService.getavailableLaborList(this.laborCategoryId, this.designationCategoryId, this.org_id, this.gangId).subscribe(data => {
          console.log(data);
          this.availableLabors = data;
          if (this.availableLabors.length > 0) {
            this.laborExists = true;
          } else {
            this.laborExists = false;
          }

          for (let i = 0; i < this.availableLabors.length; i++) {
            this.laborNames[i] = this.availableLabors[i].name + ' - ' + this.availableLabors[i].entry_pass_no;
          }
          console.log(this.laborNames);
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
  }

  onDesignationCategoryChange(id: string) {
    this.laborId = ''; //clears selected labor name
    console.log(id);
    this.designationCategoryId = id;
    var org_id = localStorage['org_id'];

    if (this.laborCategoryId !== '') {
      this.laborService.getavailableLaborList(this.laborCategoryId, this.designationCategoryId, this.org_id, this.gangId).subscribe(data => {
        console.log(data);
        this.availableLabors = data;
        if (this.availableLabors.length > 0) {
          this.laborExists = true;
        } else {
          this.laborExists = false;
        }

        for (let i = 0; i < this.availableLabors.length; i++) {
          this.laborNames[i] = this.availableLabors[i].name + ' - ' + this.availableLabors[i].entry_pass_no;
        }
        console.log(this.laborNames);
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

  onLaborCategoryChange(id: string) {
    this.laborId = ''; //clears selected labor name
    console.log("labor type");
    console.log(id);
    this.laborCategoryId = id;
    var org_id = localStorage['org_id'];

    if (this.designationCategoryId !== '') {
      this.laborService.getavailableLaborList(this.laborCategoryId, this.designationCategoryId, this.org_id, this.gangId).subscribe(data => {
        console.log("get labor list");
        console.log(data);
        this.availableLabors = data;
        for (let i = 0; i < this.availableLabors.length; i++) {
          this.laborNames[i] = this.availableLabors[i].name + ' - ' + this.availableLabors[i].entry_pass_no;
        }
        console.log(this.laborNames);
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

  filterValues(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.laborNames.filter(laborName => laborName.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit() {

    let data = this.laborAssignForm.value;

    // console.log('form data', data);
    // console.log('Gang ID : ', data.gang_id);
    // console.log('Labor ID : ', data.labor_id);

    //data.labor_id = labor_id;


    this.gangService.assignLabor(data).subscribe(data => {

      // console.log(data);
      this.labor_name.reset();
      this.gangMemberExists = 0;


      this.toastr.success(data.message, 'Success', {
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });
      // this.onLaborCategoryChange(this.laborCategoryId);
      this.gangService.getAssignedLaborByGangId(this.gangId).subscribe(data => {
        console.log(data);
        this.existingLabors = data;
        if (this.existingLabors.length > 0) {
          this.gangMemberExists = 2;
        } else {
          this.gangMemberExists = 1;
        }
        this.laborCategoryId = '';
        this.designationCategoryId = '';
        this.onGangChange(this.gangId);
        // this.router.navigate(['/gang/assignlabor',this.gangId]);
      }, err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error', {
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-center-center',
          closeButton: true
        });
      });


    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error', {
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });
    });

  }

  onRemove(labor_id: string) {
    if (confirm("Do you want to delete ?")) {
      console.log("Labor ID...");
      console.log(labor_id);

      console.log("Gand ID...");
      console.log(this.gangId);
      // return;

      this.laborService.removeLaborFromGang(this.gangId, labor_id).subscribe(data => {

        console.log("delete labor from gang response");
        console.log(data);
        this.toastr.success(data.message, 'Success', {
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-center-center',
          closeButton: true
        });
        this.onGangChange(this.gangId);
        //window.location.reload();   // refresh current page


      }, err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error', {
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-center-center',
          closeButton: true
        });
      });
    }

  }

}
