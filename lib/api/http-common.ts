import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

export const apiClient = axios.create({
	baseURL: "https://dummyjson.com",
	headers: {
		"Content-type": "application/json",
	},
})

export const request = async (options: AxiosRequestConfig) => {
	const onSuccess = function (res: AxiosResponse) {
		const { data } = res
		return data
	}
	const onError = function (error: any) {
		if (axios.isAxiosError(error)) {
			return Promise.reject(error.response)
		} else {
			console.log("unexpected error: ", error)
			return "An unexpected error occurred"
		}
	}
	return apiClient(options).then(onSuccess).catch(onError)
}
