import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportVesselListWithStatusService {

  igmMisIp : string;
  igmMisPort : string;
  constructor(
    private httpClient:HttpClient
  ) {
    this.igmMisIp = environment.igmMisIp;
    this.igmMisPort = environment.igmMisPort;

   }


getVoyNo(rotation:String):Observable<any>
{
return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportReportVesselVoyNo/`+rotation)
}

getvvdgkey(rotation:String):Observable<any>{
  return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportVesselListVvd_Gkey/`+rotation);
}

getContainerVesselInfo(rotation:String):Observable<any>{
  return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportReportVessleInformation/`+rotation);
}




   VesselListWithStatusInfo():Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportVesselListWithStatus`);
  }

  
  VesselListWithStatusList(type:any):Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportVesselListWithStatusForRotation/`+type);
  }
  VesselListWithStatusForExportDetail(type:any):Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportVesselListWithStatusForExportUploadReport/`+type);
  }
  VesselListWithStatusForExportSummary(type:any):Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportVessleListWithStatusForMloWiseExportSummary/`+type);
  }
}