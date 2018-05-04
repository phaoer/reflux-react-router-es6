import React, {Component} from 'react';

import { Link } from 'react-router';

export default class nav extends Component{
  render() {
    return (
      <div>
          <ul>
  	        <li><Link to="/page1">page1</Link></li>
  	        <li><Link to="/page2">page2</Link></li>
	        </ul>
        {this.props.children}
      </div>
    );
  }
}
