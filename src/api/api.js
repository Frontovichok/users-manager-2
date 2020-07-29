import * as axios from 'axios'

const instance = axios.create({
	baseURL: 'http://emphasoft-test-assignment.herokuapp.com/',
	withCredentials: true,
	headers: {
		// 'API-KEY': '60825fb6-5434-42e8-8303-e52d102b3191',
	},
})

export const usersAPI = {
	getUsers(currentPage, usersOnPage) {
		return instance.get(``).then((response) => response.data)
	},
}

export const authAPI = {
	authMe: async () => {
		const { data } = await instance.get('auth/me')
		return data
	},
	signIn(username, password) {
		return instance
			.post('api-token-auth/', { username, password })
			.then((response) => response.data)
	},
	signOut() {
		return instance.delete('auth/login').then((response) => response.data)
	},
}
