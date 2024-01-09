import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ImportContainerDischargeSummaryLast24HourService {
  ctgPortTitle="CHITTAGONG PORT AUTHORITY,CHITTAGONG";

  constructor(
    private httpClient: HttpClient
  ) { }
  getVesselInfo(rotation:any){
    
    if(rotation==""){
      rotation="empty";
    }
  
   
 return this.httpClient.get('http://192.168.16.243:8093/importReports/importContainerDischargeSummaryReportTwoLast24HourVesselInfo/'+rotation);
}

getVoyNo(rotation:any){
  if(rotation==""){
    rotation="empty";
  }
  return this.httpClient.get('http://192.168.16.243:8093/importReports/ImportContainerDischargeDetailLast24HourVoyNo/'+rotation);
 }

  getImportContainer24HourSummary3(rotation:any,date:any){
    
    if(rotation==""){
      rotation="empty";
    }
    return this.httpClient.get('http://192.168.16.243:8093/importReports/importContainerDischargeSummaryReportTwoLast24HourSummary3/'+rotation+"/"+date);
}
getImportContainer24HourSummary(rotation:any){
    
  if(rotation==""){
    rotation="empty";
  }
  return this.httpClient.get('http://192.168.16.243:8093/importReports/importContainerDischargeSummaryReportTwoLast24HourSummary/'+rotation);
}
getImportContainer24HourSummary2(rotation:any){
    
  if(rotation==""){
    rotation="empty";
  }
  return this.httpClient.get('http://192.168.16.243:8093/importReports/importContainerDischargeSummaryReportTwoLast24HourSummary2/'+rotation);
}

getImportContainer24HourSummary4(rotation:any,date:any){
    
  if(rotation==""){
    rotation="empty";
  }
  return this.httpClient.get('http://192.168.16.243:8093/importReports/importContainerDischargeSummaryReportTwoLast24HourSummary4/'+rotation+"/"+date);
}

getImportContainer24HourSummary5(rotation:any){
    
  if(rotation==""){
    rotation="empty";
  }
  return this.httpClient.get('http://192.168.16.243:8093/importReports/importContainerDischargeSummaryReportTwoLast24HourSummary5/'+rotation);
}
getImportContainer24HourSummary6(rotation:any){
    
  if(rotation==""){
    rotation="empty";
  }
  return this.httpClient.get('http://192.168.16.243:8093/importReports/importContainerDischargeSummaryReportTwoLast24HourSummary6/'+rotation);
}
getSummaryListWithExcel(rotation:any,date:any, voyNo:any,vesselInfo:any,summary:any,summary2:any,summary3:any,summary4:any,summary5:any,summary6:any){

  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet('Import Summary');
  let portTitle=worksheet.addRow(["",this.ctgPortTitle]);
  portTitle.alignment={ vertical: 'top', horizontal: 'left'};
  portTitle.font = {  size: 16, underline: 'single', bold: true };
  worksheet.addRow([]);
  let vesselName="";
  let exRotaiton="";
  let berth="";
  let berthOp="";
  let localAgent=""
  let ata="";
  let publishedEta="";
  let voy="";
  let dischargeStartTime="";
  let dischargeCompletedTime="";
  let atd="";
  for(let vesselInfoRow of vesselInfo){
    vesselName  =vesselInfoRow.vsl_name;
    exRotaiton=vesselInfoRow.rotation;
    berth=vesselInfoRow.berth;
    berthOp=vesselInfoRow.berth_op;
    localAgent=vesselInfoRow.local_agent
    ata=vesselInfoRow.ata;
    publishedEta=vesselInfoRow.published_eta;
    dischargeStartTime=vesselInfoRow.discharge_start_time;
    dischargeCompletedTime=vesselInfoRow.dischargeCompletedTime;
    atd=vesselInfoRow.atd;

  }
  for (let v of  voyNo){
    voy=v.voyNo;
  }
  let vesselNameTitle = worksheet.addRow(["VESSELAME   : ", vesselName]);
  vesselNameTitle.alignment={ vertical: 'top', horizontal: 'left'};
  vesselNameTitle.font = {  bold: true };
  let voyNoTitle = worksheet.addRow(["VOY No   : ", voy]);
  voyNoTitle.alignment={ vertical: 'top', horizontal: 'left'};
  voyNoTitle.font = {  bold: true };
  let impRotationTitle = worksheet.addRow(["IMP.ROT   : ", rotation]);
  impRotationTitle.alignment={ vertical: 'top', horizontal: 'left'};
  impRotationTitle.font = {  bold: true };
  
  let exRotationTitle = worksheet.addRow(["EXP.ROT   : ", exRotaiton]);
  exRotationTitle.alignment={ vertical: 'top', horizontal: 'left'};
  exRotationTitle.font = {  bold: true };
 
  let berthTitle = worksheet.addRow(["BERTH NO   : ", berth]);
  berthTitle.alignment={ vertical: 'top', horizontal: 'left'};
  berthTitle.font = {  bold: true };

  let berthOpTitle = worksheet.addRow(["BERTH OPERATOR   : ", berthOp]);
  berthOpTitle.alignment={ vertical: 'top', horizontal: 'left'};
  berthOpTitle.font = {  bold: true };

  let agetTitle = worksheet.addRow(["SHIPPING AGENT   : ", localAgent]);
  agetTitle.alignment={ vertical: 'top', horizontal: 'left'};
  agetTitle.font = {  bold: true };
  
  let arriveOnTitle = worksheet.addRow(["ARRIVED ON   : ", ata]);
  arriveOnTitle.alignment={ vertical: 'top', horizontal: 'left'};
  arriveOnTitle.font = {  bold: true };
  let expArriveOnTitle = worksheet.addRow(["EXPECTED TIME OF ARRIVED   : ", publishedEta]);
  expArriveOnTitle.alignment={ vertical: 'top', horizontal: 'left'};
  expArriveOnTitle.font = {  bold: true };
  worksheet.addRow([]);
 
 
  let importTitle=worksheet.addRow(["","","","","IMPORT","","","","","","","","","","","","",""]);
  importTitle.alignment={ vertical: 'top', horizontal: 'left'};
  importTitle.font = {  bold: true };
 
  let importSummaryTitle=worksheet.addRow(["","","DISCHARGED","","","","","","TOTAL DISCHARGED","","","","","","BALANCE ON BOARD","","",""]);
  importSummaryTitle.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center',wrapText:true}
    cell.font={bold:true}
  });
  let importSummarySubTitle=worksheet.addRow(["LADEN","","EMPTY","","TUES","","LADEN","","EMPTY","","TUES","","LADEN","","EMPTY","","TUES",""]);
  importSummarySubTitle.eachCell((cell,number)=>{
    //cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'right'}
    cell.font={bold:true}
  });

  let  importSummaryInfoTitle=worksheet.addRow(["20","40","20","40","LD","MT","20","40","20","40","LD","MT","20","40","20","40","LD","MT"]);
  importSummaryInfoTitle.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });
  let impSummaryRowData=worksheet.addRow([summary3[0].discharge_done_LD_20,summary3[0].discharge_done_LD_40,summary3[0].discharge_done_MT_20,
    summary3[0].discharge_done_MT_40,summary3[0].dischage_LD_tues,summary3[0].discharge_MT_tues,
    summary2.balance_LD_20,summary2.balance_LD_40,summary2.balance_MT_20,summary2.balance_MT_40,summary2.balance_LD_tues,
    summary2.balance_MT_tues,summary.onboard_LD_20,summary.onboard_LD_40,summary.onboard_MT_20,summary.onboard_MT_40,summary.onboard_LD_tues, summary.onboard_MT_tues]);
    impSummaryRowData.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });
  worksheet.addRow([]);
  let exportTitle=worksheet.addRow(["","","","","EXPORT","","","","","","","","","","","","",""]);
  exportTitle.alignment={ vertical: 'top', horizontal: 'left'};
  exportTitle.font = {  bold: true };

 

  let exportSummaryTitle=worksheet.addRow(["","","SHIPMENT","","","","","","TOTAL ON BOARD","","","","","","BALANCE TO SHIPMENT","","",""]);
  exportSummaryTitle.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center', wrapText:true}
    cell.font={bold:true}
  });
  let exportSummarySubTitle=worksheet.addRow(["LADEN","","EMPTY","","TUES","","LADEN","","EMPTY","","TUES","","LADEN","","EMPTY","","TUES",""]);
  exportSummarySubTitle.eachCell((cell,number)=>{
    //cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'right'}
    cell.font={bold:true}
  });

  let  exportSummaryInfoTitle=worksheet.addRow(["20","40","20","40","LD","MT","20","40","20","40","LD","MT","20","40","20","40","LD","MT"]);
  exportSummaryInfoTitle.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });


  let exportSummaryRowData=worksheet.addRow([summary4[0].discharge_done_LD_20,summary4[0].discharge_done_LD_40,summary4[0].discharge_done_MT_20,
    summary4[0].discharge_done_MT_40,summary4[0].dischage_LD_tues,summary4[0].discharge_MT_tues,
    summary5.balance_LD_20,summary5.balance_LD_40,summary5.balance_MT_20,summary5.balance_MT_40,summary5.balance_LD_tues,
    summary5.balance_MT_tues,summary6.onboard_LD_20,summary6.onboard_LD_40,summary6.onboard_MT_20,summary6.onboard_MT_40,summary6.onboard_LD_tues, summary6.onboard_MT_tues]);
    exportSummaryRowData.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });
 
worksheet.addRow([]);
let footerTitle=worksheet.addRow(["","","","","PROGRAM","","","","","","","","","","","","",""]);
footerTitle.alignment={ vertical: 'top', horizontal: 'left'};
footerTitle.font = {  bold: true };
let footerSummaryTitle=worksheet.addRow(["","","","","IMPORT-01","","","","","","","","","EXPORT-01","","","",""]);
footerSummaryTitle.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
  cell.font={bold:true}
});
worksheet.addRow([]);
let berthFooterTitle = worksheet.addRow(["BERTHED   : ", ata]);
berthFooterTitle.alignment={ vertical: 'top', horizontal: 'left'};
berthFooterTitle.font = {  bold: true };

let dischargeStartTimeTitle = worksheet.addRow(["COMMENCE DISCHARGE   : ", dischargeStartTime]);
dischargeStartTimeTitle.alignment={ vertical: 'top', horizontal: 'left'};
dischargeStartTimeTitle.font = {  bold: true };

let dischargeCompletedTimeTitle = worksheet.addRow(["COMPLETED DISCHARGE   : ", dischargeCompletedTime]);
dischargeCompletedTimeTitle.alignment={ vertical: 'top', horizontal: 'left'};
dischargeCompletedTimeTitle.font = {  bold: true };

let commenceLoadTitle = worksheet.addRow(["COMMENCE LOAD   : " ]);
commenceLoadTitle.alignment={ vertical: 'top', horizontal: 'left'};
commenceLoadTitle.font = {  bold: true };

let completedLoadTitle = worksheet.addRow(["COMPLETED LOAD   : "]);
completedLoadTitle.alignment={ vertical: 'top', horizontal: 'left'};
completedLoadTitle.font = {  bold: true };

let saildTitle = worksheet.addRow(["SAILED   : ",atd ]);
saildTitle.alignment={ vertical: 'top', horizontal: 'left'};
saildTitle.font = {  bold: true };






  worksheet.getColumn(1).width =20;
  worksheet.getColumn(1).alignment={vertical:'middle',horizontal:'center',wrapText:true};
  worksheet.getColumn(2).width = 20;
  worksheet.getColumn(3).width = 25;
  worksheet.getColumn(4).width = 20;
  worksheet.getColumn(5).width = 20;
  worksheet.getColumn(6).width = 20;
  worksheet.getColumn(7).width = 20;
  worksheet.getColumn(8).width = 20;
  worksheet.getColumn(9).width = 20;
  worksheet.getColumn(10).width =20;
  worksheet.getColumn(11).width =20;
  worksheet.getColumn(12).width =20;
  worksheet.getColumn(13).width =20;
  worksheet.getColumn(14).width =20;
  worksheet.getColumn(15).width =20;
  worksheet.getColumn(16).width =20;
  worksheet.getColumn(17).width =20;
  worksheet.getColumn(18).width =20;

  workbook.xlsx.writeBuffer().then((data:any) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, 'importContainerDischargeSummaryLast24Hour.xlsx');
  });
  
}


}
