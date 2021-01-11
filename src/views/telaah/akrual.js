import React from 'react';
import { Message, Table } from 'semantic-ui-react';
import wrapper from './wrapper';

function Akrual(props) {
  console.log(props);
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
            props.content.map(item => (
              <Table.Row key={item.pertanyaan.nomor}>
                <Table.Cell textAlign='center'>{ item.pertanyaan.nomor }</Table.Cell>
                <Table.Cell>{ item.pertanyaan.pertanyaan }</Table.Cell>
                <Table.Cell style={{color: '#fff', backgroundColor: item.jawaban ? '#1A9637' : '#db2828', textAlign:'center' }}>{ item.jawaban ? 'Ya' : 'Tidak' }</Table.Cell>
              </Table.Row>
            ))
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
  'akrual',
  'TELAAH DATA NERACA LAJUR DETAIL PER SEGMEN SATKER (LEDGER AKRUAL)',
  Akrual
);

export default WrappedAkrual;