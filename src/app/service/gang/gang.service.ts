import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GangService {

  //API(Route) variables
  laborModuleIp : string;
  laborModulePort : string;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.laborModuleIp = environment.laborModuleIp;
    this.laborModulePort = environment.laborModulePort;
  }

  addGang(data: any): Observable<any> {
    return this.httpClient.post(this.laborModuleIp + this.laborModulePort + `/gang/add`, data);
  }

  getGangById(id: string):Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/gang/getGangById/` + id);
  }

  editGang(data: any): Observable<any> {
    return this.httpClient.put(this.laborModuleIp + this.laborModulePort + `/gang/edit`, data);
  }

  deleteGang(id: number): Observable<any> {
    return this.httpClient.delete(this.laborModuleIp + this.laborModulePort + `/gang/delete/` + id);
  }

  // Full gang list
  getGangList(): Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/gang/list`);
  }

  // Gang List By Organization
  getGangListByOrg(org_id: any): Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/gang/listByOrg/`+org_id);
  }

   // Gang List By Organization by org type
  getGangListByOrgType(user_role_id: any,org_id: any): Observable<any>{
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/gang/listByOrgType/`+ user_role_id + '/' + org_id);
  }

  assignLabor(data: any): Observable<any> {
    return this.httpClient.post(this.laborModuleIp + this.laborModulePort + `/LaborAssignmentToGang/add`, data);
  }

  // assign gang to workplace
  assignGang(data: any): Observable<any> {
    return this.httpClient.post(this.laborModuleIp + this.laborModulePort + `/GangAssign/AddGangAssignment`, data);
  }

  getAssignedLaborByGangId(id: string): Observable<any>{
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/LaborAssignmentToGang/getAssignedLaborByGangId/` + id);
  }

  getAssignedGangList(): Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/GangAssign/list`);
  }

  // shift by org name - saif or not saif
  getShiftList(orgId: number): Observable<any>{
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/shift/listByOrg/`+orgId);
  }

  // get assigned gang by id
  getGangAssignedById(gangAssignId: number): Observable<any>{
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/GangAssign/getGangAssignmentById/`+gangAssignId);
  }

  // update assigned gang
  updateAssignedGang(data: any): Observable<any>{
    return this.httpClient.put(this.laborModuleIp + this.laborModulePort + `/GangAssign/edit`, data);
  }

  // get assigned gang by organization
  getAssignedGangListByOrg(org_id: number): Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/GangAssign/listByOrg/`+org_id);
  }

  getGangForAssign(berth_operator_id: number,work_category_id: string): Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/gang/listByOrgAndWorkCategory/`+ berth_operator_id + '/' + work_category_id);
  }

  // get (yard & assignmentdate) wise container
  getContainerList(yardName: String,start_time: string){
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/VCMSAssignment/containerListByDateAndYard/` + start_time + '/' + yardName);
  }

  // get container list for unstuffing
  getContainerListForUnstuffing(reqData:any): Observable<any>{
    return this.httpClient.post(this.laborModuleIp + this.laborModulePort + `/lclAssignment/containerList`, reqData);
  }

  // get container list of gang assignment for unstuffing
  containerListOfGangAssignmentForUnstuffing(gangAssignId: any): Observable<any>{
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/VCMSAssignment/containerListOfGangAssignmentForUnstuffing/` + gangAssignId);
  }

  // get container list of gang assignment for yard
  containerListOfGangAssignmentForYard(gang_id: any,work_location_id: any,shift: any,yard: any,start_time: any): Observable<any>{
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/VCMSAssignment/containerListOfGangAssignmentForYard/` + gang_id + '/' + work_location_id + '/' + shift + '/' + yard + '/' + start_time);
  }

  // get rot and bl for dlv from shed
  getRotAndBLForDlvFromShed(reqData:any): Observable<any>{
    return this.httpClient.post(this.laborModuleIp + this.laborModulePort + `/lclAssignment/rotAndBlList`, reqData);
  }
  
  // get rot for dlv from shed
  getRotByDateAndShed(reqData:any): Observable<any>{
    return this.httpClient.post(this.laborModuleIp + this.laborModulePort + `/lclAssignment/rotListByDateAndShed`, reqData);
  }

  // get bl for dlv from shed
  getBlByDateAndShed(reqData:any): Observable<any>{
    return this.httpClient.post(this.laborModuleIp + this.laborModulePort + `/lclAssignment/blListByDateAndShed`, reqData);
  }

  endTimeAssignedGang(id:any): Observable<any> {
    return this.httpClient.put(this.laborModuleIp + this.laborModulePort + `/GangEnd/`+id,null);
  }

  getAssignmentPendingRotationList(): Observable<any> {
    return this.httpClient.get(this.laborModuleIp + this.laborModulePort + `/lclAssignment/assignmentPendingRotationList`);
  }

}
