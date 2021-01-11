import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Message,
  Segment
} from 'semantic-ui-react';
import { Formik } from 'formik';
import { getUser, putUser } from '../actions/user';
import { getUserData } from '../helpers/index';

class Profil extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        kdkppn: '',
        nama: '',
        djbc: '',
        djp: '',
        djpk: '',
        djppr: ''
      },
      message: {
        display: false,
        color: '',
        message: ''
      }
    }
  }

  componentDidMount() {
    getUser(getUserData().kdkppn).then(res => {
      this.setState({user: {kdkppn: res.kdkppn, 
        nama: res.nama, 
        djbc: (!res.djbc) ? '': res.djbc, 
        djp: (!res.djp) ? '' : res.djp, 
        djpk: (!res.djpk) ? '' : res.djpk, 
        djppr: (!res.djppr) ? '' : res.djppr}});
    });
  }

  render(){
    return(
      <Grid
        textAlign='center'
        style={{ height: '100%', marginTop: '0' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 800 }}>
          <Header as='h2' attached='top' textAlign='left'>
            <Icon name='user circle' />
            Identitas KPPN
          </Header>
          <Segment attached>
            Pisahkan dengan tanda koma jika jumlah satker lebih dari satu.
          </Segment>
          <Segment attached>
            <Formik
              enableReinitialize={true}
              initialValues={this.state.user}
              onSubmit={(values, { setSubmiting }) => {
                putUser(values).then(res => {
                  this.setState({message: { display: true, color: 'green', message: res.msg }});
                }).catch(err => {
                  this.setState({message: { display: true, color: 'red', message: err.msg }})
                });
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit
              }) => {
                return (
                <Form>
                  <Form.Field>
                    <Input
                      label='Kode KPPN'
                      readOnly
                      size='big'
                      placeholder='kode KPPN...'
                      name='kdkppn' 
                      type='text'
                      value={values.kdkppn}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input 
                      label='Nama KPPN'
                      size='big'
                      placeholder='nama KPPN...'
                      name='nama' 
                      type='text'
                      value={values.nama}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Field >
                  <Form.Field>
                    <Input 
                      label='Satker DJBC'
                      size='big'
                      placeholder='kode satker DJBC...'
                      name='djbc' 
                      type='text'
                      value={values.djbc}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Field >
                  <Form.Field>
                    <Input 
                      label='Satker DJP'
                      size='big'
                      placeholder='kode satker DJP...'
                      name='djp' 
                      type='text'
                      value={values.djp}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Field >
                  <Form.Field>
                    <Input 
                      label='Satker DJPK'
                      size='big'
                      placeholder='kode satker DJPK...'
                      name='djpk' 
                      type='text'
                      value={values.djpk}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Field >
                  <Form.Field>
                    <Input 
                      label='Satker DJPPR'
                      size='big'
                      placeholder='kode satker DJPPR...'
                      name='djppr' 
                      type='text'
                      value={values.djppr}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Field >
                  <Form.Field>
                    <Button
                      fluid
                      size='big'
                      type='submit' 
                      content='Submit'
                      primary
                      onClick={handleSubmit}
                    />
                  </Form.Field>
                </Form>
              )}}
            </Formik>
            { this.state.message.display ? 
              (<Message attached='bottom' color={ this.state.message.color }>
                {this.state.message.message}
              </Message>) : null
            }
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Profil;