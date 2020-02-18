import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import Header from './components/Layouts/Header';
import uuid from 'uuid';
import './App.css';
import axios from 'axios';

  class App extends Component {
    state = {
      list: []
    }

    componentDidMount() {
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=15')
      .then(res => this.setState({ list: res.data}))
    }

    // toggle complete
    markComplete = (id) => {
      this.setState({ list: this.state.list.map(list => {
        if(list.id === id) {
          list.completed = !list.completed
        }
        return list;
      }) });
    }

    //add todo
    addTodo = (title) => {
      axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false
      })
        .then(res => this.setState({ list:
          [...this.state.list, res.data] }));
    }
    //delete todo
    delTodo = (id) => {
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ list: [...this.state.list.filter
        (list => list.id !== id)] }));
    }

    render() {
      return (
        <Router>
          <div className="App">
            <div className="container">
              <Header />
              <Route exact path="/home"  render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo}/>
                  <Todos list={this.state.list} markComplete={this.markComplete} delTodo={this.delTodo}/>
                </React.Fragment>
              )} />
              <Route path="/about" component={About} />
            </div>
          </div>
        </Router>
      );
    }
  }

export default App;
