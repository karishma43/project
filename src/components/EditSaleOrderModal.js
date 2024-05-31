import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Select } from 'chakra-react-select';

const EditSaleOrderModal = ({ isOpen, onClose, orderData }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: orderData,
  });
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (updatedOrder) => axios.put(`/api/sale-orders/${orderData.id}`, updatedOrder),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('saleOrders');
      },
    }
  );

  const onSubmit = (data) => {
    mutation.mutate(data);
    reset();
    onClose();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={4}>
        <FormLabel>Customer ID</FormLabel>
        <Controller
          name="customer_id"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Invoice No</FormLabel>
        <Controller
          name="invoice_no"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Invoice Date</FormLabel>
        <Controller
          name="invoice_date"
          control={control}
          render={({ field }) => <DatePicker {...field} selected={field.value} />}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Products</FormLabel>
        <Controller
          name="products"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              options={[
                { value: 'product1', label: 'Product 1' },
                { value: 'product2', label: 'Product 2' },
              ]}
            />
          )}
        />
      </FormControl>
      <Button type="submit" colorScheme="blue">Update</Button>
    </Box>
  );
};

export default EditSaleOrderModal;
