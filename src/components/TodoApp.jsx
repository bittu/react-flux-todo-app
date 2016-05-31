import React, { Component } from 'react'

import TodoStore from '../stores/AppStore'

import Header from './Header'
import Main from './Main'
import Footer from './Footer'

export default class TodoApp extends Component {
	
	constructor(props) {
		super(props)

		this._onChange = this._onChange.bind(this)

		this.state = {
			allTodos: TodoStore.getAll(),
    	areAllComplete: TodoStore.areAllComplete()
		}
	}

	componentDidMount() {
		TodoStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  }

  _onChange() {
  	this.setState({
			allTodos: TodoStore.getAll(),
    	areAllComplete: TodoStore.areAllComplete(),
    	nowShowing: TodoStore.nowShowing()
		})
  }

  render() {
  	return (
  			<div>
	        <Header />
	        <Main
	          allTodos={this.state.allTodos}
	          areAllComplete={this.state.areAllComplete}
	          nowShowing={this.state.nowShowing}
	        />
	        <Footer allTodos={this.state.allTodos} />
	      </div>
  		)
  }

}