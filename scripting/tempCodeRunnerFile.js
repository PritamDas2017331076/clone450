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
    googleSheets.spreadsheets.create({
        auth:auth,
        resource:{
            properties: {
                title: 'Title of your new spreadsheet'
            }
        }
    })
    res.send("SPreadsheet created")
})

app.listen(1234,(req,res)=>{
    console.log("Running on port 1234")
})
