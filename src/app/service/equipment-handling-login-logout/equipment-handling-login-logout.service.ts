import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EquipmentHandlingLoginLogoutService {

  //API(Route) variables
  igmMisIp : string;
  igmMisPort : string;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.igmMisIp = environment.igmMisIp;
    this.igmMisPort = environment.igmMisPort;
  }
  getSearchValue(searchCriteria:any){
    return this.httpClient.get(this.igmMisIp + this.igmMisPort + `/importReports/EquipmentLoginLogout/` + searchCriteria );
  }
  getEquipmentLoginLogoutList(fromDate:any,shift:any,searchCriteria:any,searchvalue:any){
    return this.httpClient.get(this.igmMisIp + this.igmMisPort + `/importReports/EquipmentLoginLogout/` +fromDate+"/"+shift+"/"+searchCriteria+"/"+searchvalue); 
  }
}
