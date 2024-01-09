import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContainerEventHistoryService {

  //API(Route) variables
  igmMisIp : string;
  igmMisPort : string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.igmMisIp = environment.igmMisIp;
    this.igmMisPort = environment.igmMisPort;
   }
  getContainerEventList(contNumber:any){
    return this.httpClient.get(this.igmMisIp + this.igmMisPort + `/importReports/ContainerEventHistory/` + contNumber );
  }

}
