import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportDestinationWiseMloLoadedContainerServiceService {
  igmMisIp : string;
  igmMisPort : string;
  constructor(
    private httpClient:HttpClient
  ) {

    this.igmMisIp = environment.igmMisIp;
    this.igmMisPort = environment.igmMisPort;

   }

  getContainerVesselInfo(rotation:String):Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportDestinationWiseMloLoadedContainerVesselInfo/`+rotation);
  }
  getContainerList(rotation:String):Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportDestinationWiseMloLoadedContainerInfo/`+rotation);
  }
}
