import * as axios from 'axios'

const instance = axios.create({
	baseURL: 'http://emphasoft-test-assignment.herokuapp.com/',
})

export const usersAPI = {
	getUsers: async (accessToken) => {
		const response = await instance.get('api/v1/users/', {
			headers: {
				Authorization: `Token ${accessToken}`,
			},
		})
		return response
	},
}

export const authAPI = {
	signIn: async (username, password) => {
		const response = await instance.post('api-token-auth/', {
			username,
			password,
		})
		return response
	},
}
