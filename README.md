# Reflux Version 6.4.1
看到知乎上基本没有Reflux的文章，索性写一篇，但仅为自己的理解，欢迎探讨

- 单向数据流思想
- Flux进阶版

**相比于Flux，在Reflux中除去了Dispatcher，即在Reflux中每一个Action就是一个Publisher，每一个Store就是一个Listener，因此我们可以在store中指定监听某一个Action，一旦Action触发则调用绑定的方法来修改数据**

## 依赖

```javascript
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "webpack": "^3.6.0"
  },
  "dependencies": {
    "react": "^15.6.2",
    "react-dom": "^15.6.2",
    "react-router": "^2.4.1",
    "reflux": "^6.4.1"
  }
```

## 使用方法

### 引入

```javascript
import React, { Component } from 'react';

import ReactDOM from "react-dom";

import Reflux from "reflux";

import Actions from '../app/action/actions'; //这里我是将Action和Store分开了，实际开发中建议这样，方便管理。

import Stores from '../app/store/stores';
```

### 创建Actions


```javascript
let Actions = Reflux.createActions(['action1','action2']);
```

### 创建Stores

```javascript
class Stores extends Reflux.Store{
    constructor(){
        super();          //切记先调用super方法，Es6中子类没有this
        this.state = {          //初始值，和react一样
            name: 'Irwin',
            sex:'male'
        };
        this.listenables = Actions;     //监听action,每个action都会自动注册一个on + actionname的方法
    }

    onAction1(){
        console.log('name:' + this.state.name);
    }

    onAction2(){
        console.log('sex:' + this.state.sex);
    }
    
}
```

### 挂载Stores
这里我是最喜欢的，reflux给我们提供了一个Reflux.Component类，而且继承了React.Component，唯一区别就是Reflux.Component会将Store中的state自动添加到当前组件的state中，nice啊~~~
需要注意一点的就是在调用componentWillMount和componentWillUnmount时候。

```javascript
class MyComponent extends Reflux.Component{ 
    constructor(){
        super();
        this.state = {};                 //store会将它的state加到组件的state里面去
        this.store = Stores;       		//assign Stores  (可用数组assign多个)
        // this.storeKeys = ['name'];  // 设置后只有name会被添加到state当中
    }

    componentWillMount()
    {
        console.log('Hello Reflux');
        super.componentWillMount();   //官方文档提到直接调用会覆盖reflux.Component的方法,这里调用父类react的componentWillMount
    }

    render(){
        var name = this.state.name;
        return <div>Welcome {name} <input type='button' onClick={ () => {Actions.action1()} } value='click' /></div>
    }
}
```


### The Relentless Pursuit of Perfection    持续更新中