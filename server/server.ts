// @ts-nocheck
import express from 'express';
import cors from "cors";
const spawn = require("child_process").spawn;
const { exec } = require('child_process');
const PythonShell = require('python-shell').PythonShell;
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});


const runPythonScript = (req) => {
    let options = {
        mode: 'text',
        args: [req.body.text]
    };
    return new Promise((resolve, reject) => {
        exec('pipenv run model.py', options, (err, stdout, stderr) => {
            console.log("B", stdout)
            if(err) reject(err);

            resolve(stdout);
        });
    });
}
app.post('/chat', async (req, res) => {
    console.log("AAA", req.body.text)

    // let options = {
    //     mode: 'text',
    //     pythonOptions: ['-u'],
    //     pythonPath: "py",
    //     args: [req.body.text]
    // };
    // PythonShell.run('model.py', options, (err, results) => {
    //     console.log(results)
    //     return res.send({ message: results[0] });
    // });
    // runPythonScript(req)
    // .then(result => {
    //     res.send({ message: result })
    //     console.log(result);
    // })
});

app.listen(5001, () => {
    console.log(`Example app listening on port ${5001}}!`);
});

const io = require('socket.io')(5000, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  })

io.on('connection', socket => {
    const id = socket.handshake.query.id;
    socket.join(id);

    socket.on('send-message', ({ recipients, text }) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient);
            newRecipients.push(id);
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
})