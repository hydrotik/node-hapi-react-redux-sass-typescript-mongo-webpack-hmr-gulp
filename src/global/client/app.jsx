import './favicon.ico';
import 'babel-core/polyfill';
import 'normalize.css/normalize.css';

//import '../node_modules/slick-carousel/slick/slick.css';
//import '../node_modules/slick-carousel/slick/slick-theme.css';

import './scss/app.scss';

import React from 'react';
import App from './newcomponents/App/App';

React.render(
  <App />,
  document.getElementById('app')
);

