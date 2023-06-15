import React from 'react';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
