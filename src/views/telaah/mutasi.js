import React from 'react';
import { Table } from 'semantic-ui-react';
import wrapper from './wrapper';

function Mutasi(props) {
  return (
    <Table selectable style={{ fontSize: 14 }} inverted color='grey'>
      <Table.Header>
        <Table.Row textAlign='center'>
          <Table.HeaderCell rowSpan='2'>Indikator</Table.HeaderCell>
          <Table.HeaderCell colSpan='2'>Ledger Akrual</Table.HeaderCell>
          <Table.HeaderCell colSpan='2'>Ledger Kas</Table.HeaderCell>
        </Table.Row>
        <Table.Row textAlign='center'>
          <Table.HeaderCell>Akun</Table.HeaderCell>
          <Table.HeaderCell>Mutasi</Table.HeaderCell>
          <Table.HeaderCell>Akun</Table.HeaderCell>
          <Table.HeaderCell>Mutasi</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          props.content.map(kategori => (
            kategori.body.map(akun => (
              akun.body.map(item => (
                <Table.Row key={item._id} style={{backgroundColor: (item.nilai !== 0) && '#484848'}}>
                  <Table.Cell>{item.desc}</Table.Cell>
                  <Table.Cell textAlign="center">{item.ledger === 'Accrual_SATKER' && item.akun}</Table.Cell>
                  <Table.Cell textAlign="right">{item.ledger === 'Accrual_SATKER' && item.nilai.toLocaleString('en-US')}</Table.Cell>
                  <Table.Cell textAlign="center">{item.ledger === 'Cash_SATKER' && item.akun}</Table.Cell>
                  <Table.Cell textAlign="right">{item.ledger === 'Cash_SATKER' && item.nilai.toLocaleString('en-US')}</Table.Cell>
                </Table.Row>
              ))
            ))
          ))
        }
      </Table.Body>
    </Table>
  )
}

const WrappedMutasi = wrapper(
  'mutasi',
  'TELAAH AKURASI POS KAS DI BP, KAS BLU, DAN KAS HIBAH',
  Mutasi
);

export default WrappedMutasi;