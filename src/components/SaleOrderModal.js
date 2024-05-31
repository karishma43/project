import React from 'react';
import SaleOrderForm from './SaleOrderForm';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button } from '@chakra-ui/react';

const SaleOrderModal = ({ order, onSave, onClose }) => {
  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{order ? 'Edit Sale Order' : 'New Sale Order'}</ModalHeader>
        <ModalBody>
          <SaleOrderForm order={order} onSave={onSave} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderModal;
