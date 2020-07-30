import { SIGN_IN_SUCCESS, SIGN_IN_LOADING, SIGN_IN_FAILED } from '../types'

const initialState = {
	isSignedIn: false,
	isLoading: false,
	isFailed: false,
	accessToken: '',
}

function authReducer(state = initialState, action) {
	switch (action.type) {
		case SIGN_IN_SUCCESS:
			return {
				...state,
				isSignedIn: true,
				isLoading: false,
				accessToken: action.payload,
			}
		case SIGN_IN_FAILED:
			return { ...state, isSignedIn: false, isLoading: false, isFailed: true }
		case SIGN_IN_LOADING:
			return { ...state, isLoading: true }
		default:
			return state
	}
}

export default authReducer
