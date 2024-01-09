import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  //API(Route) variables
  laborModuleIp : string;
  laborModulePort : string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.laborModuleIp = environment.laborModuleIp;
    this.laborModulePort = environment.laborModulePort;
   }

  addDesignationCategory(data: any): Observable<any> {
    return this.httpClient.post(this.laborModuleIp + this.laborModulePort + `/DesignationCategory/addDesignationCategory`, data);
  }

  getDesignationCategoryById(id: string):Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/DesignationCategory/desigCategoryById/` + id);
  }

  editDesignationCategory(data: any): Observable<any> {
    return this.httpClient.put(this.laborModuleIp + this.laborModulePort + `/DesignationCategory/editCategory`, data);
  }

  deleteDesignationCategory(id: number): Observable<any> {
    return this.httpClient.delete(this.laborModuleIp + this.laborModulePort + `/DesignationCategory/deleteDesigCategory/` + id);
  }

  getDesignationCategoryList(): Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/DesignationCategory/list`);
  }

  getDesignationCategoryListByLaborTypeId(id: string):Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/DesignationCategory/designationCategoryListByLaborTypeId/` + id);
  }

  getLaborTypeListByDesignationId(id: string):Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/DesignationCategory/laborTypeByDesignationId/` + id);
  }

}
