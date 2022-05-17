import axiosService from '../commons/axiosService';
import { DOCKER_URL } from '../constants/Url';
export const getInvoicesRequest = () => {
  return axiosService.get(`${DOCKER_URL}/invoices/get_request`);
};
export const createInvoicesRequest = body => {
  return axiosService.post(`${DOCKER_URL}/invoices/create_request`, body);
};
export const createInvoices = body => {
  return axiosService.post(`${DOCKER_URL}/invoices/create`, body);
};
