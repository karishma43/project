import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, Box } from '@chakra-ui/react';
import SaleOrderList from '../components/SaleOrderList';
import SaleOrderForm from '../components/SaleOrderForm';
import { useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <Box>
      <Button onClick={onOpen}>+ Sale Order</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Sale Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SaleOrderForm onClose={onClose} onRefresh={handleRefresh} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Tabs>
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SaleOrderList status="active" refresh={refresh} />
          </TabPanel>
          <TabPanel>
            <SaleOrderList status="completed" refresh={refresh} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default HomePage;
