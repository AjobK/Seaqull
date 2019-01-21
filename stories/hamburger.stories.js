import Hamburger from '../src/components/hamburger';

import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

storiesOf('Hamburger', module)
	.add('Normal', () => <Hamburger/> )
    .add('Clicked', () => <Hamburger active='true' /> )
    