
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
app.use("/assets", express.static(__dirname + '/assets'));

app.get('/login', (req, res)=>{
	res.sendFile(__dirname + '/login.html')
})
app.get('/register', (req, res)=>{
	res.sendFile(__dirname + '/register.html')
})

app.post('/register_post', (req, res)=>{
	connection.query("INSERT INTO `students` (`id`, `name`, `register`) VALUES (?, ?, ?)", ['NULL', req.body.name, req.body.reg], (err, result)=>{
		if (err) return console.log(err)
		console.log('Saved Successfully')
		res.redirect('/register')
	})
})

connection.connect((err) => {
	if (err) return console.log(err)
	app.listen(3000, ()=>{
		console.log('Running on port 3000')
	})
})