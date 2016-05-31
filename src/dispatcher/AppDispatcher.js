import { Dispatcher } from 'flux'

const flux = new Dispatcher();

export function register(callback) {
  return flux.register(callback);
}

export function dispatch(type, action = {}) {
  if (!type) {
    throw new Error('You forgot to specify type.');
  }

  if (action.error) {
    console.error(type, action);
  } else {
    console.log(type, action);
  }

  flux.dispatch({ type, ...action });
}