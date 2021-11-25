const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('token');
const octokit = github.getOctokit(token)

const defaultReviewers = [ 'AjobK' ]
const reviewerGroups = [
  [ 'ryankroon00', 'jerohero' ],
  [ 'S-Goossens', 'Shifu-py', 'daansneep' ]
]

const chosenReviewers = reviewerGroups[getSprintNumber() % reviewerGroups.length]

core.setOutput('reviewers', chosenReviewers)

octokit.request('POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers', {
  owner: 'AjobK',
  repo: 'Seaqull',
  pull_number: github.context.payload.pull_request.number,
  reviewers: [ ...defaultReviewers, ...chosenReviewers ]
})

// d2 default is based on first time we started the review roster
function getSprintNumber(d1 = new Date(), d2 = new Date(2021, 05, 26)) {
  const weeksPassed = Math.abs(Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000)))
  
  return ~~(weeksPassed / 2)
}
