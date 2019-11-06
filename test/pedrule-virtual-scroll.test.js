import { html, fixture, expect } from '@open-wc/testing';

import '../src/pedrule-virtual-scroll.js';

describe('<pedrule-virtual-scroll>', () => {
  it('has a default property heading', async () => {
    const el = await fixture('<pedrule-virtual-scroll></pedrule-virtual-scroll>');

    expect(el.heading).to.equal('Hello world!');
  });

  it('allows property heading to be overwritten', async () => {
    const el = await fixture(html`
      <pedrule-virtual-scroll heading="different heading"></pedrule-virtual-scroll>
    `);

    expect(el.heading).to.equal('different heading');
  });
});
