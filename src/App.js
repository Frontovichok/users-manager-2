import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import SignInFormContainer from './Components/SignInForm/SignInFormContainer'
import UsersTableContainer from './Components/UsersTable/UsersTableContainer'
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
