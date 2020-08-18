import React from 'react';
import { Table } from 'semantic-ui-react';
import wrapper from './wrapper';

function Akrual(props) {
  return (
    <Table selectable style={{ fontSize: 18 }}>
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
              <Table.Cell style={{color: '#fff', backgroundColor: item.jawaban ? 'green' : 'red', textAlign:'center' }}>{ item.jawaban ? 'Ya' : 'Tidak' }</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
  )
}

const WrappedAkrual = wrapper(
  'akrual',
  'TELAAH DATA NERACA LAJUR DETAIL PER SEGMEN SATKER (LEDGER AKRUAL)',
  Akrual
);

export default WrappedAkrual;