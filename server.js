
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

app.get('/login', (req, res)=>{
	connection.query("SELECT * FROM `students`", (err, result)=>{
		if (err) return console.log(err)
		console.log(result[0].name)
		console.log(result[0].register)
		res.render('index.ejs', {students: result})
	})
	res.sendFile(__dirname + '/views/login.html')
})
app.get('/register', (req, res)=>{
	res.sendFile(__dirname + '/views/register.html')
})

app.post('/register_post', (req, res)=>{
	connection.query("INSERT INTO `students` (`id`, `name`, `register`) VALUES (?, ?, ?)", ['NULL', req.body.name, req.body.reg], (err, result)=>{
		if (err) return console.log(err)
		console.log('Saved Successfully')
		res.redirect('/login')
	})
})

connection.connect((err) => {
	if (err) return console.log(err)
	app.listen(3000, ()=>{
		console.log('Running on port 3000')
	})
})