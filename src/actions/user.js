import axios from 'axios';
import { user } from '../api';
import { setUserData } from '../helpers/index';

export const getUser = kdkppn => {
  return axios({
    url: user,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {kdkppn: kdkppn}
  }).then(res => {
    return res.data.user;
  });
}

export const postUser = formData => {
  return axios({
    url: user,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: formData
  }).then(res => {
    setUserData(res.data.user);
    window.location.reload();
    return res.data.user;
  });
};

export const putUser = formData => {
  return axios({
    url: user,
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data: formData
  }).then(res => {
    return res.data;
  });
};