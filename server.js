const bodyParser 	= require('body-parser');
const mysql 		= require('mysql')
const express 		= require('express');
const app 			= express();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'notes-hub'
})

app.use(bodyParser.urlencoded({extended: true}))
app.use("/assets", express.static(__dirname + '/assets'))
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
	res.render('index.ejs');
})

app.get('/signin', (req, res)=>{
	res.render('signin.ejs');
})

app.get('/signup', (req, res)=>{
	res.render('signup.ejs');
})

connection.connect((err) => {
	if (err) return console.log(err)
	app.listen(3000, ()=>{
		console.log('Running on port 3000')
	})
})