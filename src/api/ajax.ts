import type { AxiosResponse } from 'axios'
import axios from 'axios'
import qs from 'qs'

const HTTPS = import.meta.env.VITE_API

const isCookie = window.location.href.indexOf('360che') <= -1
axios.defaults.withCredentials = !isCookie

export const fetch = <T, D = Error>({ url = '', params = {}, type = 'GET', header = {} }): Promise<AxiosResponse<T, D>> => {
  const baseURL = `${HTTPS}${url}`
  if (type === 'GET') {
    return axios.get<T>(baseURL, {
      params,
      headers: header
    })
  }
  return axios.post<T>(baseURL, qs.stringify(params), {
    headers: header
  })
}
