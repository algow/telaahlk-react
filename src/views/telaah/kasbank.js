import React from 'react';
import { Message, Table, Icon } from 'semantic-ui-react';
import wrapper from './wrapper';
import Keterangan from './keterangan';

function Kasbank(props) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Table selectable style={{ fontSize: 14 }}>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>Nomor</Table.HeaderCell>
            <Table.HeaderCell>Indikator</Table.HeaderCell>
            <Table.HeaderCell>Hasil</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={3} style={{fontWeight: 'bold'}}>Dengan terlebih dahulu melakukan filter pada segmen akun yaitu hanya memilik akun 111121, 1112XX, 1114XX, 111822, dan 111911 maka:</Table.Cell>
          </Table.Row>
          {
            props.content.map((item, key) => {
              if(key === 16) {
                return(
                  <React.Fragment key={key}>
                    <Table.Row>
                      <Table.Cell colSpan={3} style={{fontWeight: 'bold'}}>Tanpa melakukan filter pada segmen akun maka:</Table.Cell>
                    </Table.Row>
                    <Table.Row 
                      onClick={ () => props.onKeteranganChange(key) }
                      style={
                        item.jawaban ?
                        {cursor: 'default'} :
                        {cursor: 'pointer'}
                      }
                    >
                      <Table.Cell textAlign='center'>{ item.pertanyaan.nomor }</Table.Cell>
                      <Table.Cell>{ item.pertanyaan.pertanyaan }</Table.Cell>
                      <Table.Cell 
                        style={{color: '#fff', backgroundColor: item.jawaban ? '#1A9637' : '#db2828', textAlign:'center' }}
                      >
                        {
                          item.jawaban ? 
                            'Ya' 
                            :
                            <div>
                              <Icon name='toggle down' />
                              Tidak
                            </div>
                        }
                      </Table.Cell>
                    </Table.Row>

                    {
                      (!item.jawaban && props.keterangan[key] && item.kesalahan) ?
                      <Table.Row>
                        <Table.Cell colSpan='3'>
                          <Keterangan data={item} />
                        </Table.Cell>
                      </Table.Row> :
                      null 
                    }

                  </React.Fragment>
                )
              }

              return(
                <React.Fragment key={key}>
                  <Table.Row 
                    onClick={ () => props.onKeteranganChange(key) }
                    style={
                      item.jawaban ?
                      {cursor: 'default'} :
                      {cursor: 'pointer'}
                    }  
                  >
                    <Table.Cell textAlign='center'>{ item.pertanyaan.nomor }</Table.Cell>
                    <Table.Cell>{ item.pertanyaan.pertanyaan }</Table.Cell>
                    <Table.Cell style={{color: '#fff', backgroundColor: item.jawaban ? '#1A9637' : '#db2828', textAlign:'center' }}>
                      { 
                        item.jawaban ? 
                        'Ya' : 
                        <div>
                          <Icon name='toggle down' />
                          Tidak
                        </div> 
                        }
                    </Table.Cell>
                  </Table.Row>

                  {
                    (!item.jawaban && props.keterangan[key] && item.kesalahan) ?
                    <Table.Row>
                      <Table.Cell colSpan='3'>
                        <Keterangan data={item} />
                      </Table.Cell>
                    </Table.Row> :
                    null                  
                  }
                </React.Fragment>
              )
            })
          }
        </Table.Body>
      </Table>
      {
        (props.content.length === 0) ?
        <Message attached='bottom' color='red'>
          Pilih bulan
        </Message> :
        null
      }
    </div>
  )
}

const WrappedAkrual = wrapper(
  'kasbank',
  'TELAAH DATA NERACA LAJUR DETAIL PER SEGMEN BANK (LEDGER KAS)',
  Kasbank
);

export default WrappedAkrual;