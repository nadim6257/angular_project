import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BerthService {

  laborModuleIp : string;
  laborModulePort : string;
  frontApiIp : string;
  frontApiPort : string;

  berths: any[];

  constructor(
    private httpClient: HttpClient
  ) { 
    this.berths = [];

    this.laborModuleIp = environment.laborModuleIp;
    this.laborModulePort = environment.laborModulePort;
    this.frontApiIp = environment.frontApiIp;
    this.frontApiPort = environment.frontApiPort;
  }

  getBerthingReport(data: any): Observable<any> {
    return this.httpClient.post(this.frontApiIp + this.frontApiPort + `/frontapi/berthingReport`, data);
  }

  getBerthOperatorList(): Observable<any>{
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/gang/berthOperatorList`);
  }

  berthOperatorListByOrgType(user_role_id: any,org_id: any): Observable<any>{
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/gang/berthOperatorListByOrgType/`+ user_role_id + '/' + org_id);
  }

}
