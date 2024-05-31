import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Spinner, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import axios from 'axios';

const fetchSaleOrders = async (status) => {
  const { data } = await axios.get('/api/sale-orders', { params: { status } });
  return data;
};

const SaleOrderList = ({ status, refresh }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['saleOrders', status, refresh],
    queryFn: () => fetchSaleOrders(status),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Box>Error loading sale orders</Box>;
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Customer ID</Th>
          <Th>Invoice No</Th>
          <Th>Invoice Date</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((order) => (
          <Tr key={order.id}>
            <Td>{order.customer_id}</Td>
            <Td>{order.invoice_no}</Td>
            <Td>{order.invoice_date}</Td>
            <Td>
              <Button>Edit</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default SaleOrderList;
