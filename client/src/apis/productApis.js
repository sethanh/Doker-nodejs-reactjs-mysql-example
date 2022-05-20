import axiosService from '../commons/axiosService';
import { DOCKER_URL } from '../constants/Url';
export const getProduct = () => {
  return axiosService.get(`${DOCKER_URL}/products/get`);
};
export const createProduct = body => {
  return axiosService.post(`${DOCKER_URL}/products/create`, body);
};
export const update = (body) => {
  return axiosService.put(`${DOCKER_URL}/products/${body.id}`, body);
};
export const updateImage = (body) => {
  return axiosService.put(`${DOCKER_URL}/products/image/${body.id}`, body.formData);
};

