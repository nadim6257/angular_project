import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  //API(Route) variables
  loginModuleIp : string;
  loginModulePort : string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.loginModuleIp = environment.loginModuleIp;
    this.loginModulePort = environment.loginModulePort;
   }

  getSidebarByRole(userRoleId: any): Observable<any> {  
    // console.log("sidebar url");
    // console.log(`http://192.168.16.243:8086/sidebar/links/` + userRoleId   );

    var acctoken = "PCS "+localStorage.getItem('accessToken');
    
    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.get(this.loginModuleIp + this.loginModulePort + `/sidebar/links/` + userRoleId, {headers:httpHeaders});
  }
  
}


