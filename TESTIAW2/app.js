const express = require('express');
const { exec } = require('child_process');
const app = express();

app.get('/network-test', (req, res) => {
    const targetAddress = req.query.address;

    // VULNERABILITY: User input from 'address' is concatenated 
    // directly into a shell command without sanitization.
    exec(`ping -c 4 ${targetAddress}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send(`Error: ${error.message}`);
        }
        res.send(`<pre>${stdout}</pre>`);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});