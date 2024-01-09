import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userModuleIP : string;
  userModulePort : string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.userModuleIP = environment.userModuleIP;
    this.userModulePort = environment.userModulePort;
   }

  addUser(user: any): Observable<any> {

    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });
    
    return this.httpClient.post(this.userModuleIP + this.userModulePort + `/user/add`, user, {headers:httpHeaders});
  }

  editUser(user: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.put(this.userModuleIP + this.userModulePort + `/user/edit`, user, {headers:httpHeaders});
  }

  deleteUser(id: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.delete(this.userModuleIP + this.userModulePort + `/user/delete/` + id, {headers:httpHeaders});
  }

  getUserById(id: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.get( this.userModuleIP + this.userModulePort + `/user/getUserById/` + id, {headers:httpHeaders});
  }

  getUserList(): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });
    
    return this.httpClient.get( this.userModuleIP + this.userModulePort + `/user/list`, {headers:httpHeaders});
  }
}
