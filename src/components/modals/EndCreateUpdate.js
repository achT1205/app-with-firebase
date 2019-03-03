import React from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, NavLink } from 'mdbreact';
import { withNamespaces } from 'react-i18next';

const EndCreateUpdate = ({ toggle, modal, isUpdating, actions }) => {

    const message = isUpdating ? "Your post has been updated succefuly :)"
        : "Your post has been create succefuly :)";

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
                {message}
            </ModalBody>
            <ModalFooter>
                <NavLink to={`/create`}>
                    <Button color="primary">Create a new</Button>
                </NavLink>
                {' '}
                <Button className="float-left" color="secondary" onClick={toggle}>Modify</Button>
                {' '}
                <NavLink to="/manage">
                    <Button color="primary">Go to my list</Button>
                </NavLink>
            </ModalFooter>
        </Modal>
    );
}
const EndCreateUpdateWrapped = withNamespaces()(EndCreateUpdate);
export default EndCreateUpdateWrapped
