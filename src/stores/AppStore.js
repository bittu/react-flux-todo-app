import { EventEmitter } from 'events'
import { register } from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'

const CHANGE_EVENT = 'change'

let _todos = {}
let _nowShowing = AppConstants.ALL_TODOS

function create(text) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  }
}

function update(id, updates) {
  _todos[id] = Object.assign({}, _todos[id], updates)
}

function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates)
  }
}

function destroy(id) {
  delete _todos[id]
}

function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id)
    }
  }
}

function updateNowShowing(filter) {
  _nowShowing = filter;
}

class AppStore extends EventEmitter {

	emitChange() {
		this.emit(CHANGE_EVENT)
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback)
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback)
	}

	getAll() {
		return _todos
	}

	areAllComplete() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false
      }
    }
    return true
  }

  nowShowing() {
    return _nowShowing
  }

}

const TodoStore = new AppStore()

register((payload) => {
	const action = payload
	let text = ''

	switch(action.type) {
    case AppConstants.TODO_CREATE:
      text = action.text.trim()
      if (text !== '') {
        create(text)
        TodoStore.emitChange()
      }
      break

    case AppConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({complete: false})
      } else {
        updateAll({complete: true})
      }
      TodoStore.emitChange()
      break

    case AppConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false})
      TodoStore.emitChange()
      break

    case AppConstants.TODO_COMPLETE:
      update(action.id, {complete: true})
      TodoStore.emitChange()
      break

    case AppConstants.TODO_UPDATE_TEXT:
      text = action.text.trim()
      if (text !== '') {
        update(action.id, {text: text})
        TodoStore.emitChange()
      }
      break

    case AppConstants.TODO_DESTROY:
      destroy(action.id)
      TodoStore.emitChange()
      break

    case AppConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted()
      TodoStore.emitChange()
      break

    case AppConstants.TODO_FILTER:
      updateNowShowing(action.filter)
      TodoStore.emitChange()
      break

    default:
      // no op
  }
})

export default TodoStore