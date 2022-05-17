import axiosService from '../commons/axiosService';
import { HOST_URL,DOCKER_URL } from '../constants/Url';

const url = 'tables/all';
export const getList = () => {
  return axiosService.get(`${HOST_URL}/${url}`);
};
export const register = body => {
  return axiosService.post(`${DOCKER_URL}/users`, body);
};
export const login = body => {
  return axiosService.post(`${DOCKER_URL}/users/login`, body);
};

