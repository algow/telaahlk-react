import React from 'react';
import { Table } from 'semantic-ui-react';
import wrapper from './wrapper';

function AkrualKas(props) {
  return (
    <Table selectable style={{ fontSize: 14 }} inverted>
      <Table.Header>
        <Table.Row textAlign='center'>
          <Table.HeaderCell rowSpan='2'>Indikator</Table.HeaderCell>
          <Table.HeaderCell colSpan='2'>Ledger Kas</Table.HeaderCell>
          <Table.HeaderCell colSpan='2'>Ledger Akrual</Table.HeaderCell>
        </Table.Row>
        <Table.Row textAlign='center'>
          <Table.HeaderCell>Akun</Table.HeaderCell>
          <Table.HeaderCell>Nilai</Table.HeaderCell>
          <Table.HeaderCell>Akun</Table.HeaderCell>
          <Table.HeaderCell>Nilai</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          props.content.map(kategori => (
            kategori.body.map(akun => (
              akun.body.map(item => (
                <Table.Row key={item._id} style={{backgroundColor: (item.nilai !== 0) && '#616161'}}>
                  <Table.Cell>{item.desc}</Table.Cell>
                  <Table.Cell textAlign="center">{item.ledger === 'kas' && item.akun}</Table.Cell>
                  <Table.Cell textAlign="right">{item.ledger === 'kas' && item.nilai.toLocaleString('en-US')}</Table.Cell>
                  <Table.Cell textAlign="center">{item.ledger === 'akrual' && item.akun}</Table.Cell>
                  <Table.Cell textAlign="right">{item.ledger === 'akrual' && item.nilai.toLocaleString('en-US')}</Table.Cell>
                </Table.Row>
              ))
            ))
          ))
        }
      </Table.Body>
    </Table>
  )
}

const WrappedAkrualKas = wrapper(
  'akrualkas',
  'TELAAH DATA NERACA LAJUR DETAIL PER SEGMEN SATKER (LEDGER AKRUAL VS KAS)',
  AkrualKas
);

export default WrappedAkrualKas;