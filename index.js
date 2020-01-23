const express = require('express')
const app= express();
const bodyParser = require('body-parser');
const fs= require('fs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static/', express.static('public'));// alle Statischen elemente der app in das Verzeichniss Static. alle Bilder hier
app.use('/bilder/', express.static('public')); //Verzeichniss für die bilder

/**
 * Hier kommen die routen für alle html verbindungen rein welche der webserver zulässt
 **/
app.get('/bilder/icecream2.png',function (request, response) { //das eiscrembild
 response.sendfile("./bilder/icecream2.png");   
 });
app.get('/',function (request, response) { //index.html seite
 response.sendfile("./static/index.html");   
 });
app.get('/static/eiscremliste.txt',function(request,response){ //Die liste der Eiscremsorten

    response.sendfile("./static/eiscremliste.txt");
}
);

app.post('/', function (request, response) {  //wird aufgerufen wenn ein neuer Post gemacht wird
    if(!typeof(request.body.Lieblingseis)!== 'undefined' ){//kein richtiger request abgesendet
        if(request.body.Lieblingseis==""){
            response.sendfile("./static/index.html");
            return; //fange fehler mit leeren inhalt ab;
        }
    console.log('Habe einen Post Request mit inhalt: '+request.body.Lieblingseis+' bekommen');
    fs.appendFile('./static/eiscremliste.txt',request.body.Lieblingseis+"\n" , (err) => { //logge die Eiscreme oder den Fehler
    if (err) throw err;
  console.log('Die neue Lieblingseiscrem wurde hinzugefügt');
});
    }
  response.sendfile("./static/index.html"); //sende html datei zum auffrischen 
 
})

app.listen(3000,function () {
    console.log('Example app listening on port 3000!');
});


