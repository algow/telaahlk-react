import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment
} from 'semantic-ui-react';
import { Formik } from 'formik';
import { postUpload } from '../actions/upload';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button_disabled: false,
      message: {
        display: false,
        color: '',
        message: '',
      }
    }
  }

  render(){
    const bulanOptions = [
      {key: 1, value: 1, text: 'Januari'},
      {key: 2, value: 2, text: 'Februari'},
      {key: 3, value: 3, text: 'Maret'},
      {key: 4, value: 4, text: 'April'},
      {key: 5, value: 5, text: 'Mei'},
      {key: 6, value: 6, text: 'Juni'},
      {key: 7, value: 7, text: 'Juli'},
      {key: 8, value: 8, text: 'Agustus'},
      {key: 9, value: 9, text: 'September'},
      {key: 10, value: 10, text: 'Oktober'},
      {key: 11, value: 11, text: 'November'},
      {key: 12, value: 12, text: 'Desember'},
    ];

    return(
      <Grid
        textAlign='center'
        style={{ height: '100%', marginTop: '0' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 800 }}>
          <Header as='h2' attached='top' textAlign='left'>
            <Icon name='upload' />
            Upload File txt Neraca Lajur
          </Header>
          <Segment attached textAlign='left'>
            <Formik
              enableReinitialize={true}
              initialValues={{bulan: '', satker_kas: null, satker_akrual: null, bank_kas: null, bank_akrual: null}}
              validate={values => {
                let errors = {};

                if(!values.bulan) {
                  errors.bulan = 'required';
                }
                if(!values.satker_kas){
                  errors.satker_kas = 'required';
                }
                if(!values.satker_akrual){
                  errors.satker_akrual = 'required';
                }
                if(!values.bank_kas){
                  errors.bank_kas = 'required';
                }
                if(!values.bank_akrual){
                  errors.bank_akrual = 'required';
                }

                return errors;
              }}
              onSubmit={(values, { setSubmiting }) => {
                postUpload(values).then(res => {
                  this.setState({
                    button_disabled: true,
                    message: {
                      display: true,
                      color: 'green',
                      message: res.msg
                  }});
                }).catch(err => {
                  this.setState({message: {
                    display: true,
                    color: 'red',
                    message: 'error'
                  }});
                });
              }}
            >
              {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue
              }) => (
                <Form>
                  <Form.Field>
                    <label>Bulan</label>
                    <select name='bulan' value={values.bulan} onChange={handleChange} onBlur={handleBlur}>
                      <option>-- Pilih Bulan --</option>
                      {
                        bulanOptions.map(item => {
                          return(
                            <option key={item.value} value={item.value}>{item.text}</option>
                          )
                        })
                      }
                    </select>
                    {
                      errors.bulan ? 
                      <Message attached='bottom' color='red'>{errors.bulan}</Message> :
                      null
                    }
                  </Form.Field >
                  <Form.Field>
                    <label>Satker Kas</label>
                    <input
                      type='file' 
                      name='satker_kas' 
                      onChange={(event) => {
                        setFieldValue("satker_kas", event.currentTarget.files[0]);
                      }}
                      onBlur={handleBlur}
                    />
                    {
                      errors.satker_kas ? 
                      <Message attached='bottom' color='red'>{errors.satker_kas}</Message> :
                      null
                    }
                  </Form.Field>
                  <Form.Field>
                    <label>Satker Akrual</label>
                    <input 
                      type='file' 
                      name='satker_akrual' 
                      onChange={(event) => {
                        setFieldValue("satker_akrual", event.currentTarget.files[0]);
                      }} 
                      onBlur={handleBlur} 
                    />
                    {
                      errors.satker_akrual ? 
                      <Message attached='bottom' color='red'>{errors.satker_akrual}</Message> :
                      null
                    }
                  </Form.Field>
                  <Form.Field>
                    <label>Bank Kas</label>
                    <input 
                      type='file' 
                      name='bank_kas' 
                      onChange={(event) => {
                        setFieldValue("bank_kas", event.currentTarget.files[0]);
                      }}
                      onBlur={handleBlur} 
                    />
                    {
                      errors.bank_kas ? 
                      <Message attached='bottom' color='red'>{errors.bank_kas}</Message> :
                      null
                    }
                  </Form.Field>
                  <Form.Field>
                    <label>Bank Akrual</label>
                    <input 
                      type='file' 
                      name='bank_akrual' 
                      onChange={(event) => {
                        setFieldValue("bank_akrual", event.currentTarget.files[0]);
                      }}
                      onBlur={handleBlur} 
                    />
                    {
                      errors.bank_akrual ? 
                      <Message attached='bottom' color='red'>{errors.bank_akrual}</Message> :
                      null
                    }
                  </Form.Field>
                  <Form.Field>
                    {
                      this.state.button_disabled ? 
                      <Button
                        fluid
                        size='big'
                        type='submit' 
                        content='Submit'
                        primary
                        disabled
                      /> :
                      <Button
                        fluid
                        size='big'
                        type='submit' 
                        content='Submit'
                        primary
                        onClick={handleSubmit}
                      />
                    }
                  </Form.Field>
                </Form>
              )}
            </Formik>
          </Segment>
          { this.state.message.display ? 
            (<Message attached='bottom' color={ this.state.message.color }>
              {this.state.message.message}
            </Message>) : null
          }
        </Grid.Column>
      </Grid>
    )
  }
}

export default Upload;