const { Publisher } = require("@pact-foundation/pact");
require('dotenv-flow').config();

const contractDirectory = './pacts/';
const opts = {
    pactBroker: 'http://localhost:9299',
    pactFilesOrDirs: [contractDirectory],
    consumerVersion: '0.0.1',
    publishVerificationResult: true
};
new Publisher(opts)
    .publishPacts()
    .then((done) => {
        console.log('Publishing has succeed');
        process.exit(0);
        done();
    })
    .catch(e => {
        console.log('Pact contract publishing failed: ', e);
        process.exit(1);
    });
