const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('token');
const octokit = github.getOctokit(token)

const { payload } = github.context
const { issue } = payload

console.log(' --- context --- ')
console.log(github.context)

console.log(' --- issue --- ')
console.log(issue)

// octokit.rest.issues.update({
//   owner: 'AjobK',
//   repo: 'Seaqull',
//   issue_number: issue.number,
//   title: issue.
// });
