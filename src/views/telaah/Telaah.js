import React, {Component} from 'react';
import {
  Button,
  Header,
  Icon,
  Segment,
  Dropdown,
  Menu
} from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';
import { download } from '../../api';
import { getTelaah } from '../../actions/telaah';
import { WrappedAkrual, WrappedKas } from './satker';
// import WrappedKas from './kas';
import WrappedAkrualKas from './akrualkas';
import WrappedKasBank from './kasbank';
import WrappedMutasi from './mutasi';

class Telaah extends Component{
  constructor() {
    super();
    this.state = {
      modal: false,
      bulan: 0,
      message: '',
      file: '',
      timestamp: '',
      segmen_satker: {
        Cash_SATKER: [],
        Accrual_SATKER: [],
        Cash_BANK: []
      },
      akrualkas: [],
      mutasi: []
    }
  }

  componentDidUpdate() {
    if(this.state.bulan !== 0) {
      getTelaah(this.state.bulan).then(res => {
        if(res.file !== this.state.file){
          this.setState({
            message: res.message,
            file: res.file,
            timestamp: res.timestamp,
            segmen_satker: {
              Cash_SATKER: res.segmen_satker['Cash_SATKER'],
              Accrual_SATKER: res.segmen_satker['Accrual_SATKER'],
              Cash_BANK: res.segmen_satker['Cash_BANK']
            },
            akrualkas: res.akrualkas,
            mutasi: res.mutasi
          });
          toast({
            type: 'success',
            title: 'Berhasil!',
            description: 'Menampilkan telaah bulan ' + this.state.bulan,
            time: 4000
          });
        }
      }).catch(err => {
        if(this.state.message !== 'error') {
          toast({
            type: 'error',
            title: 'Warning!',
            description: 'Telaah bulan ' + this.state.bulan + ' tidak ditemukan',
            time: 4000
          });
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
        
        <Segment style={{paddingTop: '0px', paddingBottom: '0px'}}>
          <Menu secondary>
            <Menu.Item>
              <Icon name='filter' />
              <label>Bulan:  </label>
              <Dropdown placeholder='Pilih bulan' selection options={bulanOptions} onChange={ (e, {value}) => {
                e.persist();
                this.setState({bulan: value})
              } }/>
            </Menu.Item>
          
            <Menu.Item>
              {
                this.state.timestamp ?
                <p>
                  <Icon name='clock outline' />
                  Upload: { this.state.timestamp } WIB
                </p>
                :
                null
              }
            </Menu.Item>

            <Menu.Menu position='right'>
              <Menu.Item>
                <Button icon labelPosition='left' size='big' color='green' floated='right' onClick={ () => window.open(download + this.state.file)}>
                  <Icon name='file excel outline' />
                  Download Excel
                </Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Segment>

        <Segment.Group>
          <Segment>
            <WrappedAkrual content={this.state.segmen_satker.Accrual_SATKER} />
          </Segment>
          <Segment>
            <WrappedKas content={this.state.segmen_satker.Cash_SATKER} />
          </Segment>
          <Segment>
            <WrappedAkrualKas content={this.state.akrualkas} />
          </Segment>
          <Segment>
            <WrappedKasBank content={this.state.segmen_satker.Cash_BANK} />
          </Segment>
          <Segment>
            <WrappedMutasi content={this.state.mutasi} />
          </Segment>
        </Segment.Group>
      </Segment>
    )
  }
}

export default Telaah;