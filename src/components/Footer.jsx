import React, { Component } from 'react'

import { destroyCompleted, updateNowShowing } from '../actions/AppActions'

export default class Header extends Component {

	_onClearCompletedClick() {
    destroyCompleted()
  }

  _updateNowShowing() {
  	updateNowShowing(this.state.filter)
  }

	render() {
		const allTodos = this.props.allTodos
    const total = Object.keys(allTodos).length

    if (total === 0) {
      return null;
    }

    let completed = 0
    for (var key in allTodos) {
      if (allTodos[key].complete) {
        completed++
      }
    }

    let itemsLeft = total - completed
    let itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items '
    itemsLeftPhrase += 'left'

    const filterArr = [{ filterName: All, filterConst: app.ALL_TODOS },
    									 { filterName: Active, filterConst: app.ACTIVE_TODOS },
    									 { filterName: Completed, filterConst: app.COMPLETED_TODOS }]

    let filters = [];
    filterArr.forEach((item) => {
    	filters.push(( <li> <a className={classNames({selected: nowShowing === item.filterConst})} > {item.filterName} </a> </li> ))
    })
    

    let clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        <button
          id="clear-completed"
          onClick={this._onClearCompletedClick.bind(this)}>
          Clear completed ({completed})
        </button>;
    }

  	return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        <ul id="filters">
        	{filters}
        </ul>
        {clearCompletedButton}
      </footer>
    )
	}
}