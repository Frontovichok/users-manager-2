import React from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../redux/actions/authActions'
import SignInForm from './SignInForm'
import { Redirect } from 'react-router-dom'

function SignInFormContainer(props) {
	if (props.isSignedIn) {
		return <Redirect to="/" />
	}
	return <SignInForm {...props} />
}

const mapStateToProps = (state) => ({
	isLoading: state.auth.isLoading,
	isSignedIn: state.auth.isSignedIn,
})
export default connect(mapStateToProps, { signIn })(SignInFormContainer)
