// NodeJS + Express REST API for accessing Sun keyboard scan code data (and corresponding USB codes)

//  TODO: 
//    Define routes that return sample data

/**
  /


 **/
// add code here
var express = require('express');
var app = express();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('scancodedb');

//  UTILITIES

function stripLeadingColon(str) {
  return str.replace(/^:/, "");
}

app.listen(3000, function(){
     console.log('SunScanCodes Server is listening on port 3000. Starting.');
 });

//  ENDPOINTS

app.get('/', function(request, response){
     response.send('Welcome to Sun Scan Codes. Please select from the following.');
 });

app.get('/codes', function(request, response){
  db.all("SELECT * FROM ScanCode ORDER BY SunCode",
    function(err, rows){
      console.log("GET codes: all codes... " + rows);
      
      response.send(rows);
    }
  )
 });

app.get('/suncode:suncode', function(request, response){
  console.log("request.params.suncode == " + request.params.suncode );
  var stripstring = stripLeadingColon(request.params.suncode);
  db.all("SELECT * FROM ScanCode WHERE SunCode = ?", stripstring,
    function(err, rows){      
      response.send(rows);
    }
  )
 });

app.get('/create', function(request, response){
     response.send('This function will create a new scan code. Provide: SunCode, USBcode, name, note (optional)');
 });

app.get('/update', function(request, response){
     response.send('This function will update an existing scan code. Provide: SunCode, USBcode, name, note (optional)');
 });

app.get('/delete', function(request, response){
     response.send('This function will remove a scan code');
 });

app.post('/quotes', function(request, response) {
  db.run("INSERT INTO Quotes VALUES ?", req.body)
});
  
  
