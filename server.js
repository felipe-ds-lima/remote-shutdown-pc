const path = require('path');
const express = require('express');
const { exec } = require('child_process');
const app = express();

function runCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      callback(true);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    if (stdout) {
      console.log(`stdout: ${stdout}`);
    }

    callback(null);
  });
}

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'views/index.html'));
});

app.get('/desligar', function (req, res) {
  runCommand('shutdown -s -t 1', (error) => {
    if (error) {
      res.sendFile(path.resolve(__dirname, 'views/erro.html'));
    }
    res.sendFile(path.resolve(__dirname, 'views/desligando.html'));
  });
});
app.get('/reiniciar', function (req, res) {
  runCommand('shutdown -r -t 1', (error) => {
    if (error) {
      res.sendFile(path.resolve(__dirname, 'views/erro.html'));
    }
    res.sendFile(path.resolve(__dirname, 'views/reiniciar.html'));
  });
});
app.get('/hibernar', function (req, res) {
  runCommand('ping -n 1 127.0.0.1 > NUL 2>&1 && shutdown /h /f', (error) => {
    if (error) {
      res.sendFile(path.resolve(__dirname, 'views/erro.html'));
    }
  });
  res.sendFile(path.resolve(__dirname, 'views/hibernar.html'));
});

app.listen(80, () => {
  console.log('Server started on port 80');
});
