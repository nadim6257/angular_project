import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workbook } from 'exceljs';
import * as fs  from 'file-saver';
import { parse } from 'path';

@Injectable({
  providedIn: 'root'
})
export class MloDischargeSummaryListService {
  ctgPortTitle="CHITTAGONG PORT AUTHORITY,CHITTAGONG";

  constructor(
    private httpClient: HttpClient
  ) { }
  getAgentList(rotation:any){
    if(rotation==""){
      rotation="empty";
    }
    return this.httpClient.get('http://192.168.16.243:8093/importReports/MloDischargeSummaryAgentList/'+rotation); 
  }
  getMloList(orgId:any){
    if(orgId==""){
      orgId="empty";
    }
    return this.httpClient.get('http://192.168.16.243:8093/importReports/MloDischargeSummaryMloList/'+orgId); 
  }
  getIgmInfo(rotation:any){
    if(rotation==""){
      rotation="empty";
    }
    return this.httpClient.get('http://192.168.16.243:8093/importReports/MloDischargeSummaryIgmInfo/'+rotation); 
  }
  getDateInfo(rotation:any){
    if(rotation==""){
      rotation="empty";
    }
    return this.httpClient.get('http://192.168.16.243:8093/importReports/MloDischargeSummaryDateInfo/'+rotation); 
  }
  getMloDischargeSummaryList(rotation:any,orgId:any,mlo:any){
    if(rotation==""){
      rotation="empty";
    }
    if(orgId==""){
      orgId="empty";
    }
    if(mlo==""){
      mlo="empty"
    }
    return this.httpClient.get('http://192.168.16.187:8081/importReports/MloDischargeSummaryList/'+rotation+"/"+orgId+"/"+mlo); 
  }
  getSummaryListWithExcel(igmInfo:any,dateInfo:any,summaryList:any,rotation:any,mlo:any){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Mlo Discharge Summary List');

    let portTitle=worksheet.addRow([this.ctgPortTitle]);
    portTitle.alignment={ vertical: 'top', horizontal: 'left'};
    portTitle.font = {  size: 16, underline: 'single', bold: true };
    worksheet.addRow([]);
    let organizationName="";
    let vesselName="";
    let voyNo="";
    let importRotationNo="";
    let etaDate="";
    let etdDate="";
    for(let res of JSON.parse(igmInfo)){
      organizationName=res.organization_Name;
      vesselName=res.vessel_Name;
      voyNo=res.voy_No;
      importRotationNo=res.import_Rotation_No;

    }
    for(let res of JSON.parse(dateInfo)){
      etaDate=res.eta_Date;
      etdDate=res.etd_Date;

    }
    let agentTitle = worksheet.addRow(["Agent : "+ organizationName]);
    agentTitle.alignment={ vertical: 'top', horizontal: 'left'};
     worksheet.addRow([]);
     let orgTitle = worksheet.addRow(["Organization Name : "+ organizationName]);
     orgTitle.alignment={ vertical: 'top', horizontal: 'left'};
     worksheet.addRow([]);

    let mloName = worksheet.addRow(["Mlo : "+ mlo]);
    mloName.alignment={ vertical: 'top', horizontal: 'left'};
    worksheet.addRow([]);
    if(vesselName==null){
      vesselName="";
    }
    let vessel = worksheet.addRow(["Vessel : "+ vesselName]);
    vessel.alignment={ vertical: 'top', horizontal: 'left'};
    worksheet.addRow([]);
    let rotationAndVoy = worksheet.addRow(["Voyage No: : "+voyNo,"Cust Rot No: "+rotation ]);
    rotationAndVoy.alignment={ vertical: 'top', horizontal: 'left'};
    worksheet.addRow([]);
    let date = worksheet.addRow(["ETA : "+etaDate,"ETD : "+etdDate ]);
    date.alignment={ vertical: 'top', horizontal: 'left'};
    worksheet.addRow([]);
    worksheet.addRow([]);
    let title = worksheet.addRow(["Container","","CL","","Nos.of cont.","","","Gross weight","","" ]);
    title.alignment={ vertical: 'top', horizontal: 'left'};
    title.font = {   bold: true };
    title.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });
    let subTitle = worksheet.addRow(["Size","Type","CL","Full","MT","Total","Full","NET","MT","Total" ]);
    subTitle.alignment={ vertical: 'top', horizontal: 'center'};
    subTitle.eachCell((cell,number)=>{
      cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
      cell.alignment={vertical:'middle',horizontal:'center'}
    });

    let total1=0;
    let total2=0;
    let total3=0;
    let total4=0;
    let total5=0;
    let total6=0;
    let total7=0;
    let total9=0;
    let total8=0;
    let total10=0;
    let total11=0;
    let total12=0;
    let total13=0;
    let total14=0;
    let total15=0;
  

   
   let row=summaryList[0];
   let row2=summaryList[1];
   let row3=summaryList[2];
   let row4=summaryList[3];
   let row5=summaryList[4];
   let row6=summaryList[5];
   let row7=summaryList[6];
   let row8=summaryList[7];
   let row9=summaryList[8];
   let row10=summaryList[9];
   let row11=summaryList[10];
   let row12=summaryList[11];
   let row13=summaryList[12]; 
   let row14=summaryList[13];
   let row21=summaryList[14];
   let row22=summaryList[15];
   let row23=summaryList[16];
   let row24=summaryList[17];
   let row25=summaryList[18];
   let row26=summaryList[19];
   let row27=summaryList[20];
   let row110=summaryList[21];
   let row120=summaryList[22];
   let row260=summaryList[23];

  total1=row.number+row3.number+row5.number+row7.number+row9.number+row11.number;
  total2=row2.number+row4.number+row6.number+row8.number+row10.number+row12.number;
  total3=row21.number+row22.number+row23.number+row24.number+row25.number+row260.number
  total4=row.number+row3.number+row5.number+row7.number+row9.number+row11.number;
  total5=row2.number+row4.number+row6.number+row8.number+row10.number+row12.number;
  total6=row21.number+row22.number+row23.number+row24.number+row25.number+row260.number;
  total7=row.net_weight+row3.net_weight+row5.net_weight+row7.net_weight+row9.net_weight;
  total8=row2.net_weight+row4.net_weight+row6.net_weight+row8.net_weight+row10.net_weight;
  total10=row.gross_weight+row3.gross_weight+row5.gross_weight+row7.gross_weight+row9.gross_weight;
  total11=row2.gross_weight+row4.gross_weight+row6.gross_weight+row8.gross_weight+row10.gross_weight;
  total13=row.gross_weight+row3.gross_weight+row5.gross_weight+row7.gross_weight+row9.gross_weight;
  total14=row2.gross_weight+row4.gross_weight+row6.gross_weight+row8.gross_weight+row10.gross_weight;
  total9=row21.net_weight+row22.net_weight+row23.net_weight+row24.net_weight+row25.net_weight;
  total12=row21.gross_weight+row22.gross_weight+row23.gross_weight+row24.gross_weight+row25.gross_weight;
  total15=row21.gross_weight+row22.gross_weight+row23.gross_weight+row24.gross_weight+row25.gross_weight;

  let rowTitle = worksheet.addRow(["","","FCL",row.number,"",row.number,row.net_weight,row.gross_weight,"",row.gross_weight]);
  rowTitle.alignment={ vertical: 'top', horizontal: 'left'};
  rowTitle.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });
 
  let row3Title = worksheet.addRow(["","","LCL",row3.number,"",row3.number,row.net_weight,row.gross_weight,"",row.gross_weight]);
  row3Title.alignment={ vertical: 'top', horizontal: 'left'};
  row3Title.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });

  

  let row5Title = worksheet.addRow(["","","EMPTY","",row5.number,row5.number,"","",row5.net_weight,row5.net_weight]);
  row5Title.alignment={ vertical: 'top', horizontal: 'left'};
  row5Title.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });

  

  let row7Title = worksheet.addRow(["","","ICD",row7.number,"",row7.number,row7.net_weight,row7.gross_weight,"",row7.gross_weight]);
  row7Title.alignment={ vertical: 'top', horizontal: 'left'};
  row7Title.eachCell((cell,number)=>{
    cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
    cell.alignment={vertical:'middle',horizontal:'center'}
  });



let row9Title = worksheet.addRow(["","Normal","TRANS",row9.number,"",row9.number,row9.net_weight,row9.gross_weight,"",row9.gross_weight]);
row9Title.alignment={ vertical: 'top', horizontal: 'left'};
row9Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});


let row110Title = worksheet.addRow(["","REFFER","REFR",row110.number,"",row11.number+row110.number,row11.net_weight+row110.net_weight,row11.gross_weight+row110.gross_weight,"",row11.gross_weight+row110.gross_weight]);
row110Title.alignment={ vertical: 'top', horizontal: 'left'};
row110Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});


let row13Title = worksheet.addRow(["","IMDG","IMDG",row13.number,"",row13.number,row13.net_weight,row13.gross_weight,"",row13.gross_weight]);
row13Title.alignment={ vertical: 'top', horizontal: 'left'};
row13Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});

let total1Title = worksheet.addRow(["20","Subtotal","",total1,"",total4,total7,total10,"",total13]);
total1Title.alignment={ vertical: 'top', horizontal: 'left'};
total1Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});



let row2Title = worksheet.addRow(["","","FCL",row2.number,"",row2.number,row2.net_weight,row2.gross_weight,"",row2.gross_weight]);
row2Title.alignment={ vertical: 'top', horizontal: 'left'};
row2Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});



let row4Title = worksheet.addRow(["","","LCL",row4.number,"",row4.number,row4.net_weight,row4.gross_weight,"",row4.gross_weight]);
row4Title.alignment={ vertical: 'top', horizontal: 'left'};
row4Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});



          let row6Title = worksheet.addRow(["","","EMPTY","",row6.number,row6.number,"","",row6.net_weight,row6.net_weight]);
          row6Title.alignment={ vertical: 'top', horizontal: 'left'};
          row6Title.eachCell((cell,number)=>{
            cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
            cell.alignment={vertical:'middle',horizontal:'center'}
          });


          let row8Title = worksheet.addRow(["","","ICD",row8.number,"",row8.number,row8.net_weight,row8.gross_weight,"",row8.gross_weight]);
row8Title.alignment={ vertical: 'top', horizontal: 'left'};
row8Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});



let row10Title = worksheet.addRow(["","Normal","TRANS",row10.number,"",row10.number,row10.net_weight,row10.gross_weight,"",row10.gross_weight]);
row10Title.alignment={ vertical: 'top', horizontal: 'left'};
row10Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});

let row12120Title = worksheet.addRow(["","REFFER","REFR",row120.number,row12.number,row12.number+row120.number,row12.net_weight+row120.net_weight,"",row12.gross_weight+row120.gross_weight]);
row12120Title.alignment={ vertical: 'top', horizontal: 'left'};
row12120Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});



let row14Title = worksheet.addRow(["","IMDG","IMDG",row14.number,"",row14.number,row14.net_weight,row14.gross_weight,"",row14.gross_weight]);
row14Title.alignment={ vertical: 'top', horizontal: 'left'};
row14Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});

let total2Title = worksheet.addRow(["40","Subtotal","",total12,"",total15,total8,total11,"",total14]);
total2Title.alignment={ vertical: 'top', horizontal: 'left'};
total2Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});



let row21Title = worksheet.addRow(["","","FCL",row21.number,"",row21.number,row21.net_weight,row21.gross_weight,"",row21.gross_weight]);
row21Title.alignment={ vertical: 'top', horizontal: 'left'};
row21Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});



let row22Title = worksheet.addRow(["","","LCL",row22.number,"",row22.number,row22.net_weight,row22.gross_weight,"",row22.gross_weight]);
row22Title.alignment={ vertical: 'top', horizontal: 'left'};
row22Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});


let row23Title = worksheet.addRow(["","","EMPTY","",row23.number,row23.number,"","",row23.net_weight,row23.net_weight]);
row23Title.alignment={ vertical: 'top', horizontal: 'left'};
row23Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});


let row24Title = worksheet.addRow(["","","ICD",row24.number,"",row24.number,row24.net_weight,row24.gross_weight,"",row24.gross_weight]);
row24Title.alignment={ vertical: 'top', horizontal: 'left'};
row24Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});



let row25Title = worksheet.addRow(["","Normal","TRANS",row25.number,"",row25.number,row25.net_weight,row25.gross_weight,"",row25.gross_weight]);
row25Title.alignment={ vertical: 'top', horizontal: 'left'};
row25Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});



let row26260Title = worksheet.addRow(["","REFFER","REFR",row26.number,row260.number,row26.number+row260.number,row26.net_weight+row260.net_weight,"",row26.gross_weight+row260.gross_weight]);
row26260Title.alignment={ vertical: 'top', horizontal: 'left'};
row26260Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
cell.alignment={vertical:'middle',horizontal:'center'}
});



let row27Title = worksheet.addRow(["","IMDG","IMDG",row27.number,"",row27.number,row27.net_weight,row27.gross_weight,"",row27.gross_weight]);
row27Title.alignment={ vertical: 'top', horizontal: 'left'};
row27Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});

let total3Title = worksheet.addRow(["45","Subtotal","",total3,"",total6,total9,total12,"",total15]);
total3Title.alignment={ vertical: 'top', horizontal: 'left'};
total3Title.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});

let finalTotal = worksheet.addRow(["Total","","",total1+total2+total3,"",total2+total4+total6,total7+total8+total9,total10+total11+total12,"",total13+total14+total15]);
finalTotal.alignment={ vertical: 'top', horizontal: 'left'};
finalTotal.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});
let lastRow = worksheet.addRow(["Others Cargo","","","","","","","","",""]);
lastRow.alignment={ vertical: 'top', horizontal: 'left'};
lastRow.eachCell((cell,number)=>{
  cell.border={ top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
  cell.alignment={vertical:'middle',horizontal:'center'}
});


    worksheet.getColumn(1).width = 50;
    worksheet.getColumn(2).width = 25;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(7).width = 20;
    worksheet.getColumn(8).width = 20;
    worksheet.getColumn(9).width = 20;
    worksheet.getColumn(10).width =20;
   

 
    workbook.xlsx.writeBuffer().then((data:any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'mloDischargeSummaryList.xlsx');
    });


  }
}
