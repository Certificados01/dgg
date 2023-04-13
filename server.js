const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const port = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post("/send", upload.single('pdf'), (req,res) =>{
    const nome = req.body.nomeCompleto;
    const email = req.body.email;
    const pdf = req.file;

    require('./email.js')(email, nome, pdf)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
})

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port,()=>{
    console.log(`Opa, estou na porta ${port}`)
})

app.on('error', (err) => {
    console.log('Erro ao iniciar o servidor:', err);
});
