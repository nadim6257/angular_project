import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //API(Route) variables
  loginModuleIp : string;
  loginModulePort : string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private zone: NgZone
  ) { 
    this.loginModuleIp = environment.loginModuleIp;
    this.loginModulePort = environment.loginModulePort;
  }

  login(user: any): Observable<any> {
     // return this.httpClient.post(`http://182.163.112.102:8001/api/user/login/`, user);
     return this.httpClient.post(this.loginModuleIp + this.loginModulePort + `/token/request`, user);
     // return this.httpClient.post(`http://192.168.16.50:8086/token/request`, user);   
  }
  // logout(user: any): Observable<any>{
  //   //console.log("logout id : "+user);

  //   var acctoken = "PCS "+localStorage.getItem('accessToken');
    
  //   const httpHeaders = new HttpHeaders({
  //     'content-type':'application/json',
  //     'Authorization':acctoken
  //   });

  //   return this.httpClient.delete(`http://192.168.16.243:8086/token/logout/` + user, {headers:httpHeaders});
  // }
}
