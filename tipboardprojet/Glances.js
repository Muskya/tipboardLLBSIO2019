var fetch = require('node-fetch');
var URL = 'http://10.22.40.192:61208/api/3/cpu';

fetch(URL, {  
    method: 'GET', 
    headers: {
        'Content-Type': 'application/json',
    }  
    //body: 'cpu'
})
 
.then((resp) => resp.json()) 
.then(function (resp) {  
  console.log('Request success: ', resp);  
})  

.catch(function (error) {  
  console.log('Request failure: ', error);  
});

