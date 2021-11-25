const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('token');
const octokit = github.getOctokit(token)

const { actor, payload } = github.context
const { pull_request } = payload

const defaultReviewers = [ 'AjobK' ]
const reviewerGroups = [
  [ 'S-Goossens', 'Shifu-py', 'daansneep' ],
  [ 'ryankroon00', 'jerohero' ]
]

const chosenReviewers = [
  ...reviewerGroups[getSprintNumber() % reviewerGroups.length],
  ...defaultReviewers
].filter(
  reviewer => reviewer !== actor
)

core.setOutput('reviewers', chosenReviewers)

octokit.request('POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers', {
  owner: 'AjobK',
  repo: 'Seaqull',
  pull_number: pull_request.number,
  reviewers: chosenReviewers
})

// d2 default is based on first time we started the review roster
function getSprintNumber(d1 = new Date(), d2 = new Date(2021, 05, 26)) {
  const weeksPassed = Math.abs(Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000)))
  
  return ~~(weeksPassed / 2)
}
