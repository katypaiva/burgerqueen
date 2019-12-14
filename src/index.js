import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import Hall from './pages/Hall/index'
import Kitchen from './pages/Kitchen/index'
import * as serviceWorker from './serviceWorker';



const Routing = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={App}></Route>
                <Route  path="/pages/Hall/index" component={Hall}></Route>
                <Route exact path="/pages/Kitchen/index" component={Kitchen}></Route>
            </div>
        </Router>

    
    )
}

ReactDOM.render(<Routing />, document.getElementById('root'));
serviceWorker.unregister();
