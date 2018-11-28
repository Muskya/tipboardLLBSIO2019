var fetch = require('node-fetch');
var cpu;
var URLGetGlances = 'http://10.22.40.192:61208/api/3/';
var URLPostTipboard = 'http://10.22.40.192:7272/api/v0.1/78359fa056ba4a9b8d6288d525e27324/push'

GetPostCPU("baguette");

function GetPostCPU(itemCpu) {
    // GET //
    fetch('http://10.22.40.192:61208/api/3/cpu', {  
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
        }  
    })
    .then((resp) => resp.json()) 
    .then(function (resp) { 

        fetch(URLPostTipboard, {  
            method: 'POST', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },  
            body: 'tile=pie_chart&key=a1&data={"title": "CPU Values", "pie_data": [["idle", ' + resp.idle + '],\n\
                     ["system", ' +resp.system+ '], ["user", '+resp.user+']]}'
        })
        .then(function (data) {  
           console.log('Request success: ', data);  
        })  
        .catch(function (error) {  
            console.log('Request failure: ', error);  
        }); 

        //console.log('CPU Idle: ', resp.idle);  
    })  
    .catch(function (error) {  
        console.log('Request failure: ', error);  
    });}

    // POST //
    



