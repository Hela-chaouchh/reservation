import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CustomAlert = ({ show, message, onClose }) => {
    return (
        <div >
        <Modal show={show} onHide={onClose} className='alerte'>
            <Modal.Body>
                <div className="custom-alert text-danger fw-bold">
                    {message}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
};
export default CustomAlert;