import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OffDockBlockedContainerListService {

  constructor(
    private httpClient:HttpClient

  ) { }

  getOffDockWiseBlockContainerList(){
    return this.httpClient.get(`http://192.168.16.243:8093/importReports/OffDockWiseBlockedCotainerList`); 
  }
}
