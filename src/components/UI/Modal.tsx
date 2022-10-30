import { Button, Modal } from "antd";
import { useState } from "react";

const DeleteModal: React.FC = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
    return (
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className='modalBody'>
                Do you really want to delete?
            </div>
        </Modal>
    )
}

export default DeleteModal;