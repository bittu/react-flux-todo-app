import { dispatch } from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'

export function create(text) {
	dispatch(AppConstants.TODO_CREATE, { text })
}

export function updateText(id, text) {
	dispatch(AppConstants.TODO_UPDATE_TEXT, { id, text })
}

export function toggleComplete(todo) {
	const id = todo.id
	const actionType = todo.complete ?
        AppConstants.TODO_UNDO_COMPLETE :
        AppConstants.TODO_COMPLETE

    dispatch(actionType, { id })
}

export function toggleCompleteAll() {
	dispatch(AppConstants.TODO_TOGGLE_COMPLETE_ALL)
}

export function destroy(id) {
	dispatch(AppConstants.TODO_DESTROY, { id })
}

export function destroyCompleted() {
	dispatch(AppConstants.TODO_DESTROY_COMPLETED)
}

export function updateNowShowing(filter) {
	dispatch(AppConstants.TODO_FILTER, { filter })
}