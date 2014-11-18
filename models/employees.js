var mongoose = require( 'mongoose' )
  , Schema   = mongoose.Schema;

var employeeSchema = new Schema({
  name: String,
  age : Number
});

/**
* Employees.create(data, function(){}):
*/
employeeSchema.static.create = function (data, cb) {
  var Employees = this; // Esto se hace siempre que se haga un metodo estatico para fijar el scope

  var e = new Employees({
    name: data.name,
    age : data.age
  });

  e.save( cb );
}

var employeeModel = mongoose.model( "Employees", employeeSchema );
module.exports   = employeeModel;
