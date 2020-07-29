import {
	SET_USERS,
	CHANGE_USER,
	DELETE_USER,
} from '../types'

const initialState = {
	users: false,
	isLoading: false,
}

function usersReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USERS:
			return { ...state.users, ...action.payload }
		case CHANGE_USER:
			return state.users.map((user) =>
				user.id === action.payload.id ? action.payload : user
			)
		case DELETE_USER:
			return state.users.filter((user) => user.id !== action.payload.id)
		default:
			return state
	}
}

export default usersReducer
