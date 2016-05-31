import React, { Component } from 'react'

import { create } from '../actions/AppActions'
import TodoTextInput from './TodoTextInput'

export default class Header extends Component {

	_onSave(text) {
    if (text.trim()){
      create(text)
    }
  }

	render() {
		return (
      <header id="header">
        <h1>todos</h1>
        <TodoTextInput
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={this._onSave.bind(this)}
        />
      </header>
    )
	}
}