import * as preact from 'preact';
import { storiesOf } from '@storybook/react';
import { Button } from '.';

storiesOf('Storybook With Preact', module)
    .add(
        'default', () => (
        <Button
          text="what a nice button"
        />
      )
    );
