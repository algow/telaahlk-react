import axios from 'axios';
import { upload } from '../api';
import { getUserData } from '../helpers/index';

export const postUpload = formData => {
  let bodyFormData = new FormData();
  bodyFormData.append('kode', getUserData().kdkppn);
  bodyFormData.append('bulan', formData.bulan);
  bodyFormData.append('bank_akrual', formData.bank_akrual);
  bodyFormData.append('bank_kas', formData.bank_kas);
  bodyFormData.append('satker_akrual', formData.satker_akrual);
  bodyFormData.append('satker_kas', formData.satker_kas);

  return axios({
    url: upload,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: bodyFormData
  }).then(res => {
    return res.data;
  });
}