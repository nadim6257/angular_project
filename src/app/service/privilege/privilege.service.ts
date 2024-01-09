import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {
  userModuleIP:string;
  userModulePort:string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.userModuleIP = environment.userModuleIP;
    this.userModulePort = environment.userModulePort;
   }

  //  addPrivilege(privilege: any): Observable<any> {
  //   var acctoken = "PCS "+localStorage.getItem('accessToken');

  //   const httpHeaders = new HttpHeaders({
  //     'content-type':'application/json',
  //     'Authorization':acctoken
  //   });

  //   return this.httpClient.post(this.userModuleIP + this.userModulePort + `/urlAssign/add`, privilege,{headers:httpHeaders});
  // }

  addPrivilege(privilege: any): Observable<any> {
    return this.httpClient.post(`http://192.168.16.243:8081/urlAssign/add`, privilege);
  }
}
