import axiosService from '../commons/axiosService';
import { DOCKER_URL } from '../constants/Url';
export const register = body => {
  return axiosService.post(`${DOCKER_URL}/users`, body);
};
export const login = body => {
  return axiosService.post(`${DOCKER_URL}/users/login`, body);
};
export const loginToken = body => {
  return axiosService.get(`${DOCKER_URL}/users/tokenlogin`);
};
export const loginFacebook = body => {
  return axiosService.post(`${DOCKER_URL}/users/facebooklogin`, body);
};
export const uploadAvatar = body => {
  return axiosService.post(`${DOCKER_URL}/users/update/avatar`, body);
};
export const loginPhone = body => {
  return axiosService.post(`${DOCKER_URL}/phone/login`, body);
};

