import axios from 'axios';
import { telaah } from '../api';
import { getUserData } from '../helpers/index';

export const getTelaah = bulan => {
  return axios({
    url: telaah,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      kdkppn: getUserData().kdkppn,
      bulan: parseInt(bulan)
    }
  }).then(res => {
    return res.data;
  });
}
