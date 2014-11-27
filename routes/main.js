var app = module.parent.exports.app
  , Employees = require( '../models/employees.js' );

// Metodo interceptor
var userAuth = function (req, res, next) {
  //authorized role
  if (typeof req.user != "undefined") {
    next()
  } else {
    //not authorized...redirect
    req.flash( 'error', 'Seccion no autorizada' );
    res.redirect('/')
  }

}

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
})

// Login
app.get( '/', function (req, res) {
  res.redirect( '/login' )
})

// Listar
app.get( '/list', userAuth, function (req, res) {
  Employees.find({}, function (err, docs) {
    res.render( 'list', { title: "Listado de Empleados", employees: docs } )
  });
})

// Crear
app.get( '/employee/new', userAuth, function (req, res) {
  res.render('new', { title: "Nuevo Personal" })
});

app.post( '/employee/new', userAuth, function (req, res) {
  Employees.create( req.body, function (err, doc) {
    if (!err) {
      req.flash( "info", "El nuevo personal se ha creado correctamente" );
      res.redirect( '/list' );
    } else {
      res.end( err );
    }
  })
});


// Editar
app.get( '/employee/edit/:id', userAuth, function (req, res) {
  Employees.findOne({ _id: req.params.id }, function (err, doc) {
    if (!err) {
      res.render( 'edit', { title: 'Editar Personal', employee: doc } );
    } else {
      res.end( err );
    }
  });
});

app.post( '/employee/edit/:id', userAuth, function (req, res) {
  Employees.update(
    { _id: req.params.id },
    { $set: { name: req.body.name, age:req.body.age } },
    function (err) {
      if ( !err ) {
        req.flash( "info", "La persona se ha modificado correctamente" );
        res.redirect( '/listar' );
      } else {
        res.end( err );
      }
  });
});

// Borrar
app.get( '/employee/delete/:id', userAuth, function (req, res) {
  Employees.remove({ _id: req.params.id  }, function (err, doc) {
    if (!err) {
      req.flash( "info", "El personal se ha eliminado correctamente" );
      res.redirect( "/list" );
    } else {
      res.end(err);
    }
  })
});

