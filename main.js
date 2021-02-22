const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const yaml = require('js-yaml');
const shell = require('shelljs');

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