var express = require ('express') ;
var path = require('path');
var app = express() ;
// var router = require('./routes/index');

app.use(express.static (path.join(__dirname, 'components')));
app.use(express.static (path.join(__dirname, 'bower_components')));
app.set ('port', process.env.PORT || 14250) ;
app.use(express.static(path.join(__dirname, 'tpls')));

app.use('/',function (req,res,next) {
    res.sendfile("./tpls/index.html");
});
module.exports = app ;