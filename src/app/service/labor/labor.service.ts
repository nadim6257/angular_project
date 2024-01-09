import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaborService {

  //API(Route) variables
  laborModuleIp : string;
  laborModulePort : string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.laborModuleIp = environment.laborModuleIp;
    this.laborModulePort = environment.laborModulePort;
  }

  addLabor(data: any): Observable<any> {
    return this.httpClient.post(this.laborModuleIp + this.laborModulePort + `/labor/add`, data);
  }

  getLaborById(id: string):Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/labor/laborById/` + id);
  }

  editLabor(data: any): Observable<any> {
    return this.httpClient.put(this.laborModuleIp + this.laborModulePort + `/labor/editLabor`, data);
  }

  deleteLabor(id: number): Observable<any> {
    return this.httpClient.delete(this.laborModuleIp + this.laborModulePort + `/labor/deleteLabor/` + id);
  }

  getLaborList(id: number): Observable<any> {
    if(localStorage['userRoleId']==3)
    {
      return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/labor/listByOrg/` + id);
    }
    else
    {
      return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/labor/list`);
    }
  }

  getLaborListByTypeAndDesignationId(laborTypeId: any, designationCategoryId: any): Observable<any> {
    console.log(this.laborModuleIp + this.laborModulePort + "/labor/availableLaborListByTypeAndDesignation/" + laborTypeId + "/" + designationCategoryId);
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/labor/availableLaborListByTypeAndDesignation/` + laborTypeId + '/' + designationCategoryId);
  }

  getavailableLaborList(laborTypeId: any, designationCategoryId: any, berthOperatorId: any, gangId: any): Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/labor/availableLaborList/` + laborTypeId + '/' + designationCategoryId + '/' + berthOperatorId + '/' + gangId);
  }

  addLaborCategory(data: any): Observable<any> {
    return this.httpClient.post(this.laborModuleIp + this.laborModulePort + `/laborType/addType`, data);
  }

  getLaborCategoryById(id: string):Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/laborType/getLaborTypeById/` + id);
  }

  editLaborCategory(data: any): Observable<any> {
    return this.httpClient.put(this.laborModuleIp + this.laborModulePort + `/laborType/editType`, data);
  }

  deleteLaborCategory(id: number): Observable<any> {

    return this.httpClient.delete(this.laborModuleIp + this.laborModulePort + `/laborType/deleteType/` + id );
  }

  getLaborCategoryList(): Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/laborType/list`);
  }

  getLaborByEntryPassNo(entry_pass_no: string,orgId: string): Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/labor/getLaborByEntryPassNo/` + entry_pass_no + '/' + orgId);
  }

  getLaborCategoryListById(id: string):Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/laborType/getLaborTypeById/` + id);
  }

  removeLaborFromGang(gandId: string, laborId: string):Observable<any> {
    return this.httpClient.delete(this.laborModuleIp + this.laborModulePort + `/LaborAssignmentToGang/deleteLaborAssignmentByGandAndLabor/` + gandId + '/' + laborId);
  }

}
