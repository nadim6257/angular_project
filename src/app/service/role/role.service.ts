import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  userModuleIP : string;
  userModulePort : string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.userModuleIP = environment.userModuleIP;
    this.userModulePort = environment.userModulePort;
   }

  addRole(role: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.post(this.userModuleIP + this.userModulePort + `/role/add`, role, {headers:httpHeaders});
  }

  editRole(role: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.put(this.userModuleIP + this.userModulePort + `/role/edit`, role, {headers:httpHeaders});
  }

  deleteRole(id: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.delete(this.userModuleIP + this.userModulePort + `/role/delete/` + id, {headers:httpHeaders});
  }

  getRoleById(id: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.get(this.userModuleIP + this.userModulePort + `/role/getRoleById/` + id, {headers:httpHeaders});
  }

  getRoleList(): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.get(this.userModuleIP + this.userModulePort + `/role/list`, {headers:httpHeaders});
  }
}
