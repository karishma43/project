import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 500 });

const customers = [
  {
    id: 11908,
    name: 'Ram',
    color: [182, 73, 99],
    email: 'jesus_christ@church.com',
    pincode: 'Mumbai',
    location_name: 'Mumbai, Maharashtra, India',
    type: 'C',
    profile_pic: null,
    gst: '',
  },
];

const products = [
  {
    id: 209,
    display_id: 8,
    owner: 1079,
    name: 'New Product',
    category: 'The god of War',
    characteristics: 'New Product Characteristics',
    features: '',
    brand: 'New Product Brand',
    sku: [
      {
        id: 248,
        selling_price: 54,
        max_retail_price: 44,
        customer: 11908,
        amount: 33,
        unit: 'kg',
        quantity_in_inventory: 0,
        product: 209,
      },
      {
        id: 247,
        selling_price: 32,
        max_retail_price: 32,
        amount: 33,
        unit: 'kg',
        quantity_in_inventory: 0,
        product: 209,
      },
      {
        id: 246,
        selling_price: 23,
        max_retail_price: 21,
        amount: 22,
        unit: 'kg',
        quantity_in_inventory: 1,
        product: 209,
      },
    ],
    updated_on: '2024-05-24T12:46:41.995873Z',
    adding_date: '2024-05-24T12:46:41.995828Z',
  },
];

const saleOrders = [];

mock.onGet('/api/customers').reply(200, customers);

mock.onGet('/api/products').reply(200, products);

mock.onGet('/api/sale-orders').reply((config) => {
  const { status } = config.params;
  const filteredOrders = saleOrders.filter((order) =>
    status === 'active' ? !order.paid : order.paid
  );
  return [200, filteredOrders];
});

mock.onPost('/api/sale-orders').reply((config) => {
  const newOrder = JSON.parse(config.data);
  saleOrders.push(newOrder);
  return [201, newOrder];
});

mock.onPut(/\/api\/sale-orders\/\d+/).reply((config) => {
  const id = parseInt(config.url.split('/').pop(), 10);
  const updatedOrder = JSON.parse(config.data);
  const index = saleOrders.findIndex((order) => order.id === id);
  saleOrders[index] = updatedOrder;
  return [200, updatedOrder];
});

export default axios;
