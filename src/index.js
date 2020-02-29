import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { RoomProvider } from './context';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <RoomProvider>
        <Router>
            <App />
        </Router>
    </RoomProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
