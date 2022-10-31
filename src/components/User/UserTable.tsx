import React, { useEffect, useState } from 'react';
import classes from './userTable.module.css';
import { Button, Space, Table, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../UI/Modal';

interface UserDataType {
  key: string;
  id: string;
  title: string;
  description: string;
}

const UserTable: React.FC = () => {
  let navigate = useNavigate();
  const [taskId, setTaskId] = useState<string>("");
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDataType[]>([]);

  useEffect(() => {
    fetchDataHandler();
  }, []);

  const fetchDataHandler = async () => {
    const response = await fetch(
      'https://tasks-8c581-default-rtdb.firebaseio.com/tasks.json'
    );
    const responseData = await response.json();

    const loadedTasks = [];

    for (const key in responseData) {
      loadedTasks.push({
        key: key,
        id: key,
        title: responseData[key].title,
        description: responseData[key].description,
      });
    }

    setUserData(loadedTasks);
  };

  const deleteTaskHandler = (id : string) => {
    setIsModalOpen(true);
    setTaskId(id);
  }

  const closeModal = () => setIsModalOpen(false);

  const deleteHandler = async(taskId: string) => {
    setIsModalOpen(false);
    await fetch(
      'https://tasks-8c581-default-rtdb.firebaseio.com/tasks/' + taskId + '.json',
      {
        method: 'DELETE',
      }
    );
    fetchDataHandler();
  };

  const columns: ColumnsType<UserDataType> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (user) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              navigate(`/${user.id}/edit`);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              console.log(user.id);
              deleteTaskHandler(user.id);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className={classes.title}>
        <h1>List of Users</h1>
        <Button onClick={() => navigate('/createUser')}>Add New</Button>
      </div>
      <Table columns={columns} dataSource={userData} />
      <Modal open={isModalOpen} onOk={() => deleteHandler(taskId)} onCancel={closeModal}>
            <div className='modalBody'>
                Do you really want to delete?
            </div>
        </Modal>
    </>
  );
};

export default UserTable;
