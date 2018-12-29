import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'mdbreact';
import { withNamespaces } from 'react-i18next';

const DeleteConfirmation = ({ toggle, modal, deleteConfirmed }) => {

    const message = "Are you sure you want to delete this item ?";

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
            <ModalBody>
                {message}
            </ModalBody>
            <ModalFooter>
                <Button className="float-left" color="secondary" onClick={toggle}>No</Button>
                <Button className="float-right" color="primary" onClick={deleteConfirmed}>Yes</Button>
            </ModalFooter>
        </Modal>
    );
}
const DeleteConfirmationWrapped = withNamespaces()(DeleteConfirmation);
export default DeleteConfirmationWrapped
