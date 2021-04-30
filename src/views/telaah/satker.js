import React from 'react';
import { Message, Table, Icon } from 'semantic-ui-react';
import wrapper from './wrapper';
import Keterangan from './keterangan';

function Satker(props) {
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
          {
            props.content.map((item, key) => {
              return(
              <React.Fragment key={key}>
                <Table.Row
                  onClick={ () => props.onKeteranganChange(key) }
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
                          <Icon name='angle double down' />
                          Tidak
                        </div>
                    }
                  </Table.Cell>
                </Table.Row>

                {
                  (!item.jawaban && 
                    props.keterangan[key]
                  ) ? 
                  <Table.Row>
                    <Table.Cell colSpan='3'>
                      <Keterangan data={item} />
                    </Table.Cell>
                  </Table.Row> :
                  null
                }

              </React.Fragment>  
            )})
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

export const WrappedAkrual = wrapper(
  'akrual',
  'TELAAH DATA NERACA LAJUR DETAIL PER SEGMEN SATKER (LEDGER AKRUAL)',
  Satker
);

export const WrappedKas = wrapper(
  'kas',
  'TELAAH DATA NERACA LAJUR DETAIL PER SEGMEN SATKER (LEDGER KAS)',
  Satker
);