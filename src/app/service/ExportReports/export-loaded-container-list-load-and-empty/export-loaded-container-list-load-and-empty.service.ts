import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportLoadedContainerListLoadAndEmptyService {
  igmMisIp : string;
  igmMisPort : string;
  constructor(
    private httpClient:HttpClient
  ) {
    this.igmMisIp = environment.igmMisIp;
    this.igmMisPort = environment.igmMisPort;
   }


  getLoadedContainerVesselInfo(rotation:String):Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportLoadedContainerListLoadandEmptyVesselInfo/`+rotation);
  }
  getLoadedContainerList(rotation:String):Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportLoadedContainerListLoadandEmptyInfo/`+rotation);
  }
  getLoadedContainerOnboardList(rotation:String):Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportLoadedContainerListLoadandEmptyContainerOnboardInfo/`+rotation);
  }
  getLoadedContainerBalanceList(rotation:String):Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportLoadedContainerListLoadandEmptyLoadedContainerBalanceList/`+rotation);
  }
}
