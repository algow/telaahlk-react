import React from 'react';
import { Table } from 'semantic-ui-react';

function Keterangan(props) {
  return (
    <Table color='red' celled>
      <Table.Header>
        <Table.Row textAlign='center'>
          <Table.HeaderCell>Kode Satker</Table.HeaderCell>
          <Table.HeaderCell>Kode Akun</Table.HeaderCell>
          <Table.HeaderCell>Deskripsi Akun</Table.HeaderCell>
          <Table.HeaderCell>Saldo Awal</Table.HeaderCell>
          <Table.HeaderCell>Aktivitas</Table.HeaderCell>
          <Table.HeaderCell>Saldo Akhir</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          props.data.kesalahan.map((item, key) => {
            return (
              <Table.Row key={key}>
                <Table.Cell textAlign='center'>{item.satker}</Table.Cell>
                <Table.Cell textAlign='center'>{item.akun}</Table.Cell>
                <Table.Cell textAlign='center'>{item.deskripsi}</Table.Cell>
                <Table.Cell textAlign='right'>{item.saldo_awal.toLocaleString()}</Table.Cell>
                <Table.Cell textAlign='right'>{item.aktivitas.toLocaleString()}</Table.Cell>
                <Table.Cell textAlign='right'>{item.saldo_akhir.toLocaleString()}</Table.Cell>
              </Table.Row>
            )
          })
        }  
      </Table.Body>
    </Table>
  );
}

export default Keterangan;