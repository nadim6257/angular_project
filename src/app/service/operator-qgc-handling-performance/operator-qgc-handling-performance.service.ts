import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class OperatorQgcHandlingPerformanceService {
  fileName= 'ExcelSheet.xlsx';
  ctgPortTitle="     CHITTAGONG PORT AUTHORITY,CHITTAGONG"
  title:any ="OPERATOR'S QGC HANDLING PERFORMANCE REPORT";
  header:any = ["SlNo","Operator", "Equipment", "Import Receiving","Total Handling Boxes"];

  constructor(
    private httpClient: HttpClient
  ) { }

  getOperationQgcPerformanceHandlingList(shift:any,fromDate:any,fromTime:any,toDate:any,toTime:any){
    if(shift=="Day" || shift=="Night"){
      fromTime="00:00";
      toDate="00-00-00"
      toTime="00:00"

    }
    return this.httpClient.get(`http://192.168.16.243:8093/importReports/OperatorQgcHandlingPerformance/` +shift+"/"+fromDate+"/"+fromTime+"/"+toDate+"/"+toTime+"/"); 
  }
  getResultWithExcel(resultList:any,shift:any,fromDate:any,toDate:any){
    // Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("OPERATOR'S QGC HANDLING PERFORMANCE REPORT");

     //Add Row and formatting
     let portTitle=worksheet.addRow(["",this.ctgPortTitle]);
     portTitle.alignment={ vertical: 'top', horizontal: 'left'};
     portTitle.font = {  size: 16, underline: 'single', bold: true };
     worksheet.addRow([]);
     let titleRow = worksheet.addRow(["",this.title]);
     titleRow.alignment={ vertical: 'top', horizontal: 'left'};
     titleRow.font = {  size: 16, underline: 'single', bold: true };
    // let shiftTitle=worksheet.addRow(["","","","Shift : ",shift]);
   //  shiftTitle.font={ size: 16, bold: true};
     worksheet.addRow([]);
    
     if(toDate==""){
      var info=worksheet.addRow(["     From Date : "+fromDate,"","","     Shift : "+shift]);
     

     }
     else{
      var info=worksheet.addRow(["     From Date : "+fromDate,"","     To Date : "+toDate,"","     Shift : "+shift]);
     
     }
    
     info.alignment={ vertical: 'top', horizontal: 'left'};
     info.font = {  size: 12, bold: true};
     worksheet.addRow([]);
    let headerRow = worksheet.addRow(this.header);
    headerRow.font={bold:true};

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
    /*  cell.fill = {
        type: 'pattern',
        pattern: 'solid',
       fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }*/
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      cell.alignment={vertical:'middle',horizontal:'center'}
    });
    // worksheet.addRows(data);

    // Add Data and Conditional Formatting
     let i=0;
     for(let result of resultList){
      i++;
   
        let row = worksheet.addRow([i,result["placed_by"],result["full_name"],result["total_move"],result["totalHandingBox"]]);
        let color = 'FF99FF99';
        row.eachCell((cell,number)=>{
         cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
         cell.alignment={vertical:'middle',horizontal:'center'}
       });
       
       
   

   }
     worksheet.getColumn(1).width = 30;
     worksheet.getColumn(2).width = 30;
     worksheet.getColumn(3).width = 30;
     worksheet.getColumn(4).width = 30;
     worksheet.getColumn(5).width = 30;
     worksheet.getRow(1).outlineLevel=200;
     worksheet.getRow(1).alignment={vertical:"middle",horizontal:"left"};
    



   workbook.xlsx.writeBuffer().then((data:any) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, 'OperatorQgcHandlingPerformaceReport.xlsx');
  });
  



 }
}
