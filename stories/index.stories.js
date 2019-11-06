import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import PedruleVirtualScroll from '../src/PedruleVirtualScroll.js';
import '../src/pedrule-virtual-scroll.js';

import readme from '../README.md';

storiesOf('pedrule-virtual-scroll', module)
  .addDecorator(withKnobs)
  .add('Documentation', () => withClassPropertiesKnobs(PedruleVirtualScroll), { notes: { markdown: readme } })
  .add(
    'Alternative Header',
    () => html`
      <pedrule-virtual-scroll .header=${'Something else'}></pedrule-virtual-scroll>
    `,
  );
