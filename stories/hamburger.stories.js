import Hamburger from '../src/components/hamburger';

import React from 'react';

import { storiesOf } from '@storybook/react';

storiesOf('Hamburger', module)
	.add('Normal', () => <Hamburger/> )
	.add('Clicked', () => <Hamburger active='true' /> )
