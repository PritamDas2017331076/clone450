const express = require('express')
const { auth } = require('google-auth-library')
const {google, GoogleApis} = require('googleapis')
const path = require('path')
const app = express()

app.get('/',async (req,res)=>{
    ///crediantials.json is a service account created from console.cloud.google.com
    const auth = new google.auth.GoogleAuth({
        keyFile:'scripting/credentials.json',
        scopes:"https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    
    const googleSheets = google.sheets({version:'v4',auth:client});
    ///spreadsheetId in which we want to work, The spreadsheet also has to be shared with edit option to the service account
    // const spreadsheetId='1BleiZl4YTqD2rmCfTtWJoTa_XUbmBWnVHzo5_KLXst4';
    const spreadsheetId = '1LL83iVn_ZYKxgxZkbJAC2A16Of88OuOUy75e6Qrf-eo';
    // const metadata = await googleSheets.spreadsheets.get({auth,spreadsheetId}); 
    // res.send(metadata.data) 
    
    //read rows from spreadsheet with sheet name Sheet1
    const result = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range:'Form Responses 1', 
    })
    res.send(result.data.values)
    ///read from another sheet within the same spreadsheet
    // const rows2 = await googleSheets.spreadsheets.values.get({auth,spreadsheetId,range:'July'})
    // console.log('rows1 = ',rows.data)
    // console.log('rows2 = ',rows2.data)
    
    //write
    // await googleSheets.spreadsheets.values.append({
    //     auth,spreadsheetId,range:'July',
    //     valueInputOption:'USER_ENTERED',
    //     resource:{
    //         values:[
    //             ['foo'],
    //             ['moo']
    //         ]
    //     }
    // })
    // res.send(rows.data)
})

app.listen(1234,(req,res)=>{
    console.log("Running on port 1234")
})
