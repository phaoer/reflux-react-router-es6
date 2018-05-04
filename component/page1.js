import React, { Component } from 'react';

import ReactDOM from "react-dom";

import Reflux from "reflux";

require('../app/main.css');

let Actions = Reflux.createActions(['statusUpdate','test']);

class StatusStore extends Reflux.Store{
    constructor(){
        super();
        this.state = {          //设置store的默认值和在react里面一样
            name: 'Irwin'
        };
        this.listenables = Actions;             //监听statusUpdate action
    }

    onStatusUpdate(name){
        var newName = name ? name: 'Irwin';
        this.setState({name: newName});
    }

    onTest(){
        console.log('name:' + this.state.name);
    }
    
}

class MyComponent extends Reflux.Component{   //继承react.component
    constructor(){
        super();
        this.state = {};                 //store会将它的state加到组件的state里面去
        this.store = StatusStore;       //assign StatusStore(可用数组assign多个)
        // this.storeKeys = ['name'];  // 设置后只有name会被添加到state当中
    }

    componentWillMount()
    {
        console.log('Hello Reflux');
        super.componentWillMount();   //官方文档提到直接调用会覆盖reflux.Component的方法,这里调用父类react的componentWillMount
    }

    render(){
        var name = this.state.name;
        return <div>Welcome {name} <input type='button' onClick={ () => {Actions.test()} } value='click' /></div>
    }
}

export default MyComponent