import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeederDischargeSummaryListService {

  constructor(
    private httpClient: HttpClient
  ) { }
  getVesselInfoForFeederDischargeSummaryList(rotation:any){
   return this.httpClient.get('http://192.168.16.243:8093/importReports/vesselInfoForFeederDischargeSummaryList/' + rotation+"/");
  }
  getFeederDischargeSummaryList(rotation:any,type:any){
    return this.httpClient.get('http://192.168.16.243:8093/importReports/feederDischargeSummaryList/' + rotation+"/"+type+"/");
  }
}
