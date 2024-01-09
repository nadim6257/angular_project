import { Component, OnInit } from '@angular/core';
import { DgContainersDischargeService } from '../service/dg-containers-discharge/dg-containers-discharge.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-dg-containers-discharge-summary-list-form',
  templateUrl: './dg-containers-discharge-summary-list-form.component.html',
  styleUrls: ['./dg-containers-discharge-summary-list-form.component.css']
})
export class DgContainersDischargeSummaryListFormComponent implements OnInit {
  rot_no: any;
  flag: any;
  vname: any;
  dgInfo: any[];
  isShown: boolean = false;
  isShow: boolean = false;
  constructor(
    private router: Router,
    private dgInfoService: DgContainersDischargeService,
  ) {

    this.dgInfo = [];
  }

  ngOnInit(): void {
  }

  onSubmit() {
    var rotation_no = this.rot_no;
    var tmp_rot_no = rotation_no.toString().replace("/", "_");
    console.log(tmp_rot_no);
    localStorage.setItem("tmp_rot_no", tmp_rot_no);


    this.dgInfoService.Discharg(tmp_rot_no).subscribe(data => {
      this.dgInfo = data;
      console.log(data);

      for (let vnamedata of data) {
        if (vnamedata.vessel_Name != null) {
          this.vname = vnamedata.vessel_Name;
          this.flag = vnamedata.flag;
        }
      }
    });

  }

}
