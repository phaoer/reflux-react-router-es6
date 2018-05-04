import React, { Component } from 'react';

import ReactDOM from "react-dom";

require('./main.css');

var Reflux = require('reflux');

var ReportAction = Reflux.createActions([
    'getAll',
    'getOne'
]);
var TodoStore = Reflux.createStore({
    listenables: [ReportAction],
    items: [],
    onGetAll: function() {
        // $.ajax({
        //     url:'http://pubg.ali213.net/pubgx/ajax2',
        //     type:"GET", 
        //     data:'nickname=EMS_YaphetS&region=&type=solo&season=&_='+Date.parse(new Date()),
        //     dataType:"jsonp",
        //     jsonp:'callback',
        //     async: false,
        //     success:function(response){
        //         console.log(response);
        //         this.items.unshift(response.data.detail);
        //         this.trigger(this.items);
        //     }
        // })
        $.getJSON('http://pubg.ali213.net/pubgx/ajax2?callback=?', 'nickname=EMS_YaphetS&region=&type=solo&season=&_=' + Date.parse(new Date()), function(response) {
            console.log(response);
            this.items.unshift(response.data.detail);
            this.trigger(this.items); //push 方法将以新元素出现的顺序添加这些元素。如果参数之一为数组，那么该数组将作为单个元素添加到数组中。如果要合并两个或多个数组中的元素，请使用 concat 方法。
        }.bind(this));
    },
    onGetOne: function(data) {
        $.getJSON('http://pubg.ali213.net/pubgx/ajax2?callback=?', 'nickname=KingOfLanding&region=&type=solo&season=&_=' + Date.parse(new Date()), function(response) {
            console.log(response);
            this.items.splice(1, 0, response.data.detail);
            this.trigger(this.items);
        }.bind(this));
    }
});

class HelloMessage extends React.Component {
    constructor(props){
       super(props);
       this.state = {
         age:10
       };
    }

    componentWillMount(){
        console.log(this.state.age);
        this.setState({age:11});
        ReportAction.getAll();
    }

    render() {
        return <div> Hello { this.props.name } and {this.state.age} <input type="button" value='click' onClick= {()=>{alert(1)}} /></div>;
    }
}

ReactDOM.render( <HelloMessage name = "Irwin" /> , document.getElementById('root'));