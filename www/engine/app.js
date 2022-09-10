var app=angular.module('obicwallet', ['ionic','chart.js','ionic.native','monospaced.qrcode', 'ngCordova', 'ngStorage','ngFileUpload'])
.constant('Config', {  
    API:'https://obictrade.com/api/',
    media:'https://storage.googleapis.com/obicstorage/',
    token:"eyJhbGciOiJIUzI1NiJ9.eyJTZWNyZXQiOiJ0cmFkZW9iaWNAZ21haWwuY29tIiwiSXNzdWVyIjoiSXNzdWVyIiwiZXhwIjoxNjUxODUyMjU4LCJpYXQiOjE2NTE4NTIyNTh9.WsvtTMfX4KQJW3wveHc7q5khQQtVCqxQpjJFzjBjR6A"
  })