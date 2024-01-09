import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class RemovalListOfOverFlowYardService {
  ctgPortTitle="CHITTAGONG PORT AUTHORITY,CHITTAGONG"
  title:any ="       Removal Tally of Overflow Yard";
  header:any = ["SlNo","Assign Type", "C&F Name", "Cell No","Container No","Size","Height","Seal No.","MLO","Status","Vessel Name","Rotation",">From Slot","From Yard","Trailer No","Remarks"];


  constructor(
    private httpClient: HttpClient
  ) { }

  getRemovalListOfOverFlowYard(assignDate:any,modify:any){
    return this.httpClient.get('http://192.168.16.243:8093/importReports/RemovalListOfOverFlowYard/' + assignDate+"/"+modify+"/");
  }

  getResultWithExcel(resultList:any){
   
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Removal Tally of Overflow Yard");

     let portTitle=worksheet.addRow(["","",this.ctgPortTitle]);
     portTitle.alignment={ vertical: 'top', horizontal: 'left'};
     portTitle.font = {  size: 16, bold: true };
     let serialNoRow=worksheet.addRow(["","","","","","Serial No : "]);
     serialNoRow.font={size: 12,  bold: true };
     let dateRow=worksheet.addRow(["","","","","","Date : "]);
     dateRow.font={size: 12,  bold: true };
     let titleRow = worksheet.addRow(["","",this.title]);
     titleRow.alignment={ vertical: 'top', horizontal: 'left'};
     titleRow.font = {  size: 16, bold: true  };
     worksheet.addRow([]);
    let headerRow = worksheet.addRow(this.header);
    headerRow.font={bold:true};

 
    headerRow.eachCell((cell, number) => {
  
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      cell.alignment={vertical:'middle',horizontal:'center'}
    });
   
     let i=0;
     for(let result of resultList){
      i++;
   
        let row = worksheet.addRow([i,result["mfdch_value"],result["cf"],result["sms_number"],result["cont_no"],result["size"],result["height"],result["seal_nbr1"],result["mlo"],result["cont_status"],result["v_name"],result["rot_no"],result["slot"],result["yard_No"],"",""]);
        let color = 'FF99FF99';
        row.eachCell((cell,number)=>{
         cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
         cell.alignment={vertical:'middle',horizontal:'center'}
       });
 }
     worksheet.getColumn(1).width = 25;
     worksheet.getColumn(2).width = 25;
     worksheet.getColumn(3).width = 30;
     worksheet.getColumn(4).width = 25;
     worksheet.getColumn(5).width = 25;
     worksheet.getColumn(6).width = 30;
     worksheet.getColumn(8).width = 25;
     worksheet.getColumn(9).width = 25;
     worksheet.getColumn(10).width = 25;
     worksheet.getColumn(11).width = 25;
     worksheet.getColumn(12).width = 25;
     worksheet.getColumn(13).width = 25;
     worksheet.getColumn(14).width = 25;
     worksheet.getColumn(15).width = 25;
     worksheet.getColumn(16).width = 25;
     
    



   workbook.xlsx.writeBuffer().then((data:any) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, 'RemovalTallyOfOverflowYardReport.xlsx');
  });
  



 }
}
