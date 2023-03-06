import google from 'googleapis';
import sheets from 'googleapis';
import express from 'express'
const app = express()
// const data = require('./report_data');
let auth,drive;
// auth = new google.auth.GoogleAuth({
//     keyFile: './scripting/keyfile_450_report.json',
//     scopes: ['https://www.googleapis.com/auth/drive'],
// });
// drive = google.drive({version: 'v3', auth});

/// tp = '1SemYXpvedwS1ElGCulwTf1-w6Z2XQ5Q6AfwyFaQR43w'
let check = async () => {
    const driveResponse = await drive.files.list({
        fields: '*',
    });
    return 12324
    // console.log(driveResponse.data.files);
}
const createText = async()=>{
    // const dv = google.drive({version:'v3',auth})
    const res = await drive.files.create({
        requestBody: {
          name: 'Test',
          mimeType: 'text/plain'
        },
        media: {
          mimeType: 'text/plain',
          body: '#include<bits/stdc++.h> using namespace std;'
        }
      })
    console.log(res.data)
    return res.data.id
}
const createSpreadsheet = async()=>{
    return sheets.spreadsheets.create({
        auth: auth,
        resource: {
          properties: {
            title: 'Attendance Report'
          }
        }
      }
  );
}

const updateSpreadsheet = async(spreadsheetId,data)=>{
    // console.log("id = ",spreadsheetId)
    console.log("in updatespreadsheet , id = ",spreadsheetId)
    console.log('in updatespreadsheet data = ',data)
    const client = await auth.getClient();
    const googleSheets = google.sheets({version:'v4',auth:client});
    
    //read rows from spreadsheet with sheet name Sheet1
    const result = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range:'Sheet1', 
    })

    


    //write
    let dates = []
    for(let i=0;i<data[0].length;i++){
      dates.push(data[0][i])
    }
    let summary = []
    for(let i = data[0].length - 3;i<data[0].length;i++)
      summary.push(data[0][i])
    const res = await googleSheets.spreadsheets.values.append({
        auth,spreadsheetId,range:'Sheet1!A1:A1',
        valueInputOption:'USER_ENTERED',
        resource:{
            values:[
                ['Registration No'],
            ]
        }
    })

    // console.log("data = ",data)
    // console.log(dates)
    await googleSheets.spreadsheets.values.append({
      auth,spreadsheetId,range:'Sheet1!B1:B1',
      valueInputOption:'USER_ENTERED',
      resource:{
          values:[
              dates,
          ]
      }
    })




    let attendList = []
    for(let i = 1; i < data.length; i++){
      attendList.push(data[i].slice(0,data[1].length))
    }
    console.log('attendList',attendList)
    for(let i = 0;i < attendList.length;i++){
      for(let j = 0;j<attendList[i].length;j++){
        if(attendList[i][j] == true)
          attendList[i][j] = '1'
        else if(attendList[i][j] == false)
          attendList[i][j] = '0';
      }
    }
    // attendList = JSON.stringify(attendList)
    console.log('attendlist = ',attendList)
    await googleSheets.spreadsheets.values.append({
      auth,spreadsheetId,range:'Sheet1!A2:A2',
      valueInputOption:'USER_ENTERED',
      resource:{
          values:attendList,
      }
    })  
    // console.log(res.data)
    // res.send(rows.data)
}
const generatePublicUrl = async (id) =>{
    try {
        const fileId = id;
        //change file permisions to public.
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
            role: 'writer',
            type: 'anyone',
            },
        });

        //obtain the webview and webcontent links
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
        });
      console.log(result.data);
      return result.data.webViewLink;
    } catch (error) {
      console.log(error.message);
    }
  }
const generateReport = async (data)=>{
  auth = new google.auth.GoogleAuth({
    keyFile: './scripting/keyfile_450_report.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  drive = google.drive({version: 'v3', auth});

    // val = 12;
    // console.log(val)
    // val = await check()
    // console.log(val)
    // let id = await createText(); 


    const  res = await createSpreadsheet()
    const spreadsheetId = res.data.spreadsheetId;
    console.log("spreadsheet ID: ",spreadsheetId)
    
    await updateSpreadsheet(spreadsheetId,data)
    const publicUrl = await generatePublicUrl(spreadsheetId)
    console.log("publicurl = ",publicUrl)
    return publicUrl
    // updateSpreadsheet('1SemYXpvedwS1ElGCulwTf1-w6Z2XQ5Q6AfwyFaQR43w');
    // console.log(await generatePublicUrl('1SemYXpvedwS1ElGCulwTf1-w6Z2XQ5Q6AfwyFaQR43w'))
}
// module.exports = generateReport;
export default generateReport;