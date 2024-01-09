import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  userModuleIP : string;
  userModulePort : string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.userModuleIP = environment.userModuleIP;
    this.userModulePort = environment.userModulePort;
  }

  addOrganization(organization: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.post(this.userModuleIP + this.userModulePort + `/organization/add`, organization, {headers:httpHeaders});
  }



  editOrganization(organization: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.put(this.userModuleIP + this.userModulePort + `/organization/edit`, organization, {headers:httpHeaders});
  }

  deleteOrganization(id: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.delete(this.userModuleIP + this.userModulePort + `/organization/delete/` + id, {headers:httpHeaders});
  }

  getOrganizationById(id: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.get(this.userModuleIP + this.userModulePort + `/organization/getOrganizationById/` + id, {headers:httpHeaders});
  }

  getOrganizationList(): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.get(this.userModuleIP + this.userModulePort + `/organization/list`, {headers:httpHeaders});
  }

  getOrganizationListByType(id: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.get(this.userModuleIP + this.userModulePort + `/organization/listByRole/` + id, {headers:httpHeaders});
  }

  getOrganizationTypeList(): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.get(this.userModuleIP + this.userModulePort + `/organization/organizationTypeList`, {headers:httpHeaders});
  }

  getSectionByRole(id: any): Observable<any>{
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.get(this.userModuleIP + this.userModulePort + `/section/listByRole/` + id, {headers:httpHeaders});
  }
}
