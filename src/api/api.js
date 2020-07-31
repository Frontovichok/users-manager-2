import * as axios from 'axios'

const instance = axios.create({
	baseURL: 'http://emphasoft-test-assignment.herokuapp.com/',
})

export const usersAPI = {
	getUsers: async (accessToken) => {
		try {
			const response = await instance.get('api/v1/users/', {
				headers: {
					Authorization: `Token ${accessToken}`,
				},
			})
			return response
		} catch (err) {
			return { err, isError: true }
		}
	},
}

export const authAPI = {
	signIn: async (username, password) => {
		try {
			const response = await instance.post('api-token-auth/', {
				username,
				password,
			})
			return response
		} catch (err) {
			return { err, isError: true }
		}
	},
}
