import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  userModuleIP:string;
  userModulePort:string;


  constructor(
    private httpClient: HttpClient
  ) {
    this.userModuleIP = environment.userModuleIP;
    this.userModulePort = environment.userModulePort;
   }

   addModuleCategory(data: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.post(this.userModuleIP + this.userModulePort + `/module/add`, data, {headers:httpHeaders});
  }
  getModuleById(id: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.get(this.userModuleIP + this.userModulePort + `/module/moduleById/` + id, {headers:httpHeaders});
  }
  editModuleCategory(data: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.put(this.userModuleIP + this.userModulePort + `/module/edit`, data, {headers:httpHeaders});
  }
  deleteModule(id: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.delete(this.userModuleIP + this.userModulePort + `/module/delete/` + id, {headers:httpHeaders});
  }
  getModuleList(): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.get(this.userModuleIP + this.userModulePort + `/module/list`, {headers:httpHeaders});
  }


  getModuleTypeList(): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.get(this.userModuleIP + this.userModulePort + `/module/list`, {headers:httpHeaders});
  }



}
