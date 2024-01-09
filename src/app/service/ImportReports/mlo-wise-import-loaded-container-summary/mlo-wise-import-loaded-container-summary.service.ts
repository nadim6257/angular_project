import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class MloWiseImportLoadedContainerSummaryService {
  fileName= 'ExcelSheet.xlsx';
  ctgPortTitle="     CHITTAGONG PORT AUTHORITY,CHITTAGONG"
  officeManagetitle="OFFICE OF THE TERMINAL MANAGER"
  title:any ="MLO WISE IMPORT SUMMARY";
  detailTitle:any ="FINAL DISCHARGING DETAIL";
  detailHeader:any = ["SlNo","Container No","Size",	"Height",	"ISOCode",	"ISOGroup","Status",	"Seal NO","MLO","OffDoc/Port",	"Yard",	"Weight","Discharge Time","Job Done Time",	"Remarks"];
  summaryHeader:any = ["","","",	"",	"",	"","LADEN",	"","",	"",	"","","",	"",	"",	"",	"",	"EMPTY",	"","","","","","","",];
  summaryRowHeader:any = ["MLO'S","2D","4D",	"4H",	"45H",	"4RH","2RF",	"2OT","2FR",	"2TK",	"4FR","4OT","2D","4D",	"4H",	"45H",	"4RH","2RF",	"2OT","2FR",	"2TK",	"4FR","4OT","TOTAL CONTS","TOTAL TEUS"];


  constructor(
    private httpClient: HttpClient
  ) { }
  getVesselInfo(rotation:any){
    return this.httpClient.get('http://192.168.16.243:8093/importReports/MloWiseImportSummaryVesselInformation/'+rotation);

  }
  getVoyNo(rotation:any){
    return this.httpClient.get('http://192.168.16.243:8093/importReports/MloWiseImportSummaryLoadedListVoyNo/'+rotation);
   }
   getMloWiseImportLoadedContainerSummaryList(rotation:any){
    
     return this.httpClient.get('http://192.168.16.243:8093/importReports/MloWiseImportSummaryLoadedList/'+rotation+"/");
   }

   
  


getListWithExcel(rotation:any,vesselInfo:any, voyNo:any,resultList:any){
  
 
 let workbook = new Workbook();
 let worksheet = workbook.addWorksheet("MLO WISE IMPORT SUMMARY");
 let vesselName="";
 let berth="";
 let arrivalDate="";
 let voyNumber="";
 let sailedNo=""
 for(let res of JSON.parse(voyNo) ){
  voyNumber=res.voy_No;
  
}
for(let vessel of vesselInfo){
 vesselName=vessel.vsl_name;
 arrivalDate=vessel.ata;
 berth=vessel.berth;
 sailedNo=vessel.atd;
}
let veseelInfoRow1=worksheet.addRow(["M.V :" +vesselName ,"",    "VOY NO : ",voyNumber,"","ROTATION : ",rotation ,"",     ]);
  veseelInfoRow1.alignment={ vertical: 'top', horizontal: 'left'};
  veseelInfoRow1.font = { size:10,  bold: true };
  worksheet.addRow([]);

  let veseelInfoRow2=worksheet.addRow(["ARRIVAL DATE : "+arrivalDate,"","SAILED NO ",sailedNo,"" ,"BERTH : ",berth ]);
  veseelInfoRow2.alignment={ vertical: 'top', horizontal: 'left'};
  veseelInfoRow2.font = { size:10,  bold: true };
  worksheet.addRow([]);


  let titleRow = worksheet.addRow(["","",this.title]);
  titleRow.alignment={ vertical: 'top', horizontal: 'left'};
  titleRow.font = {  size: 16,  bold: true };
   worksheet.addRow([]);
 

  let headerSummary = worksheet.addRow(this.summaryHeader);
  headerSummary.font={bold:true};
  headerSummary.eachCell((cell, number) => {

   cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
   cell.alignment={vertical:'middle',horizontal:'center'}
 });

 let headerRowSummary = worksheet.addRow(this.summaryRowHeader);
 headerRowSummary.font={bold:true};
 headerRowSummary.eachCell((cell, number) => {

   cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
   cell.alignment={vertical:'middle',horizontal:'center'}
 });

  let i=0;
  let mlo="";
  for(let result of resultList){
   i++;
   if(result.mlo==null){
     mlo="Total";


   }
   else{
     mlo=result.mlo_name+result.mlo;
   }
   
 
     let row = worksheet.addRow([mlo,result["d_20"],result["d_40"],result["h_40"],result["h_45"],result["rh_40"],
                                 result["r_20"],result["ot_20"],result["fr_20"],result["tk_20"],result["fr_40"],result["ot_40"],
                                 result["md_20"],result["md_40"],result["mh_40"],result["mh_45"],result["mrh_40"],
                                 result["mr_20"],result["mot_20"],result["mfr_20"],result["mtk_20"],result["mfr_40"],
                                 result["mot_40"],result["grand_tot"],result["tues"]
      ]);
     let color = 'FF99FF99';
     row.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });
    
    


}
  worksheet.getColumn(1).width = 35;
  worksheet.getColumn(2).width = 10;
  worksheet.getColumn(3).width = 10;
  worksheet.getColumn(4).width = 10;
  worksheet.getColumn(5).width = 10;
  worksheet.getColumn(6).width = 10;
  worksheet.getColumn(7).width = 10;
  worksheet.getColumn(8).width = 10;
  worksheet.getColumn(9).width = 10;
  worksheet.getColumn(10).width = 10;
  worksheet.getColumn(11).width = 10;
  worksheet.getColumn(12).width = 10;
  worksheet.getColumn(13).width = 10;
  worksheet.getColumn(14).width = 10;
  worksheet.getColumn(15).width = 10;
  worksheet.getColumn(16).width = 10;
  worksheet.getColumn(17).width = 10;
  worksheet.getColumn(18).width = 10;
  worksheet.getColumn(19).width = 10;
  worksheet.getColumn(20).width = 10;
  worksheet.getColumn(21).width = 10;
  worksheet.getColumn(22).width = 10;
  worksheet.getColumn(23).width = 10;
  worksheet.getColumn(24).width = 17;
  worksheet.getColumn(25).width = 17;
 
 
 // worksheet.getRow(1).outlineLevel=200;
 // worksheet.getRow(1).alignment={vertical:"middle",horizontal:"left"};
 



workbook.xlsx.writeBuffer().then((data:any) => {
 let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 fs.saveAs(blob, 'MLOWISEIMPORTSUMMARY.xlsx');
});




}

   
}
