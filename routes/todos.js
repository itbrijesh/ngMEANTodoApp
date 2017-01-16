var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://user:password@ds163738.mlab.com:63738/meantodos_dev', ['todos']);

// Get all todos
router.get('/todos', function( req, res, next ) {
    db.todos.find( function( error, todos ) {
        if(error) {
            res.send( error );
        }
        else {
            res.json( todos );
        }
    } );
})

// Get todo by id
router.get( '/todo/:id' , function( req, res, next ) {
    db.todos.findOne( {
        _id: mongojs.ObjectId( req.params.id )
    }, 
    function( error, todo ) {
        if( error ) {
            res.send( error )
        }
        else {
            res.json( todo );
        }
    }
    )
} )

// Save todo
router.post( '/todo', function( req, res, next ) {
    
    var todo = req.body;
    
    if( !todo.text || !( todo.isCompleted + '')) 
    {
            res.status(400);
            res.json({ "error": "Invalid Data"});
    }
    else {
            db.todos.save( todo, function( error, result ) {
                if( error ) {
                    res.send( error );
                }
                else {
                    res.json( result );
                    console.log('MongoDB has updated to :' + JSON.stringify( result ) );
                }
            }) 
    }
} );

// Update todo
router.put( '/todo/:id' , function( req, res, next ) {
    var todo = req.body;
    var updObj = {};

    if( todo.isCompleted )  updObj.isCompleted = todo.isCompleted;
    if( todo.text )         updObj.text = todo.text;

    if( !updObj )
    {
        res.status( 400 );
        res.json( { "error" : "Invalid data in udpate todo" } );
    } 
    else 
    {
        db.todos.update( {
            _id: mongojs.ObjectId( req.params.id)
        },
        updObj,
        {},
        function( error, result ) {
            if( error ) {
                res.send( error );
            }
            else 
            {
                res.json( result );
                console.log( 'TODO has been updated in MongoDB : ' + JSON.stringify( result ) );
                console.log( 'UPDATED todo in MongoDB : ' + JSON.stringify( updObj ) );
            }
        })
    }
});

// Delete todo

router.delete( '/todo/:id' , function( req, res, next ) {

    db.todos.remove( {
        _id: mongojs.ObjectId( req.params.id )
    },
    '',
    function( error, result ) {
        if( error ) {
            res.send( error );
        }
        else{
            res.json( result );
        }
    })
} );


module.exports = router;

