import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';


class Todos extends Component {

  render () {
    console.log(this.props.list)
    return this.props.list.map((list) => (
        <TodoItem key={list.id} list={list}
        markComplete={this.props.markComplete}
        delTodo={this.props.delTodo}
        />
    ));
  }
}


//PropTypes
Todos.propTypes = {
    list: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
}

export default Todos;
