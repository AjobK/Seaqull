const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('token');
const octokit = github.getOctokit(token)

const { payload } = github.context
const { issue } = payload

let inputIssueTitle = issue.title

issue.title = issue.title.trim()

// Check whether format is correct ('[ISSUE_NUMBER] ISSUE TITLE')
// For example: '[111] Create Post'
let issueTitleMatches = issue.title.match(/^(?:\[+\d+\] )/)
if (!issueTitleMatches || issueTitleMatches.length <= 0) {
  issue.title = `[${issue.number}] ${issue.title}`
}

if (inputIssueTitle != issue.title) {
  octokit.rest.issues.update({
    owner: 'AjobK',
    repo: 'Seaqull',
    issue_number: issue.number,
    title: issue.title
  })
}
