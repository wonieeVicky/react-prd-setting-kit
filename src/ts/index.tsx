import React from 'react';
import ReactDOM from 'react-dom/client';

// static resources
import './static/static';
import Root from 'Containers/Root';

// SPA rendering
const elementRoot = document.getElementById('root');
if (elementRoot) {
  ReactDOM.createRoot(elementRoot).render(<Root />);
}
