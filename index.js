const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const yaml = require('js-yaml');
const shell = require('shelljs');

const SecretManagerServiceClient = require('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient();

try {
    const configRepo = core.getInput('config-repo');
    const pat = core.getInput('pat')
    const env = core.getInput('env')

    shell.exec(`git clone https://${pat}@github.com/${configRepo}`);

    const repoName = configRepo.split('/');

    let file = fs.readFileSync(`./${ repoName[1] }/${ env }`);
    let data  = yaml.load(file);

    console.log("Data:\n" + data);
    core.setOutput("env-values", data);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}

// parent = 'projects/my-project', // Project for which to manage secrets.
// secretId = 'foo', // Secret ID.
// payload = 'hello world!' // String source data.

// async function createAndAccessSecret() {
//     // Create the secret with automation replication.
//     const [secret] = await client.createSecret({
//         parent: parent,
//         secret: {
//         name: secretId,
//         replication: {
//             automatic: {},
//         },
//         },
//         secretId,
//     });

//     console.info(`Created secret ${secret.name}`);

//     // Add a version with a payload onto the secret.
//     const [version] = await client.addSecretVersion({
//         parent: secret.name,
//         payload: {
//         data: Buffer.from(payload, 'utf8'),
//         },
//     });

//     console.info(`Added secret version ${version.name}`);

//     // Access the secret.
//     const [accessResponse] = await client.accessSecretVersion({
//         name: version.name,
//     });

//     const responsePayload = accessResponse.payload.data.toString('utf8');
//     console.info(`Payload: ${responsePayload}`);
// }
//   createAndAccessSecret();