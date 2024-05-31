import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Box, Button, Input, FormControl, FormLabel, Select, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Select as ChakraSelect } from 'chakra-react-select';

// Function to fetch customers
const fetchCustomers = async () => {
  const { data } = await axios.get('/api/customers');
  return data;
};

// Function to fetch products
const fetchProducts = async () => {
  const { data } = await axios.get('/api/products');
  return data;
};

const SaleOrderForm = ({ onClose, onRefresh }) => {
  const { handleSubmit, control, reset } = useForm();
  const queryClient = useQueryClient();

  const {
    data: customers,
    isLoading: customersLoading,
    error: customersError,
  } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const mutation = useMutation({
    mutationFn: (newOrder) => axios.post('/api/sale-orders', newOrder),
    onSuccess: () => {
      queryClient.invalidateQueries('saleOrders');
      onRefresh();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
    reset();
    onClose();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={4}>
        <FormLabel>Customer</FormLabel>
        {customersLoading ? (
          <Spinner />
        ) : customersError ? (
          <Text color="red.500">Error loading customers</Text>
        ) : (
          <Controller
            name="customer_id"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                {customers?.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </Select>
            )}
          />
        )}
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
        {productsLoading ? (
          <Spinner />
        ) : productsError ? (
          <Text color="red.500">Error loading products</Text>
        ) : (
          <Controller
            name="items"
            control={control}
            render={({ field }) => (
              <ChakraSelect
                {...field}
                isMulti
                options={products?.map((product) => ({
                  label: product.name,
                  value: product.id,
                }))}
              />
            )}
          />
        )}
      </FormControl>
      <Button type="submit" colorScheme="blue">Submit</Button>
    </Box>
  );
};

export default SaleOrderForm;
