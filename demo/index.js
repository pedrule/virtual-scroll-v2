import { html, render } from 'lit-html';
import '../src/pedrule-virtual-scroll.js';

const title = 'test';
render(html`
  <div  style="width: 300px; height: 50vh; display: flex;">
      <pedrule-virtual-scroll width="150" name-of-container="span">
          <!-- <template> -->
              <span>This is a test with an other </div>
          <!-- </template> -->
      </pedrule-virtual-scroll>
  </div>
`, document.querySelector('#demo'));
