import express, { response } from 'express'
import mysql from 'mysql'
import cors from 'cors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'


const app = express()
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    } 
}))

app.use(bodyParser.json())





const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})






app.get('/logout', (req, res)=>{
    req.session.destroy()
    return res.json({valid: false});
    
})


app.get('/', (req, res)=>{
    console.log(req.session)
    if(req.session.user) {
        const type="";
        if(req.session.user.type == "manager") {
            type == "manager";

        }
        else {
            type == "employee";

        }
        return res.json({valid: true, user: req.session.user, type:type});
    }
    else {
        return res.json({valid: false});
    }
})



app.post('/signup',(req, res)=>{
    const sql = "INSERT INTO users (`username`, `email`, `password`, `type`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,        
    ]
    console.log(values)
    db.query(sql, [values], (err, result)=>{
        if(err) return res.json({Message: err})
        return res.json(result)
    })
})


app.post("/signin", (req, res)=>{
    const sql = "SELECT * FROM users WHERE email = ? and password = ?"
    db.query(sql, [req.body.email, req.body.password], (err, result)=>{
        if(err) return res.json({Message: "Error inside server"})
        if(result.length > 0 ) {
            req.session.user = result[0];
            return res.json({Login: true})
        }
        else {
            return res.json({Login: false})
        }
    })
    
})

app.listen(8081, ()=>{
    console.log("connected to server.")
})



