import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  userModuleIP:string;
  userModulePort:string;


  constructor(
    private httpClient: HttpClient
  ) {
    this.userModuleIP = environment.userModuleIP;
    this.userModulePort = environment.userModulePort;
   }
  //  new

  addUrl(url: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.post(this.userModuleIP + this.userModulePort + `/url/add`, url, {headers:httpHeaders});
  }
          // for url edit start service
  // editUrl(url: any): Observable<any> {
  //   var acctoken = "PCS "+localStorage.getItem('accessToken');

  //   const httpHeaders = new HttpHeaders({
  //     'content-type':'application/json',
  //     'Authorization':acctoken
  //   });


  //   return this.httpClient.put(`http://192.168.16.50:8081/url/edit`, url, {headers:httpHeaders});
  // }

  editUrl(data: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.put(this.userModuleIP + this.userModulePort + `/url/edit`, data, {headers:httpHeaders});
  }
  // getUrlById(id: any): Observable<any> {

  //   var acctoken = "PCS "+localStorage.getItem('accessToken');

  //   const httpHeaders = new HttpHeaders({
  //     'content-type':'application/json',
  //     'Authorization':acctoken
  //   });

  //   return this.httpClient.get(`http://192.168.16.243:8081/url/getURLById/` + id, {headers:httpHeaders});
  // }

  getUrlById(id: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.get(`http://192.168.16.50:8081/url/urlById/` + id, {headers:httpHeaders});
  }

     // for url edit  service end here

  deleteUrl(id: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.delete(this.userModuleIP + this.userModulePort + `/url/delete/` + id, {headers:httpHeaders});
  }
  getUrlList(): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

    const httpHeaders = new HttpHeaders({
      'content-type':'application/json',
      'Authorization':acctoken
    });

    return this.httpClient.get(this.userModuleIP + this.userModulePort + `/url/list`, {headers:httpHeaders});
  }

  // getUrlTypeList(): Observable<any> {
  //   var acctoken = "PCS "+localStorage.getItem('accessToken');

  //   const httpHeaders = new HttpHeaders({
  //     'content-type':'application/json',
  //     'Authorization':acctoken
  //   });

  //   return this.httpClient.get(this.userModuleIP + this.userModulePort + `/url/list`, {headers:httpHeaders});
  // }


  // for privillage-add
  // getUrlListByModuleId(user_module_id: any,user_role_id: any): Observable<any> {
  //   return this.httpClient.get(`http://192.168.16.243:8081/url/urlByModuleAndRole/` + user_module_id + '/' +  user_role_id);
  // }

  getUrlListByModuleId(user_module_id: any,user_role_id: any): Observable<any> {
    var acctoken = "PCS "+localStorage.getItem('accessToken');

      const httpHeaders = new HttpHeaders({
        'content-type':'application/json',
        'Authorization':acctoken
      });
    return this.httpClient.get(`http://192.168.16.243:8081/url/urlByModuleAndRole/` + user_module_id + '/' +  user_role_id,{headers:httpHeaders});
  }

  // getUrlListByModuleId(user_module_id: any,user_role_id: any): Observable<any> {
  //   var acctoken = "PCS "+localStorage.getItem('accessToken');

  //   const httpHeaders = new HttpHeaders({
  //     'content-type':'application/json',
  //     'Authorization':acctoken
  //   });

  //   return this.httpClient.get(this.userModuleIP + this.userModulePort + `/url/urlByModuleAndRole/` + user_module_id + '/' +  user_role_id, {headers:httpHeaders});
  // }
  // privilege end


}
