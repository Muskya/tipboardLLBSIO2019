var fetch = require('node-fetch');
var URLGetGlances = 'http://10.22.40.192:61208/api/3/';
var URLPostTipboard = 'http://10.22.40.192:7272/api/v0.1/78359fa056ba4a9b8d6288d525e27324/push'
var usedMem = 0;
var usedMemswap = 0;

GetPostCPU();
GetPostMem();
GetPostMemSwap();
GetPostMachine();

function GetPostMachine() {
    fetch('http://10.22.40.192:61208/api/3/system', {  
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
            
            body: 'tile=fancy_listing&key=a1&data=[{"label":"OS", "text": "' + resp.os_name + '", "description": "' + resp.linux_distro + '"},\n\
                                                   {"label":"SERVEUR", "text": "' + resp.hostname + '", "description": "LXContainer"},\n\
                                                   {"label":"ADRESSE", "text": "10.22.40.192", "description": "LLB"}]'
        })
        
        fetch("http://10.22.40.192:7272/api/v0.1/78359fa056ba4a9b8d6288d525e27324/tileconfig/a1", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                
            },
            body: 'value={"vertical-center": true,\n\
                          "1": {"label_color": "red", "center": false},\n\
                          "2": {"label_color": "green", "center": false},\n\
                          "3": {"label_color": "blue", "center": false}}'
        })
        
        .then(function (data) {  
           console.log('Request success: ', data);  
        })  
        .catch(function (error) {  
            console.log('Request failure: ', error);  
        }); 
    })  
    .catch(function (error) {  
        console.log('Request failure: ', error);  
    });
}

function GetPostCPU() {
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
            body: 'tile=pie_chart&key=a2&data={"title": "Valeurs CPU", "pie_data": [["idle", ' + resp.idle + '],\n\
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

function GetPostMem() {
    // GET //
    fetch('http://10.22.40.192:61208/api/3/mem', {  
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
            body: 'tile=listing&key=a3&data={"title": "Mémoire", "items": ["Totale: ' 
                    + Math.round(resp.total/1000000) + ' Mo", "Libre: ' + Math.round(resp.free/1000000) + ' Mo", "Utilisée: ' 
                    + Math.round(resp.used/1000000) + ' Mo"]}'
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

function GetPostMemSwap() {
    // GET //
    fetch('http://10.22.40.192:61208/api/3/memswap', {  
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
            body: 'tile=listing&key=a4&data={"title": "Mémoire", "items": ["Totale: ' 
                    + Math.round(resp.total/1000000) + ' Mo", "Libre: ' + Math.round(resp.free/1000000) + ' Mo", "Utilisée: ' 
                    + Math.round(resp.used/1000000) + ' Mo"]}'
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
    



