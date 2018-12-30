import React from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'mdbreact';
import { withNamespaces } from 'react-i18next';

const EndCreateUpdate = ({ toggle, modal, isUpdating , actions}) => {

    const message = isUpdating ? "Your post has been updated succefuly :)"
        : "Your post has been create succefuly :)";

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
                {message}
            </ModalBody>
            <ModalFooter>
                <Button className="float-left" color="secondary" onClick={() =>actions(1)}>Create a new</Button>
                <Button color="primary" onClick={() =>actions(2)}>Modify</Button>{' '}
                <Button color="primary" onClick={() =>actions(3)}>Go to my list</Button>
            </ModalFooter>
        </Modal>
    );
}
const EndCreateUpdateWrapped = withNamespaces()(EndCreateUpdate);
export default EndCreateUpdateWrapped
