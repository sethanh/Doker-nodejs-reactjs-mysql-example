import axiosService from '../commons/axiosService';
import { DOCKER_URL } from '../constants/Url';
export const getUser = () => {
  return axiosService.get(`${DOCKER_URL}/users/get`);
};

