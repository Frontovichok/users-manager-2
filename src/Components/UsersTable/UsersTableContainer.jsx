import React from 'react'
import { connect } from 'react-redux'
import UsersTable from './UsersTable'
import { getUsers } from '../../redux/actions/usersActions'
import { useEffect } from 'react'
import RedirectToSignIn from './RedirectToSignIn/RedirectToSignIn'

function UsersTableContainer(props) {
	useEffect(() => {
		if (props.isSignedIn && props.users.length === 0) {
			props.getUsers(props.accessToken)
		}
	}, [props.isSignedIn, props.users])
	if (props.isSignedIn) {
		return <UsersTable {...props} />
	}
	return <RedirectToSignIn />
}

const mapStateToProps = (state) => ({
	isSignedIn: state.auth.isSignedIn,
	accessToken: state.auth.accessToken,
	users: state.users.users,
	usersIsLoading: state.users.isLoading,
})
export default connect(mapStateToProps, { getUsers })(UsersTableContainer)
