import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ContainerDischargeListAppService {
  ctgPortTitle="CHITTAGONG PORT AUTHORITY,CHITTAGONG";
  title:any = '       DISCHARGE CONTAINER';
  summaryTitle='Summery Report';
  balanceOnBoardTitle="IMPORT CONTAINER BALANCE ON BOARD LIST"
  header:any = ["SlNo","Container No", "ISO", "Type","Rotation","MLO","Status","Weight","POD","Current Position","Loaded Time","Coming From","Commodity","Remarks","User Id"];

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllContainerDischargeList(){
    return this.httpClient.get('http://192.168.16.243:8093/importReports/AllContainerDischargeAppList/'); 
  }
  getYardList(){
    
    return this.httpClient.get('http://192.168.16.243:8093/importReports/ContainerDischargeYardList/'); 
  }

  getVesselInfo(rotation:any){
    
    return this.httpClient.get('http://192.168.16.243:8093/importReports/ContainerDischargeAppVesselInfo/'+rotation);

  }

  getContainerDischargeList(rotation:any,searchBy:any,yard:any,formDate:any,toDate:any,fromTime:any,toTime:any){
    if(rotation==""){
      rotation="empty";
    }
    if(searchBy==""){
      searchBy="empty";
    }
    if(yard==""){
      yard="empty"
    }
    if(formDate==""){
      formDate="empty"
    }
    if(toDate==""){
      toDate="empty"
    }
    if(fromTime==""){
      fromTime="empty"
    }
    if(toTime==""){
      toTime="empty"
    }
   
     
    return this.httpClient.get('http://192.168.16.187:8081/importReports/ContainerDischargeAppList/'+rotation+"/"+searchBy+"/"+yard+"/"+formDate+"/"+toDate+"/"+fromTime+"/"+toTime); 
  }

  
  getContainerDischargeOnBoardSummary(rotation:any){
 
    return this.httpClient.get('http://192.168.16.187:8081/importReports/ContainerDischargeListAppOnBoardSummary/'+rotation);

  }
  getContainerDischargeBalanceSummary(rotation:any){
   
    return this.httpClient.get('http://192.168.16.187:8081/importReports/ContainerDischargeListAppBalanceSummary/'+rotation);

  }
  getVoyNo(rotation:any){
   
    return this.httpClient.get('http://192.168.16.187:8081/importReports/ContainerDischargeAppVoyNo/'+rotation);

  }
  getResultWithExcel(rotation:any,vesselInfo:any,contaninerDischargeList:any,containerOnBoardSummary:any,containerBalanceSummary:any,voyNo:any,containerDischargeTitle:any){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(' DISCHARGE CONTAINER');

    let portTitle=worksheet.addRow(["","",this.ctgPortTitle]);
    portTitle.alignment={ vertical: 'top', horizontal: 'left'};
    portTitle.font = {  size: 16, underline: 'single', bold: true };
    worksheet.addRow([]);

    let titleRow = worksheet.addRow(["","",containerDischargeTitle]);
    titleRow.alignment={ vertical: 'top', horizontal: 'left'};
    worksheet.addRow([]);

    titleRow.font = {  size: 16,  bold: true };
    let vesselName="";
    let voy="";
    let eta="";
    for(let vessel of vesselInfo){
      vesselName=vessel.vsl_name;
      eta=vessel.ata;
     }
     for(let res of JSON.parse(voyNo)){
      voy=res.voy_No;
    
     }
     let veseelInfoRow=worksheet.addRow(["","Vessel : " +vesselName,"     Voy No : "+voy,"Rotation : "+rotation ,"ETA : "+eta ]);
     veseelInfoRow.alignment={ vertical: 'top', horizontal: 'left'};
     veseelInfoRow.font = {   bold: true };
     worksheet.addRow([]);
     let j=0;
     let allContainer="";

     for(let result of  contaninerDischargeList ){
      allContainer=allContainer+result.id+",";
      j++;
      let row = worksheet.addRow([j,result["id"],result["iso"],result["type"],result["rotation"],
      result["mlo"],result["freight_kind"],result["weight"],result["pod"],
      result["current_position"],result["last_update"],result["coming_from"],result["short_name"],"",result["user_id"]]);
      let color = 'FF99FF99';
      row.eachCell((cell,number)=>{
       cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
       cell.alignment={vertical:'middle',horizontal:'center'}
     });
    

    }
    worksheet.addRow([]);
    let containerDsTitle=worksheet.addRow(["","",this.summaryTitle]);
     containerDsTitle.alignment={ vertical: 'top', horizontal: 'left'};
     containerDsTitle.font = {  size: 16,  bold: true };
     worksheet.addRow([]);

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
     worksheet.addRow([]);
     worksheet.addRow([]);
     
     worksheet.addRow([]);
     let summaryTitle=worksheet.addRow(["","","TOTAL ONBOARD","","","","","","BALANCE TO LOAD","","",""]);
     summaryTitle.eachCell((cell,number)=>{
       cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
       cell.alignment={vertical:'middle',horizontal:'center'}
     });

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
     let SummaryData=worksheet.addRow([containerOnBoardSummary[0].onboard_LD_20,containerOnBoardSummary[0].onboard_LD_40,
      containerOnBoardSummary[0].onboard_MT_20,containerOnBoardSummary[0].onboard_MT_40,containerOnBoardSummary[0].onboard_LD_tues,
      containerOnBoardSummary[0].onboard_MT_tues, containerBalanceSummary[0].balance_LD_20,containerBalanceSummary[0].balance_LD_40,
      containerBalanceSummary[0].balance_MT_20,containerBalanceSummary[0].balance_MT_40,containerBalanceSummary[0].balance_LD_tues,
      containerBalanceSummary[0].balance_MT_tues]);
  SummaryData.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });
  let totalCotainerTitleRow=worksheet.addRow(["","","","","","","Cotainers ","","","","","","","",""]);
  totalCotainerTitleRow.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });
  let totalCotainer=worksheet.addRow(["","","","","","",allContainer,"","","","","","","",""]);
  totalCotainer.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });

  workbook.xlsx.writeBuffer().then((data:any) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, 'containerDischargeListApp.xlsx');
  });
  
  }
  

}
