/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

const type = process.argv[2];
const target = process.argv[3];

if (type === 'file') {
    //read file
    fs.readFile(target, 'utf8', (err, data) => {
        if (err) {
            console.log(`There was an error reading the file: ${target}. ${err}`);
            process.exit(1);
        }
        const mm = new MarkovMachine(data);

        console.log(mm.makeText());
        process.exit(0);
    });
} else if (type === 'url') {
    axios.get(target)
        .then((resp) => {
            const mm = new MarkovMachine(resp.data);

            console.log(mm.makeText());
            process.exit(0);
        }).catch(err => {
            console.log(`There was an error reading the url: ${target}. ${err}`);
            process.exit(1);
        })
}