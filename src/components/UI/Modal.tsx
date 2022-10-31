import { Button, Modal } from "antd";
import { useState } from "react";

const DeleteModal: React.FC<any> = (props) => {
    // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
    return (
        <Modal open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>
            <div className='modalBody'>
                Do you really want to delete?
            </div>
        </Modal>
    )
}

export default DeleteModal;