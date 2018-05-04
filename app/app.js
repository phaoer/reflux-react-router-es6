import React, { Component } from 'react';

import ReactDOM from "react-dom";

import { Router, Route, hashHistory } from 'react-router';

import Nav from '../component/nav';

import Page1 from '../component/page1';

import Page2 from '../component/page2';

class App extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Nav}>
                  <Route path='/page1' component={Page1} />
                  <Route path='/page2' component={Page2} />
                </Route>
            </Router>
        )
    }
}

export default App