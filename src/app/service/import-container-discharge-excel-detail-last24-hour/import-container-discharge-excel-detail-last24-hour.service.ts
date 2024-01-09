import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ImportContainerDischargeExcelDetailLast24HourService {
  fileName= 'ExcelSheet.xlsx';
  ctgPortTitle="     CHITTAGONG PORT AUTHORITY,CHITTAGONG"
  officeManagetitle="OFFICE OF THE TERMINAL MANAGER"
  title:any ="MLO WISE FINAL DISCHARGING SUMMARY";
  detailTitle:any ="FINAL DISCHARGING DETAIL";
  detailHeader:any = ["SlNo","Container No","Size",	"Height",	"ISOCode",	"ISOGroup","Status",	"Seal NO","MLO","OffDoc/Port",	"Yard",	"Weight","Discharge Time","Job Done Time",	"Remarks"];
  summaryHeader:any = ["MLO'S","","",	"",	"",	"","LADEN",	"","",	"",	"","","",	"",	"",	"",	"",	"EMPTY",	"","","","","","TOTAL CONTS","TOTAL TEUS","WEIGHT"];
  summaryRowHeader:any = ["","2D","2RF",	"2OT",	"2FR",	"2TK","4D",	"4H","4RH",	"45H",	"4FR","4OT","2D",	"2RF",	"2OT",	"2FR",	"2TK",	"4D",	"4H","4RH","45H","4FR","4OT","","",""];

  constructor(
    private httpClient: HttpClient
  ) { }
  getImportContainerDischargeDetailLast24HourVesselInfo(rotation:any){
    return this.httpClient.get('http://192.168.16.187:8081/importReports/ImportContainerDischargeDetailLast24HourVesselInformation/'+rotation);

  }
  getImportContainerDischargeDetailLast24HourVoyNo(rotation:any){
    return this.httpClient.get('http://192.168.16.187:8081/importReports/ImportContainerDischargeDetailLast24HourVoyNo/'+rotation);
   }
   getImportContainer24HourSummaryList(rotation:any,fromDate:any,fromTime:any,toDate:any,toTime:any){
    
       if(fromDate==""){
         fromDate="empty";
       }
       if(fromTime==""){
        fromTime="empty";
      }
       if(toDate==""){
        toDate="empty";
      }
       if(toTime==""){
        toTime="empty";
      }
      
    return this.httpClient.get('http://192.168.16.187:8081/importReports/ImportContainerDischargeDetailLast24HourSummaryList/'+rotation+"/"+fromDate+"/"+fromTime+"/"+toDate+"/"+toTime+"/");
   }
   getImportContainer24HourDetailList(rotation:any,fromDate:any,fromTime:any,toDate:any,toTime:any){
    if(fromDate==""){
      fromDate="empty";
    }
    if(fromTime==""){
     fromTime="empty";
   }
    if(toDate==""){
     toDate="empty";
   }
    if(toTime==""){
     toTime="empty";
   }
    return this.httpClient.get('http://192.168.16.187:8081/importReports/ImportContainerDischargeDetailLast24HourDetailList/'+rotation+"/"+fromDate+"/"+fromTime+"/"+toDate+"/"+toTime+"/");
   }

   getSummaryListWithExcel(rotation:any,vesselInfo:any, voyNo:any,resultList:any){
     
    
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("MLO WISE FINAL DISCHARGING SUMMARY");

     let managerTitle=worksheet.addRow(["","",this.officeManagetitle]);
     managerTitle.alignment={ vertical: 'top', horizontal: 'left'};
     managerTitle.font = {  size: 16, bold: true };
     worksheet.addRow([]);

     let titleRow = worksheet.addRow(["","",this.title]);
     titleRow.alignment={ vertical: 'top', horizontal: 'left'};
     titleRow.font = {  size: 16,  bold: true };
      worksheet.addRow([]);
    
      let vesselName="";
      let berth="";
      let arrivalDate="";
      let voyNumber="";
      for(let res of JSON.parse(voyNo) ){
        voyNumber=res.voy_No;
        
      }
     for(let vessel of vesselInfo){
       vesselName=vessel.vsl_name;
       arrivalDate=vessel.ata;
       berth=vessel.berth;
}
     let veseelInfoRow=worksheet.addRow(["","","VESSEL : " ,vesselName, "",    "VOY NO : ",voyNumber,"","ROTATION : ",rotation ,"","     ARRIVAL", "   DATE :",arrivalDate,"","   BERTH : ",berth ]);
     veseelInfoRow.alignment={ vertical: 'top', horizontal: 'left'};
     veseelInfoRow.font = { size:10,  bold: true };
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
     for(let result of resultList){
      i++;
      
    
        let row = worksheet.addRow([result["mlo"],result["d_20"],result["r_20"],result["ot_20"],result["fr_20"],result["tk_20"],
                                    result["d_40"],result["h_40"],result["rh_40"],result["h_45"],result["fr_40"],result["ot_40"],
                                    result["md_20"],result["mr_20"],result["mot_20"],result["mfr_20"],result["mtk_20"],
                                    result["md_40"],result["mh_40"],result["mrh_40"],result["mh_45"],result["mfr_40"],
                                    result["mot_40"],result["grand_tot"],result["tues"],result["weight"]
         ]);
        let color = 'FF99FF99';
        row.eachCell((cell,number)=>{
         cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
         cell.alignment={vertical:'middle',horizontal:'center'}
       });
       
       
   

   }
     worksheet.getColumn(1).width = 10;
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
     worksheet.getColumn(26).width = 17;
    
    // worksheet.getRow(1).outlineLevel=200;
    // worksheet.getRow(1).alignment={vertical:"middle",horizontal:"left"};
    



   workbook.xlsx.writeBuffer().then((data:any) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, 'MLOWISEFINALDISCHARGINGSUMMARY.xlsx');
  });
  



 }

 getDetailListWithExcel(rotation:any,vesselInfo:any, voyNo:any,resultList:any){
     
    
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet(" FINAL DISCHARGING DETAIL");

   let managerTitle=worksheet.addRow(["","",this.officeManagetitle]);
   managerTitle.alignment={ vertical: 'top', horizontal: 'left'};
   managerTitle.font = {  size: 16, bold: true };
   worksheet.addRow([]);

   let titleRow = worksheet.addRow(["","",this.detailTitle]);
   titleRow.alignment={ vertical: 'top', horizontal: 'left'};
   titleRow.font = {  size: 16,  bold: true };
    worksheet.addRow([]);
  
   
    let vesselName="";
    let berth="";
    let arrivalDate="";
    let voyNumber="";
    for(let res of JSON.parse(voyNo) ){
      voyNumber=res.voy_No;
      
    }
   for(let vessel of vesselInfo){
     vesselName=vessel.vsl_name;
     arrivalDate=vessel.ata;
     berth=vessel.berth;
}
   let veseelInfoRow=worksheet.addRow(["","","VESSEL : " ,vesselName, "",    "VOY NO : ",voyNumber,"","ROTATION : ",rotation ,"","     ARRIVAL", "   DATE :",arrivalDate,"","   BERTH : ",berth ]);
   veseelInfoRow.alignment={ vertical: 'top', horizontal: 'left'};
   veseelInfoRow.font = { size:10,  bold: true };
   worksheet.addRow([]);
   let headerDetail = worksheet.addRow(this.detailHeader);
   headerDetail.font={bold:true};
   headerDetail.eachCell((cell, number) => {

    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    cell.alignment={vertical:'middle',horizontal:'center'}
  });

 
  let weight=0;
  let mlo="";
  let j=0;
   let i=0;
   for(let result of resultList){
    i++;
    if(mlo!=result.mlo){
      if(j>0){
        let row1 = worksheet.addRow(["Total","","","","","", "","","","","",weight,"","",""]);
     // let color = 'FF99FF99';
      row1.eachCell((cell,number)=>{
       cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
       cell.alignment={vertical:'middle',horizontal:'center'}
     });
      }
      j=1;
      weight=result.weight;
    }
    else{
      j++;
      weight=weight+result.weight;
    }
    mlo=result.mlo;
  
      let row = worksheet.addRow([j,result["cont_no"],result["size"],result["height"],result["iso"],result["iso_group"],result["freight_kind"],
                                  result["seal_nbr1"],result["mlo"],result["desti"],result["yard_No"],
                                  result["weight"],result["time_in"],result["timein"],result["remark"]
       ]);
    //  let color = 'FF99FF99';
      row.eachCell((cell,number)=>{
       cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
       cell.alignment={vertical:'middle',horizontal:'center'}
     });
     /*let row2 = worksheet.addRow(["Total","","","","","", "","","","","",weight,"","",""]);
     
      row2.eachCell((cell,number)=>{
       cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
       cell.alignment={vertical:'middle',horizontal:'center'}
     });*/
 

 }
   worksheet.getColumn(1).width = 10;
   worksheet.getColumn(2).width = 20;
   worksheet.getColumn(3).width = 10;
   worksheet.getColumn(4).width = 10;
   worksheet.getColumn(5).width = 10;
   worksheet.getColumn(6).width = 10;
   worksheet.getColumn(7).width = 10;
   worksheet.getColumn(8).width = 10;
   worksheet.getColumn(9).width = 10;
   worksheet.getColumn(10).width = 20;
   worksheet.getColumn(11).width = 10;
   worksheet.getColumn(12).width = 10;
   worksheet.getColumn(13).width = 25;
   worksheet.getColumn(14).width = 25;
   worksheet.getColumn(15).width = 10;
  
  
  // worksheet.getRow(1).outlineLevel=200;
  // worksheet.getRow(1).alignment={vertical:"middle",horizontal:"left"};
  



 workbook.xlsx.writeBuffer().then((data:any) => {
  let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob, 'FINALDISCHARGINGDETAIL.xlsx');
});




}


}
