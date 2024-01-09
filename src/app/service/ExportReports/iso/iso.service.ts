import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IsoService {

  igmMisIp : string;
  igmMisPort : string;
  constructor(
    private httpClient:HttpClient
  ) { 
    this.igmMisIp = environment.igmMisIp;
    this.igmMisPort = environment.igmMisPort;
  }

  IsoList():Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/IsoList`);
  }

  
  IsoListData(type:any):Observable<any>{
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/IsoCodeData/`+type);
  }
}
