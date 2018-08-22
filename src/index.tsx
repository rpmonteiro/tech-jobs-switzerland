import * as preact from 'preact';
import { App } from './app';
import './styles.less';

if (process.env.NODE_ENV === 'development') {
  require('preact/devtools');
}
const node = document.getElementById('app') as Element;
preact.render(<App />, node as Element, node.lastChild as Element);

if (module.hot) {
  module.hot.accept();
}
