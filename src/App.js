import React from 'react'
import './App.css'
import SignInFormContainer from './Components/SignInForm/SignInFormContainer'
import UsersTableContainer from './Components/UsersTable/UsersTableContainer'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'
import NotFound from './Components/Common/NotFound/NotFound'

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route path="/login" component={SignInFormContainer} />
					<Route exact path="/" component={UsersTableContainer} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	)
}

export default App
