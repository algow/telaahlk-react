import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Segment,
  Message
} from 'semantic-ui-react';
import { download_format, satker_download } from '../api';
import { Formik } from 'formik';
import { postSatker, getSatker } from '../actions/satker';

class Satker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button_disabled: false,
      message: {
        display: false,
        color: '',
        message: '',
      },
      file_satker: {
        exist: false
      }
    }
  }

  componentDidMount() {
    getSatker().then(res => {
      this.setState({
        file_satker: {
          exist: true,
          ...res.data
        }
      });
      console.log(res);
    }).catch(err => {
      this.setState({
        file_satker: {
          exist: false
        }
      });
    });
  }

  render(){
    return(
      <Grid
        textAlign='center'
        style={{ height: '100%', marginTop: '0' }}
        verticalAlign='middle'
      >
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 800 }}>
            <Header as='h2' attached='top' textAlign='left'>
              <Icon name='users' />
              Profil Satker
            </Header>
            <Segment attached textAlign='left'>
            <Formik
              enableReinitialize={true}
              initialValues={{ satker: null }}
              validate={values => {
                let errors = {};
                if(!values.satker) {
                  errors.satker = 'required';
                }

                return errors;
              }}
              onSubmit={(values, { setSubmiting }) => {
                postSatker(values).then(res => {
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
                });;
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
                    <label>File .csv</label>
                    <input
                      type='file' 
                      name='satker' 
                      onChange={(event) => {
                        setFieldValue("satker", event.currentTarget.files[0]);
                      }} 
                      onBlur={handleBlur}
                    />
                    {
                      errors.satker ? 
                      <Message attached='bottom' color='red'>{errors.satker}</Message> :
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
                        onClick={handleSubmit}
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
              { this.state.message.display ? 
                (<Message attached='bottom' color={ this.state.message.color }>
                  {this.state.message.message}
                </Message>) : null
              }
            </Segment>
            <Segment attached style={{textAlign: 'left', textDecoration: 'underline'}}>
              <p style={{cursor: 'pointer'}} onClick={ () => window.open(download_format) }>
                <Icon name='download' />
                Download Format
              </p>
              {
                (this.state.file_satker.exist) ?
                <React.Fragment>
                  <p style={{cursor: 'pointer'}} onClick={ 
                    () => window.open(satker_download + this.state.file_satker.file) } 
                  >
                    <Icon name='download' />
                    Download Data Eksisting
                  </p>
                  <p>
                    <Icon name='clock outline' />
                    Upload: { this.state.file_satker.timestamp } WIB
                  </p>
                </React.Fragment>
                :
                null
              }
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Satker;