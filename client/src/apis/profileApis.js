import axiosService from '../commons/axiosService';
import { DOCKER_URL } from '../constants/Url';
export const getUser = () => {
  return axiosService.get(`${DOCKER_URL}/users/get`);
};
export const updateUser = body => {
  return axiosService.put(`${DOCKER_URL}/users/`, body);
};
export const uploadAvatar = body => {
  return axiosService.post(`${DOCKER_URL}/users/update/avatar`, body);
};

