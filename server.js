var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/html'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(methodOverride());



var mongoose = require('mongoose');

// Conexión con la base de datos
mongoose.connect('mongodb://cycleit:cycleit@ds055709.mongolab.com:55709/cycleitapp');


// Definición de Schema/modelos

var ticketsSchema = new mongoose.Schema({
    subject: String ,
    datetime: Date ,
    description:  String ,
    username: String ,
    level: String,
    summary:  String
});



var ticket = mongoose.model('ticket', ticketsSchema);

app.listen(process.env.PORT || 5000, function () {
    console.log("Node server running on http://localhost:5000");
});










// Rutas de nuestro API
// GET de todos los Tickets
app.get('/api/tickets', function (req, res) {
    


    ticket.find(function (err, tickets) {
        if (err) {
            res.send(err);
        }
        res.json(tickets);
    });
});


// Rutas de nuestro API
// GET de todos los Tickets
app.get('/api/ticket/:ticket', function (req, res) {
    
    
    ticket.findById(req.params.ticket, function (err, ticket) {
        if (err) {
            res.send(err);
        }
        res.json(ticket);
    });
    

});




// POST que crea un TODO y devuelve todos tras la creación
app.post('/api/tickets', function (req, res) {
    console.log(req.body);
    ticket.create({
        username: req.body.username,
        datetime: req.body.datetime,
        description: req.body.description,
        level: req.body.level,
        done: false
    }, function (err, ticket) {
        if (err) {
            res.send(err);
        }
        
        
        res.json(ticket);
       
    });
});


app.post('/api/tickets/:id', function (req, res) {
    
    ticket.update({
        
        username: req.body.username,
        datetime: req.body.datetime,
        description: req.body.description,
        level: req.body.level,
        done: false
    }, function (err, ticket) {
        if (err) {
            res.send(err);
        }
        
        
        res.json(ticket);
       
    });
});



// DELETE un TODO específico y devuelve todos tras borrarlo.
app.delete('/api/tickets/:ticket', function(req, res) {
    ticket.remove({
        _id: req.params.ticket
    }, function (err, ticket) {
        if (err) {
            res.send(err);
        }
        

        res.json(ticket);
    })
});


//rutas



app.get('/', function(req, res) {
    res.sendfile('./html/index.html');
});

app.get('/NewTicket', function (req, res) {
    res.sendfile('./html/NewTicket.html');
});

app.get('/UpdateTicket', function (req, res) {
    res.sendfile('./html/UpdateTicket.html');
});



app.get('/UpdateTicket/:id', function (req, res) {
    res.sendfile('./html/UpdateTicket.html');
});



