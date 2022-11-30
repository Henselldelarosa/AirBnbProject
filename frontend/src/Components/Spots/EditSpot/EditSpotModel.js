import React, { useState } from 'react';
import { Modal } from '../../../model/Modal'
import EditASpotForm from './EditASpotForm';
import './EditASpotForm';


function EditASpotModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='edit-spot-button' onClick={() => setShowModal(true)}>Update</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditASpotForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    )
}

export default EditASpotModal;
