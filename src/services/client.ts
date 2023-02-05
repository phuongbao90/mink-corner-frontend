import { GraphQLClient } from "graphql-request"
import { API_URL } from "@/constant"
import axios from "axios"
// import Cookies from 'js-cookie';

export const apiClient = new GraphQLClient(API_URL, {
	fetch,
	// headers: {},
})

export const axiosClient = {
	get: <T>(url: string, params?: object) =>
		axios.get<T>(url, {
			headers: {
				// token: Cookies.get('token'),
			},
			...params,
		}),
	post: <T>(url: string, data: any, params?: object) =>
		axios.post<T>(url, data, {
			headers: {
				// token: Cookies.get('token'),
			},
			...params,
		}),
	patch: <T>(url: string, data: any) =>
		axios.patch<T>(url, data, {
			headers: {
				// token: Cookies.get('token'),
			},
		}),
	delete: <T>(url: string) =>
		axios.delete<T>(url, {
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
	params: Object
}): Promise<T> => {
	const res = await axiosClient.get<T>(url, {
		params,
	})
	return res.data
}
