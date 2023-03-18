import { GraphQLClient } from "graphql-request"
import { API_URL, SITE_URL } from "@/constant"
import axios from "axios"

export const apiClient = new GraphQLClient(API_URL, {
	fetch,
	headers: {},
})

let instance = axios.create({
	baseURL: SITE_URL,
})

export const axiosClient = {
	get: <T>(url: string, params?: object) =>
		instance.get<T>(url, {
			headers: {
				// token: Cookies.get('token'),
			},
			...params,
		}),
	post: <T>(url: string, data: any, params?: object) =>
		instance.post<T>(url, data, {
			headers: {
				// token: Cookies.get('token'),
			},
			...params,
		}),
	patch: <T>(url: string, data: any) =>
		instance.patch<T>(url, data, {
			headers: {
				// token: Cookies.get('token'),
			},
		}),
	delete: <T>(url: string) =>
		instance.delete<T>(url, {
			headers: {
				// token: Cookies.get('token'),
			},
		}),
}

export const fetcher = async <T>({
	url,
	params,
}: {
	url: string
	params?: Object
}): Promise<T> => {
	const res = await axiosClient.get<T>(url, {
		params,
	})
	return res.data
}
