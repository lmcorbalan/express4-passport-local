var app = module.parent.exports.app
  , Employees = require( '../models/employees.js' );

app.get( '/', function (req, res) {
  console.log('/');
  res.render( 'index', { title: "Staff's Wiki" } )
})
