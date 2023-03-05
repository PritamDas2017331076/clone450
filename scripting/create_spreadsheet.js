const {google} = require('googleapis');
const sheets = google.sheets('v4');
const express = require('express')
const path = require('path')
const app = express()

const auth = new google.auth.GoogleAuth({
    keyFile: './scripting/keyfile_450_report.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
});
const drive = google.drive({version: 'v3', auth});

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
    let res = await sheets.spreadsheets.create({
        auth: auth,
        resource: {
          properties: {
            title: 'Title of your new spreadsheet'
          }
        }
      }
    //   , (err, response) => {
    //     if (err) {
    //       console.log(`The API returned an error: ${err}`);
    //       return;
    //     }
      
    //     console.log('Created a new spreadsheet:')
    //     console.log(response.data.spreadsheetId);
    //     return response.data.spreadsheetId;
    //   }
      );
      console.log(res)
}
const updateSpreadsheet = async(spreadsheetId)=>{
    // console.log("id = ",spreadsheetId)
    const client = await auth.getClient();
    const googleSheets = google.sheets({version:'v4',auth:client});
    
    //read rows from spreadsheet with sheet name Sheet1
    const result = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range:'Sheet1', 
    })
    
    //write
    const res = await googleSheets.spreadsheets.values.append({
        auth,spreadsheetId,range:'Sheet1',
        valueInputOption:'USER_ENTERED',
        resource:{
            values:[
                ['foo'],
                ['moo']
            ]
        }
    })
    console.log(res.data)
    // res.send(rows.data)
}
const generatePublicUrl = async(id){
    try {
        const fileId = id;
        //change file permisions to public.
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
            role: 'reader',
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
var res = async ()=>{
    val = 12;
    console.log(val)
    val = await check()
    console.log(val)
    // let id = await createText(); 
    const  spreadsheetId = await createSpreadsheet()
    // console.log("spread ",spreadsheetId)
    // console.log("spreAD ",spreadsheetId)
    // await updateSpreadsheet(spreadsheetId)

    // const publicUrl = await generatePublicUrl(spreadsheetId)
    // console.log("publicurl = ",publicUrl)
}
res()