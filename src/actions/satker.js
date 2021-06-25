import axios from 'axios';
import { satker } from '../api';
import { getUserData } from '../helpers/index';

export const getSatker = () => {
  return axios({
    url: satker + '?kdkppn=' + getUserData().kdkppn,
    method: 'get',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    return res.data;
  });
}

export const postSatker = formData => {
  let bodyFormData = new FormData();
  bodyFormData.append('kppn', getUserData().kdkppn);
  bodyFormData.append('satker', formData.satker);

  return axios({
    url: satker,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: bodyFormData
  }).then(res => {
    return res.data;
  });
}