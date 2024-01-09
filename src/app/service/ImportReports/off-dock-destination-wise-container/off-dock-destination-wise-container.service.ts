import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffDockDestinationWiseContainerService {
  fileName= 'ExcelSheet.xlsx';
 title:any = 'DESTINATION/OFFDOCK WISE CONTAINER LIST';
 districtWiseTitle='DISTRICT WISE CHITTAGONG PORT CONTAINER LIST FOR 2021/3454'
  private content=new BehaviorSubject<any>("");
  public share=this.content.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }
  getVasselName(results:any){
    // let s="ovi"
   //  const jsonData = JSON.stringify(results);
    // localStorage.setItem("res",jsonData);
    // localStorage.setItem("s",s);
     this.content.next(results);
     console.log(results);
   
     
   }

  getVesselNameAndRotation(rotation:any){
    return this.httpClient.get(`http://192.168.16.243:8093/importReports/OffDockDestinationWiseContainerVesselNameAndRotation/` +rotation); 
  }
  getOrganizationWiseContainerList(rotation:any){

    return this.httpClient.get(`http://192.168.16.243:8093/importReports/OffDockDestinationOrgWiseContainer/` +rotation);

  }
  getDistrictWiseContainerList(rotation:any){

    return this.httpClient.get(`http://192.168.16.243:8093/importReports/OffDockDestinationDistrictWiseContainer/` +rotation);

  }
  getResultWithExcel(rotation:any,vesselAndRotation:any,orgWiseList:any,districtWiseList:any){ 
    let workbook = new Workbook();
     let worksheet = workbook.addWorksheet('DESTINATION/OFFDOCK WISE CONTAINER LIST');
     let titleRow = worksheet.addRow(["","",this.title]);
     titleRow.alignment={ vertical: 'top', horizontal: 'left'};
     titleRow.font = {  size: 16, underline: 'single', bold: true };
     worksheet.addRow([]);
     let vesselName="";
     for(let resultVesselName of JSON.parse(vesselAndRotation)){
        vesselName=resultVesselName.vessel_Name;
      
     }
   let vesselInfoRow=worksheet.addRow(["Vessel Name :",vesselName,"For :",rotation,"",""]);
   vesselInfoRow.alignment={ vertical: 'top', horizontal: 'left'};
   vesselInfoRow.font={bold:true};
   vesselInfoRow.eachCell((cell, number) => {
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      cell.alignment={vertical:'middle',horizontal:'center'}
    });
    worksheet.addRow([]);
   let header = ["S/L","Container", "MLO", "Size","Height","Status"];
   let headerRow = worksheet.addRow(header);
   headerRow.font={bold:true};
   headerRow.eachCell((cell, number) => {
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    cell.alignment={vertical:'middle',horizontal:'center'}
   });
   let offDockId="";
   let i=0;
   let j=0;
   for(let orgResult of JSON.parse(orgWiseList) ){
     i++;
     if(offDockId!=orgResult.off_dock_id){
       if(j>0){
       let rowTotalContainerNo= worksheet.addRow(["Total Container",j,"","","",""]);
       rowTotalContainerNo.eachCell((cell,number)=>{
        rowTotalContainerNo.font={bold:true};
        cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
        cell.alignment={vertical:'middle',horizontal:'center'}
      });
       }
       let rowOrgName=worksheet.addRow([orgResult["organization_Name"],"","","","",""]);
       rowOrgName.font={bold:true};
       rowOrgName.eachCell((cell,number)=>{
        cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
        cell.alignment={vertical:'middle',horizontal:'center'}
      });

       j=1;

     }
     else{
       j++;
     }
     offDockId=orgResult.off_dock_id;
     let row = worksheet.addRow([j,orgResult["id"],orgResult["mlocode"],orgResult["cont_size"],orgResult["cont_height"],orgResult["cont_status"]]);
     let color = 'FF99FF99';
     row.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });
   }
   let totalContainer=worksheet.addRow(["Total Container",j,"","","",""]);
   totalContainer.font={bold:true};
   totalContainer.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });

  let districtWiseTitleRow = worksheet.addRow(["","",this.districtWiseTitle]);
  districtWiseTitleRow.alignment={ vertical: 'top', horizontal: 'left'};
  districtWiseTitleRow.font = {  size: 16, underline: 'single', bold: true };
  worksheet.addRow([]);
   header = ["S/L","Container", "MLO", "Size","Height","Status"];
   headerRow = worksheet.addRow(header);
  headerRow.font={bold:true};
  headerRow.eachCell((cell, number) => {
   cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
   cell.alignment={vertical:'middle',horizontal:'center'}
  });

  let district="";
  j=0;
  for(let districtWiseResult of JSON.parse(districtWiseList) ){
    i++;
    if(district!=districtWiseResult.dist){
      if(j>0){
      let rowTotalContainerNo= worksheet.addRow(["Total Container",j,"","","",""]);
      rowTotalContainerNo.eachCell((cell,number)=>{
       rowTotalContainerNo.font={bold:true};
       cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
       cell.alignment={vertical:'middle',horizontal:'center'}
     });
      }
      let districtName=worksheet.addRow([districtWiseResult["dist"],"","","","",""]);
      districtName.font={bold:true};
      districtName.eachCell((cell,number)=>{
       cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
       cell.alignment={vertical:'middle',horizontal:'center'}
     });

      j=1;

    }
    else{
      j++;
    }
    district=districtWiseResult.dist;
    let row = worksheet.addRow([j,districtWiseResult["id"],districtWiseResult["mlocode"],districtWiseResult["cont_size"],districtWiseResult["cont_height"],districtWiseResult["cont_status"]]);
    let color = 'FF99FF99';
    row.eachCell((cell,number)=>{
     cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
     cell.alignment={vertical:'middle',horizontal:'center'}
   });
  }
  console.log("grantTotal"+i);
  totalContainer=worksheet.addRow(["Total Container",j,"","","",""]);
   totalContainer.font={bold:true};
   totalContainer.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });
  let grantTotal=worksheet.addRow(["Grant Total",i,"","","",""]);
  grantTotal.font={bold:true};
  grantTotal.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }}
    cell.alignment={vertical:'middle',horizontal:'center'}
  });
  worksheet.getColumn(1).width = 25;
  worksheet.getColumn(1).alignment={vertical:'middle',horizontal:'center',wrapText:true};
  worksheet.getColumn(2).width = 25;
  worksheet.getColumn(3).width = 25;
  worksheet.getColumn(4).width = 25;
  worksheet.getColumn(5).width = 25;
  worksheet.getColumn(6).width = 25;
  worksheet.getColumn(7).width = 25;

 workbook.xlsx.writeBuffer().then((data:any) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, 'OffDockDestinationWiseContainerList.xlsx');
  });

   
}



}
