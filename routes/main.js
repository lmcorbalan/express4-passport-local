var app = module.parent.exports.app
  , Employees = require( '../models/employees.js' );

app.get( '/', function (req, res) {
  res.redirect( '/list' )
})

app.get( '/list', function (req, res) {
  Employees.find({}, function (err, docs) {
    res.render( 'list', { title: "Listado de Empleados", employees: docs } )
  });
})
