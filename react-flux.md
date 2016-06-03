# React

* Usual way
	- Build app traditionally by including required .js files (react, react-dom, flux, ...)
	> Need to use only plain javascript to write React classes
```javascript
	var app = React.createClass({
		... // react code
		render: function() {
			... // renders jsx
		}
	})

	ReactDOM.render(<app />, document.getElementById('app'));
```

* Perfect way
	- Use node and npm modules to install and build an app
	- Compile app with babel using task tool like gulp/webpack
	- Include generated .js file in your index.html and run
	> Advantage is that we can use ES6 classes to build our app
```javascript
import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {
	render() {
		... // render jsx
	}
}

render(<App />, document.getElementById('app'))
```
---
___

# Flux Architecture

* **Actions**  are simple objects with a type property and some data. For example, an action could be {“type”: “IncreaseCount”, “local_data”: {“delta”: 1}}
* **Stores** contain the application’s state and logic. The best abstraction is to think of stores as managing a particular domain of the application. They aren’t the same as models in MVC since models usually try to model single objects, while stores in Flux can store anything
* **The Dispatcher** acts as a central hub. The dispatcher processes actions (for example, user interactions) and invokes callbacks that the stores have registered with it. The dispatcher isn’t the same as controllers in the MVC pattern — usually the dispatcher does not have much logic inside it and you can reuse the same dispatcher across projects
* **Views** are controller-views, also very common in most GUI MVC patterns. They listen for changes from the stores and re-render themselves appropriately. Views can also add new actions to the dispatcher, for example, on user interactions. The views are usually coded in React, but it’s not necessary to use React with Flux


![Flux Architecture](//facebook.github.io/flux/img/flux-simple-f8-diagram-explained-1300w.png)

