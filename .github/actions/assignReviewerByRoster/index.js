const core = require('@actions/core');
const github = require('@actions/github');

github.getOctokit().request('POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers', {
  owner: 'AjobK',
  repo: 'Seaqull',
  pull_number: github.context.payload.pull_request.number,
  reviewers: [
    'AjobK'
  ]
})

// try {
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)

//   github.context.
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }