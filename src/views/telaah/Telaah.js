import React, {Component} from 'react';
import {
  Button,
  Header,
  Icon,
  Segment,
  Dropdown
} from 'semantic-ui-react';
import { download } from '../../api';
import { getTelaah } from '../../actions/telaah';
import WrappedAkrual from './akrual';
import WrappedKas from './kas';
import WrappedAkrualKas from './akrualkas';

class Telaah extends Component{
  constructor(props) {
    super(props);
    this.state = {
      bulan: 0,
      message: '',
      file: '',
      segmen_satker: {
        Cash_SATKER: [],
        Accrual_SATKER: []
      },
      akrualkas: []
    }
  }

  componentDidUpdate() {
    console.log(1)
    if(this.state.bulan !== 0) {
      getTelaah(this.state.bulan).then(res => {
        if(res.file !== this.state.file){
          this.setState({
            message: res.message,
            file: res.file,
            segmen_satker: {
              Cash_SATKER: res.segmen_satker[0].body,
              Accrual_SATKER: res.segmen_satker[1].body
            },
            akrualkas: res.akrualkas
          });
        }
      }).catch(err => {
        if(this.state.message !== 'error') {
          this.setState({ message: 'error' });
        }
      });
    }
  }

  render() {
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
      <Segment>
        <Header as='h2' attached='top' textAlign='left'>
          <Icon name='table' />
          Telaah Neraca Lajur
        </Header>
        <Segment.Group>
          <Segment>
            <label>Bulan: </label>
            <Dropdown placeholder='Pilih bulan' selection options={bulanOptions} onChange={ (e, {value}) => {
              e.persist();
              this.setState({bulan: value})
            } }/>
            <Button icon labelPosition='left' size='big' color='blue' floated='right' onClick={ () => window.open(download + this.state.file)}>
              <Icon name='file excel outline' />
              Download Excel
            </Button>
          </Segment>
          <Segment>
            <WrappedAkrual content={this.state.segmen_satker.Accrual_SATKER} />
          </Segment>
          <Segment>
            <WrappedKas content={this.state.segmen_satker.Cash_SATKER} />
          </Segment>
          <Segment>
            <WrappedAkrualKas content={this.state.akrualkas} />
          </Segment>
        </Segment.Group>
      </Segment>
    )
  }
}

export default Telaah;