import axiosService from '../commons/axiosService';
import { DOCKER_URL } from '../constants/Url';
export const getCart = () => {
  return axiosService.get(`${DOCKER_URL}/carts/`);
};
export const createCart = body => {
  return axiosService.post(`${DOCKER_URL}/carts/`, body);
};
export const update = (body) => {
  return axiosService.put(`${DOCKER_URL}/carts/${body.id}`, body);
};
export const updateImage = (body) => {
  return axiosService.put(`${DOCKER_URL}/carts/image/${body.id}`, body.formData);
};

