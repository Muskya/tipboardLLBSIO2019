var fetch = require('node-fetch');
//var URLPostTipboard = 'http://10.22.40.192:7272/api/v0.1/78359fa056ba4a9b8d6288d525e27324/push'

initSession();

function initSession(){ // Fonction qui va retourner le session token pour pouvoir exécuter les requêtes
    fetch('http://172.16.150.140/gestionparc/apirest.php/initSession', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'App-Token': 'yy9cn4qp93jgkuj6fco3e03cjs0c83e2rwdvsf6r',
            'Authorization': 'user_token aswdxe6ubl78dyodjnv0l4zugp270jpgznq6bb9t',
        }
    })
    .then((resp) => resp.json())
    .then(function (resp) { 
        sessionToken = resp;
        console.log("resp", resp.session_token);
        ticketsResolusAnnee(resp.session_token);
    })
}

function ticketsResolusAnnee(sessionToken) { // Fonction qui va retourner le nombre d'incidents résolus durant l'année
    parameters = {
            'criteria[0][field]': '12', // Champs sur lequel on ajoute la condition, 12 correspond à l'état d'avancement de l'incident
            'criteria[0][searchtype]': 'equals', // Type de recherche
            'criteria[0][value]': '5', // Valeur que le champ 12 doit contenir, 5: ticket résolu
            'criteria[1][link]': 'OR',
            'criteria[1][field]': '12',
            'criteria[1][searchtype]': 'equals',
            'criteria[1][value]': '6', // 6: ticket clos
            'criteria[2][link]': 'AND',
            'criteria[2][field]': '19', // Champ 18: Date de dernière modification
            'criteria[2][searchtype]': 'contains',
            'criteria[2][value]': '2018',
        }
    fetch('http://172.16.150.140/gestionparc/apirest.php/search/Ticket?'+parameters+'', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'App-Token': 'yy9cn4qp93jgkuj6fco3e03cjs0c83e2rwdvsf6r',
          'Session-Token': sessionToken,  
        }
    })
    .then((resp) => resp.json())
    .then(function (resp) {
        console.log("RESULTAT", resp);
        fetch(URLPostTipboard, {  
            method: 'POST', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },  
            body: 'tile=text&key=b1&data={"title": "Tickets GLPI", "text": '+resp.totalcount+'}'
        })
        .then(function (data) {  
           //console.log('Request success: ', data);  
        })  
        .catch(function (error) {  
            console.log('Request failure: ', error);  
        }); 

        //console.log('CPU Idle: ', resp.idle);  
    })  
    .catch(function (error) {  
        console.log('Request failure: ', error);  
    })
}
    
function ticketsAttente(sessionToken) { // Fonction qui va retourner le nombre d'incidents résolus durant l'année
    parameters = {
            'criteria[0][field]': '12', 
            'criteria[0][searchtype]': 'equals',
            'criteria[0][value]': '4', // 4: ticket en attente
        }
    fetch('http://172.16.150.140/gestionparc/apirest.php/search/Ticket?'+parameters+'', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'App-Token': 'yy9cn4qp93jgkuj6fco3e03cjs0c83e2rwdvsf6r',
          'Session-Token': sessionToken,  
        }
    })
}