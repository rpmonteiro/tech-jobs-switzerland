import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';

addDecorator(withKnobs);
const req = require.context('../src', true, /stories.tsx/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);