var app = module.parent.exports.app
  , Employees = require( '../models/employees.js' );

// Listar
app.get( '/', function (req, res) {
  res.redirect( '/list' )
})

app.get( '/list', function (req, res) {
  Employees.find({}, function (err, docs) {
    res.render( 'list', { title: "Listado de Empleados", employees: docs } )
  });
})

// Crear
app.get( '/employee/new', function (req, res) {
  res.render('new', { title: "Nuevo Personal" })
});

app.post( '/employee/new', function (req, res) {
  Employees.create( req.body, function (err, doc) {
    if (!err) {
      req.flash( "info", "El nuevo personal se ha creado correctamente" );
      res.redirect( '/list' );
    } else {
      res.end( err );
    }
  })
});


// Borrar
app.get( '/employees/delete/:id', function (req, res) {
  Employees.remove({ _id: req.params.id  }, function (err, doc) {
    if (!err) {
      req.flash( "info", "El personal se ha eliminado correctamente" );
      res.redirect( "/list" );
    } else {
      res.end(err);
    }
  })
});
