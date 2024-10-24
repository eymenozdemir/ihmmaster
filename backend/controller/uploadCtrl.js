const stream = require("stream");
const path = require("path");
const { google } = require("googleapis");

const fs = require("fs");
const Blob = require('blob');
const asyncHandler = require("express-async-handler");

const KEYFILEPATH = path.join(__dirname, "cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});



const uploadFiles = asyncHandler(async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;
    let resData = [];
    for (const file of files) {
      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);
      const { data } = await google.drive({ version: "v3", auth }).files.create({
          media: {
              mimeType: file.mimeType,
              body: bufferStream,
          },
          requestBody: {
              name: file.originalname,
              parents: ["1Xm7r2msJfrOo4qCUgRaRYvsvOLT6lpFV"],
          },
          fields: "id,name,mimeType,webContentLink",
      });
      console.log(`Uploaded file ${data.name} ${data.id}`);
      resData = data;
    }
    
    res.json(resData);
  } catch (error) {
    throw new Error(error);
  }
});

const downloadFiles = asyncHandler(async (req, res) => {
  try {
    const fileID = req.body.fileId;
    console.log(fileID);
    const file = await google.drive({ version: "v3", auth }).files.get({
        fileId : fileID,
        alt: 'media',
        parents: ["1Xm7r2msJfrOo4qCUgRaRYvsvOLT6lpFV"]
    })
    //console.log(`Uploaded file ${data.name} ${data.id}`);
    
    console.log(file.status);
    res.json(file.status);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadFiles,
  downloadFiles,
};
