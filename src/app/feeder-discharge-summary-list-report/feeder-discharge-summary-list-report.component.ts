import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FeederDischargeSummaryListService } from '../service/ImportReports/feeder-discharge-summary-list/feeder-discharge-summary-list.service';

@Component({
  selector: 'app-feeder-discharge-summary-list-report',
  templateUrl: './feeder-discharge-summary-list-report.component.html',
  styleUrls: ['./feeder-discharge-summary-list-report.component.css']
})
export class FeederDischargeSummaryListReportComponent implements OnInit {
  
  rotation:any;
  resultList:any;
  vesselList:any;
  vesselName:any;
  impRotation:any;
  header:any;
  searchText:any;
  length:number=0;
  show:Boolean=true;
  type:any;
  showFooter:Boolean=true;
  serialNumberShow:Boolean=true;
  laden20Total:number=0;
  laden40Total:number=0;
  ladenTues:number=0;
  mty20:number=0;
  mty40:number=0;
  emptyTeus:number=0
  ref20:number=0;
  ref40:number=0;
  refTeus:number=0;
  dmg20:number=0;
  dmg40:number=0;
  dmgTeus:number=0;
  tran20:number=0;
  tran40:number=0;
  tranTeus:number=0;
  ld45:number=0;
  mty45:number=0;
  grant20:number=0;
  grant40:number=0;
  grantTues:number=0;
  grant:number=0;
  title:boolean=false;
  titleOffDock:boolean=false;

  constructor(
    private toastr:ToastrService,
    private router:Router,
    private feederDischargeSummaryListService:FeederDischargeSummaryListService
  ) {
    this.type=localStorage.getItem("feederDischargeSummaryListType");
    this.rotation=localStorage.getItem("feederDischargeSummaryListRotaion");
  
   }

  ngOnInit(): void {
    if(localStorage['status']!=1)
    {
      
      this.router.navigate(['/login']);
      this.toastr.error('Login and try again.', 'Error',{
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-center-center',
        closeButton:true
      });
      return;
    }
    else{
      if(this.type=="selected"){
        this.titleOffDock=true;
      }
      else{
        this.title=true;
       
      }
      this.feederDischargeSummaryListService.getVesselInfoForFeederDischargeSummaryList(this.rotation).subscribe(data=>{
        this.vesselList=data;
        for(let vesselResult of this.vesselList){
          this.vesselName=vesselResult.vessel_Name;
          this.impRotation=vesselResult.import_Rotation_No;
         
        }
        
      });
      this.feederDischargeSummaryListService.getFeederDischargeSummaryList(this.rotation,this.type).subscribe(data=>{
         this.resultList=data;
         for(let result of this.resultList){
           this.laden20Total=this.laden20Total+result.totalRes;
           this.laden40Total=this.laden40Total+result.totalRes1;
           this.ladenTues=this.ladenTues+result.rowLadenTeus;
           this.mty20=this.mty20+result.row1Mty20;
           this.mty40=this.mty40+result.row1Mty40;
           this.emptyTeus=this.emptyTeus+result.rowEmptyTeus;
           this.ref20=this.ref20+result.row1Ref20;
           this.ref40=this.ref40+result.row1Ref40;
           this.refTeus=this.refTeus+result.rowRefferTeus;
           this.dmg20=this.dmg20+result.row1Dmg20;
           this.dmg40=this.dmg40+result.row1Dmg40;
           this.dmgTeus=this.dmgTeus+result.rowImdgTeus;
           this.tran20=this.tran20+result.row1tran20;
           this.tran40=this.tran40+result.row1tran40;
           this.tranTeus=this.tranTeus+result.rowTransTeus1;
           this.ld45=this.ld45+result.row145Id;
           this.mty45=this.mty45+result.row145Mty;
           this.grant20=this.grant20+result.grant20;
           this.grant40=this.grant40+result.grant40;
           this.grantTues=this.grantTues+result.rowTues;
           this.grant=this.grant+result.grant;

           
          }
      
       }); 
      
    }

  }

}
