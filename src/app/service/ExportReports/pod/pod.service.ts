import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PodService {
  igmMisIp : string;
  igmMisPort : string;
  constructor(
    private httpClient:HttpClient,
  ) {
    this.igmMisIp = environment.igmMisIp;
    this.igmMisPort = environment.igmMisPort;

   }

  podlist(): Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/podlist`);
  }
  podForlistdata(rotation_no: string):Observable<any> {
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/PodListByPlaceCode/` + rotation_no);
  }

}
