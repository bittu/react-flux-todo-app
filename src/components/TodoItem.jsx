import React, { Component } from 'react'
import classNames from 'classnames'

import { toggleComplete, updateText, destroy } from '../actions/AppActions'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
	constructor(props) {
		super(props)

		this._onToggleComplete = this._onToggleComplete.bind(this)
		this._onDoubleClick = this._onDoubleClick.bind(this)
		this._onSave = this._onSave.bind(this)
		this._onDestroyClick = this._onDestroyClick.bind(this)

		this.state = {
			isEditing: false
		}
	}

	_onToggleComplete() {
    toggleComplete(this.props.todo)
  }

  _onDoubleClick() {
    this.setState({isEditing: true})
  }

  _onSave(text) {
    updateText(this.props.todo.id, text)
    this.setState({isEditing: false})
  }

  _onDestroyClick() {
    destroy(this.props.todo.id)
  }

	render() {
		let todo = this.props.todo
		let input
		if (this.state.isEditing) {
      input =
        <TodoTextInput
          className="edit"
          onSave={this._onSave}
          value={todo.text}
        />;
    }
    return (
      <li
        className={classNames({
          'completed': todo.complete,
          'editing': this.state.isEditing
        })}
        key={todo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
        {input}
      </li>
    )
	}
}