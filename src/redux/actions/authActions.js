import { SIGN_IN_SUCCESS, SIGN_IN_FAILED, SIGN_IN_LOADING } from '../types'
import { authAPI } from '../../api/api'

const signInSuccess = (token) => ({ type: SIGN_IN_SUCCESS, payload: token })
const signInFailed = () => ({ type: SIGN_IN_FAILED })
const signInLoading = () => ({ type: SIGN_IN_LOADING })

export const signIn = (username, password) => {
	return async (dispatch) => {
		dispatch(signInLoading())
		const response = await authAPI.signIn(username, password)
		if (!response.error) {
			dispatch(signInSuccess(response.data.token))
		} else {
			dispatch(signInFailed())
		}
	}
}
