import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  require('../stories/index.js')
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
