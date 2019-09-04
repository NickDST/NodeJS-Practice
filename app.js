var express = require('express');
var bodyParser = require('body-parser');

//So we need to build an express app first
//so then we have access to all of the different methods in express
var app = express();

//this will pass our post data for us. We just need to use this piece of middleware in our 
//post middleware for the contact requests
var urlencodedParser = bodyParser.urlencoded({extended: false});

//telling express what we want as our view engine.
app.set('view engine', 'ejs');

//whenever someone views this, this middleware will fire
app.use('/assets', express.static('assets'));

app.get('/', function(request, response){
    response.render('index');
});

app.get('/contact', function(request, response){
    console.log(request.query);
    response.render('contact', {queryString: request.query});
});

app.post('/contact', urlencodedParser, function(request, response){
    //so the data is all in the request now and we can parse it and view it
    console.log(request.body);
    //renders the contact-success template in the /contact route
    //in the response render the request.body parsed POST form data
    response.render('contact-success', {data: request.body});
});


//route params
app.get('/profile/:name', function(request, response){
    //the way we pass data into a view is to pass an object as a second argument
    //we're passing the data through into the profile view
    //You can query a database and then pass it through here
    var data = {age: 29, job: 'ninja', hobbies:['eating' , 'fighting', 'fishing']};

    //This is how to inject data into views
    response.render('profile', {person: request.params.name, data: data} );
});


//choosing a port to listen through
app.listen(3000);

