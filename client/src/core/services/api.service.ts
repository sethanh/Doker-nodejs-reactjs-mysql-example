

import axios from 'axios';
export const Host = 'https://icf-api.volcanly.me'
export const BaseURL = `${Host}/api/v1/`
const instance = axios.create({ timeout: 10000, baseURL: BaseURL })

class ApiService {
  constructor() {
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  handleSuccess(response:any) {
    return response;
  }

  handleError(error:any) {
    return error;
  }

  get(url:string) {
    return instance.get(
    `${BaseURL}/${url}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('_token') || ''
        }
      }
    );
  }

  post(url:string, body?:any) {
    return instance.post(
      `${BaseURL}/${url}`,
      body,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('_token') || ''
        }
      }
    );
  }

  put(url:string, body?: any) {
    return instance.put(
      `${BaseURL}/${url}`,
      body,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('_token') || ''
        }
      }
    );
  }
  
}
export default new ApiService();
