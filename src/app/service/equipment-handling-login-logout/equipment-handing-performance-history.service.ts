import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class EquipmentHandingPerformanceHistoryService {
  private content=new BehaviorSubject<any>("");
  public share=this.content.asObservable();
 fileName= 'ExcelSheet.xlsx';
 title:any = 'Equipment Handling Performance History';
  header:any = ["SlNo","VMT Logln/LogOut Time", "Log Type", "User Name", "Operator Name", "Program"];

  constructor() { }
  getResult(results:any){
   
    this.content.next(results);
  
    
  }
  getResultWithExcel(resultList:any,shift:any){
     // Create workbook and worksheet
     let workbook = new Workbook();
     let worksheet = workbook.addWorksheet('Equipment Handling Performance History');
 
      //Add Row and formatting
      let titleRow = worksheet.addRow(["","",this.title]);
      titleRow.alignment={ vertical: 'top', horizontal: 'left'};
      titleRow.font = {  size: 16, underline: 'single', bold: true };
      let shiftTitle=worksheet.addRow(["","","","       Shift : ","    "+shift]);
      shiftTitle.font={ size: 16, bold: true};

      worksheet.addRow([]);
 
     let headerRow = worksheet.addRow(this.header);
     headerRow.font={bold:true};
     headerRow.alignment={vertical:'middle',horizontal:'center'}
 
     // Cell Style : Fill and Border
     headerRow.eachCell((cell, number) => {
     /*  cell.fill = {
         type: 'pattern',
         pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
         bgColor: { argb: 'FF0000FF' }
       }*/
       cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     });
     // worksheet.addRows(data);
 
     // Add Data and Conditional Formatting
      let i=0;
      for(let result of resultList){
       i++;
       console.log(result["logDate"]);
    
         let row = worksheet.addRow([i,result["logDate"],result["logType"],result["logBy"],result["logEquip"],result["program"]]);
         let color = 'FF99FF99';
         row.eachCell((cell,number)=>{
          cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
          cell.alignment={vertical:'middle',horizontal:'center'}
        });
        
        
    

    }
      worksheet.getColumn(1).width = 10;
      worksheet.getColumn(2).width = 30;
      worksheet.getColumn(3).width = 10;
      worksheet.getColumn(4).width = 15;
      worksheet.getColumn(5).width = 20;
      worksheet.getColumn(6).width = 30;
      worksheet.getRow(1).outlineLevel=200;
      worksheet.getRow(1).alignment={vertical:"middle",horizontal:"left"}


 
    workbook.xlsx.writeBuffer().then((data:any) => {
     let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
     fs.saveAs(blob, 'EquipmentHandlingPerformanceHistory.xlsx');
   });
   
 


  }
}
