import React, { Component } from 'react'

import { toggleCompleteAll } from '../actions/AppActions'
import TodoItem from './TodoItem'

export default class Main extends Component {

	_onToggleCompleteAll() {
    toggleCompleteAll()
  }

	render() {
		if (Object.keys(this.props.allTodos).length < 1) {
      return null
    }

    const allTodos = this.props.allTodos
    console.log(Object.values(allTodos))
    const vals = Object.keys(obj).map(key => obj[key]);

    let filteredTodos = allTodos.filter((todo) => {
																					switch (this.props.nowShowing) {
																						case app.ACTIVE_TODOS:
																							return !todo.completed;
																						case app.COMPLETED_TODOS:
																							return todo.completed;
																						default:
																							return true;
																					}
																				});
    let todos = []

    for (var key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]} />)
    }

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll.bind(this)}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{todos}</ul>
      </section>
    )

	}
}