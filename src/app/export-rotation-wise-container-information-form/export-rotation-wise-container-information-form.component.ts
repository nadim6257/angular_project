import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExportRotationWiseContainerInformationService } from '../service/ExportReports/ExportRotationWiseContainerInformationService/export-rotation-wise-container-information-service.service';

@Component({
  selector: 'app-export-rotation-wise-container-information-form',
  templateUrl: './export-rotation-wise-container-information-form.component.html',
  styleUrls: ['./export-rotation-wise-container-information-form.component.css']
})
export class ExportRotationWiseContainerInformationFormComponent implements OnInit {
  rotation_no:any;
  constructor(
    private toastr:ToastrService,
    private router: Router,
    private exportRotationWiseContainerInformation:ExportRotationWiseContainerInformationService
  ) { }

  ngOnInit(): void {
  }
  onSubmit(){

    console.log("helow world");
    var rotation_no = this.rotation_no;
    console.log(rotation_no);
    localStorage.setItem("export_RotationWiseContainerInformation", rotation_no);
    var tmp_rot_no = rotation_no.toString().replace("/", "_");
    console.log(tmp_rot_no);
    this.router.navigate([]).then(data => window.open('exportReports/export-rotation-wise-container-information/list', '_blank'));
  
  }
}