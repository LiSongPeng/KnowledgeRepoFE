var express = require ('express') ;
var path = require('path');
var app = express() ;

app.use(express.static (path.join(__dirname, 'components')));
app.use(express.static (path.join(__dirname, 'bower_components')));
app.set ('port', process.env.PORT || 14250) ;
app.use(express.static(path.join(__dirname, 'tpls')));
console.log(__dirname);
app.use(function (req , res){
    res.sendfile('./tpls/login.html')
});
module.exports = app ;