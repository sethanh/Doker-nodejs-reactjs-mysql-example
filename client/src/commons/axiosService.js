import axios from 'axios';

class AxiosService {
  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return error;
  }

  get(url) {
    return this.instance.get(
      url,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('_token') || ''
        }
      }
    );
  }

  post(url, body) {
    return this.instance.post(
      url,
      body,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('_token') || ''
        }
      }
    );
  }

  put(url, body) {
    return this.instance.put(
      url,
      body,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('_token') || ''
        }
      }
    );
  }
}
export default new AxiosService();
