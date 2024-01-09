import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  //API(Route) variables
  laborModuleIp : string;
  laborModulePort : string;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.laborModuleIp = environment.laborModuleIp;
    this.laborModulePort = environment.laborModulePort;
  }

  addWorkLocation(data: any): Observable<any> {
    return this.httpClient.post(this.laborModuleIp + this.laborModulePort + `/WorkLocation/addWorkLocation`, data);
  }

  getWorkLocationById(id: string):Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/WorkLocation/getWorkLocationById/` + id);
  }

  editWorkLocation(data: any): Observable<any> {
    return this.httpClient.put(this.laborModuleIp + this.laborModulePort + `/WorkLocation/editLocation`, data);
  }

  deleteWorkLocation(id: number): Observable<any> {
    return this.httpClient.delete(this.laborModuleIp + this.laborModulePort + `/WorkLocation/deleteLocationById/` + id);
  }

  getWorkLocationList(): Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/WorkLocation/list`);
  }

  getWorkLocationListByGangId(id: any): Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/WorkLocation/getJobLocationListbyGangId/` + id);
  }

  addWorkCategory(data: any): Observable<any> {
    return this.httpClient.post(this.laborModuleIp + this.laborModulePort + `/WorkCategory/addWorkCategory`, data);
  }

  getWorkCategoryById(id: string):Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/WorkCategory/workCategoryById/` + id);
  }

  editWorkCategory(data: any): Observable<any> {
    return this.httpClient.put(this.laborModuleIp + this.laborModulePort + `/WorkCategory/editCategory`, data);
  }

  deleteWorkCategory(id: number): Observable<any> {
    return this.httpClient.delete(this.laborModuleIp + this.laborModulePort + `/WorkCategory/deleteCategory/` + id);
  }

  getWorkCategoryList(): Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/WorkCategory/list`);
  }

  getLocationList(): Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/Locations/list`);
  }


}
