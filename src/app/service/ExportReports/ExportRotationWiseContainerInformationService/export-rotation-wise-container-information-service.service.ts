import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportRotationWiseContainerInformationService {
  igmMisIp : string;
  igmMisPort : string;
  constructor(
private httpClient: HttpClient,
  ) {
    this.igmMisIp = environment.igmMisIp;
    this.igmMisPort = environment.igmMisPort;

   }


  getRotationWiseContainerInformation(tmp_rot_n:string):Observable<any> {
    return this.httpClient.get(this.igmMisIp + this.igmMisPort +`/ExportReport/RotationWiseExportContainer/`+tmp_rot_n);
  }
}