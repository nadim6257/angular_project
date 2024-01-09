import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ImportContainerDischargeAndBalanceService {
  fileName= 'ExcelSheet.xlsx';
  ctgPortTitle="CHITTAGONG PORT AUTHORITY,CHITTAGONG";
  title:any = '       Import Container Discharging Report';
  dischargeContainerTitle='IMPORT CONTAINER DISCHARGED LIST';
  balanceOnBoardTitle="IMPORT CONTAINER BALANCE ON BOARD LIST"
  header:any = ["SlNo","Container No", "Discharge Time", "Location","Seal No","Type","MLO","Status","Weight","IMCO","Commodity","Remarks"];

  constructor(
    private httpClient: HttpClient
  ) { }
  getVvdgkey(rotation:any){
    return this.httpClient.get('http://192.168.16.243:8093/importReports/ImportContainerDischargeAndBalaceReportVvdgkey/' + rotation);
  }

  getVesselInfo(vvdgkey:any){
    return this.httpClient.get('http://192.168.16.243:8093/importReports/ImportContainerDischargeAndBalaceReportVesselInfo/' + vvdgkey);
  }
  getVoyNo(rotation:any){
    return this.httpClient.get('http://192.168.16.243:8093/importReports/ImportContainerDischargeAndBalaceReportVoyNo/' + rotation);
  }


  getDischargeContainerList(vvdgkey:any){
    return this.httpClient.get('http://192.168.16.243:8093/importReports/ImportContainerDischargeList/' + vvdgkey);
  }
  getBalanceOnBoardList(vvdgkey:any){
    return this.httpClient.get('http://192.168.16.243:8093/importReports/ImportContainerBalaceOnBoardList/' + vvdgkey);
  }
 

  getDischargeContainerSummary(vvdgkey:any){
    return this.httpClient.get('http://192.168.16.243:8093/importReports/ImportContainerDischargeSummary/' + vvdgkey);
  }

  getDischargeContainerBanlaceOnBoardSummary(vvdgkey:any){
    return this.httpClient.get('http://192.168.16.243:8093/importReports/ImportContainerBalanceOnBoardSummary/' + vvdgkey);
  }

  getResultWithExcel(rotation:any,vesselInfo:any,banlanceList:any, containerDischargeList:any,balanceOnBoardSummary:any,dischargeContainerSummary:any,voyNo:any){ 
     let workbook = new Workbook();
     let worksheet = workbook.addWorksheet('Import Container Discharging Report');

     let portTitle=worksheet.addRow(["","",this.ctgPortTitle]);
     portTitle.alignment={ vertical: 'top', horizontal: 'left'};
     portTitle.font = {  size: 16, underline: 'single', bold: true };
     worksheet.addRow([]);

     let titleRow = worksheet.addRow(["","",this.title]);
     titleRow.alignment={ vertical: 'top', horizontal: 'left'};
     worksheet.addRow([]);

     titleRow.font = {  size: 16,  bold: true };
     let vesselName="";
     let eta="";
     for(let vessel of vesselInfo){
       vesselName=vessel.vsl_name;
       eta=vessel.ata;
}
     let veseelInfoRow=worksheet.addRow(["","Vessel : " +vesselName,"     Voy No : "+voyNo[0].voy_No,"Rotation : "+rotation ,"ETA : "+eta ]);
     veseelInfoRow.alignment={ vertical: 'top', horizontal: 'left'};
     veseelInfoRow.font = {   bold: true };
     worksheet.addRow([]);

     let balanceTitle=worksheet.addRow(["","",this.balanceOnBoardTitle]);
     balanceTitle.alignment={ vertical: 'top', horizontal: 'left'};
     balanceTitle.font = {  size: 16,  bold: true };
     worksheet.addRow([]);


    let headerRow = worksheet.addRow(this.header);
    headerRow.font={bold:true};
    headerRow.eachCell((cell, number) => {
     cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     cell.alignment={vertical:'middle',horizontal:'center'}
    });
    let j=0;
    for(let balancerResult of  banlanceList ){
      j++;

      let row = worksheet.addRow([j,balancerResult["id"],balancerResult["fcy_time_in"],balancerResult["location"],balancerResult["sealno"],balancerResult["iso"],balancerResult["mlo"],balancerResult["freight_kind"],balancerResult["weight"],"",balancerResult["short_name"],""]);
      let color = 'FF99FF99';
      row.eachCell((cell,number)=>{
       cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
       cell.alignment={vertical:'middle',horizontal:'center'}
     });
    

    }
    worksheet.addRow([]);


     let containerDsTitle=worksheet.addRow(["","",this.dischargeContainerTitle]);
     containerDsTitle.alignment={ vertical: 'top', horizontal: 'left'};
     containerDsTitle.font = {  size: 16,  bold: true };
     worksheet.addRow([]);

     headerRow = worksheet.addRow(this.header);
     headerRow.font={bold:true};
     headerRow.eachCell((cell, number) => {
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      cell.alignment={vertical:'middle',horizontal:'center'}
     });


     let i=0;

     for(let dischargeContainerResult of containerDischargeList ){
       i++;

       let row = worksheet.addRow([i,dischargeContainerResult["id"],dischargeContainerResult["fcy_time_in"],dischargeContainerResult["location"],dischargeContainerResult["sealno"],dischargeContainerResult["iso"],dischargeContainerResult["mlo"],dischargeContainerResult["freight_kind"],dischargeContainerResult["weight"],"",dischargeContainerResult["short_name"],""]);
       let color = 'FF99FF99';
       row.eachCell((cell,number)=>{
        cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
        cell.alignment={vertical:'middle',horizontal:'center'}
      });
     

     }






    
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
  worksheet.addRow([]);
  worksheet.addRow([]);
  let summaryTitle=worksheet.addRow(["","","DISCHARGED","","","","","","BALANCE ON BOARD","","",""]);
  summaryTitle.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });
  //let summarySubTitle=worksheet.addRow(["","LADEN","","EMPTY","","TUES","","LADEN","","EMPTY","","TUES"]);
  let summarySubTitle=worksheet.addRow(["LADEN","","EMPTY","","TUES","","LADEN","","EMPTY","","TUES",""]);
  summarySubTitle.eachCell((cell,number)=>{
    //cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'right'}
  });
  let summaryInfoTitle=worksheet.addRow(["20","40","20","40","LD","MT","20","40","20","40","LD","MT"]);
  summaryInfoTitle.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });
  let SummaryData=worksheet.addRow([dischargeContainerSummary[0].balance_LD_20,dischargeContainerSummary[0].balance_LD_40,dischargeContainerSummary[0].balance_MT_20,dischargeContainerSummary[0].balance_MT_40,dischargeContainerSummary[0].balance_LD_tues,dischargeContainerSummary[0].balance_MT_tues,balanceOnBoardSummary[0].onboard_LD_20,balanceOnBoardSummary[0].onboard_LD_40,balanceOnBoardSummary[0].onboard_MT_20,balanceOnBoardSummary[0].onboard_MT_40,balanceOnBoardSummary[0].onboard_LD_tues,balanceOnBoardSummary[0].onboard_MT_tues]);
  SummaryData.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });

  

 workbook.xlsx.writeBuffer().then((data:any) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, 'importContainerDischargeAndBalanceReport.xlsx');
  });

 

  
   
}
 

}
