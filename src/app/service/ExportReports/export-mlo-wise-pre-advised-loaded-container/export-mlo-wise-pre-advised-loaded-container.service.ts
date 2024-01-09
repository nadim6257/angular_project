import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportMloWisePreAdvisedLoadedContainerService {
  igmMisIp : string;
  igmMisPort : string;
  constructor(

    private httpClient: HttpClient,
  ) {
    this.igmMisIp = environment.igmMisIp;
    this.igmMisPort = environment.igmMisPort;


   }


  getMloWisePreAdvisedLoadedContainer(tmp_rot_no: string):Observable<any> {

    console.log("temporary_rotation:"+tmp_rot_no);
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportMloWisePreAdvisedLoadedContainerList/` + tmp_rot_no);
  }
  getMloWisePreAdvisedListView(tmp_rot_no: string,MLO:any):Observable<any> {
 
   return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportMloWisePreAdvisedViewList/` + tmp_rot_no + "/"+MLO);
  }
  getMloWiseSummaryList(tmp_rot_no:string,MLO:any):Observable<any>{

    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/ExportMloWiseSummeryList/`+tmp_rot_no+"/"+MLO);
  }
}
