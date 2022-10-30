import React, { useEffect, useState } from 'react';
import classes from './userTable.module.css';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import DeleteModal from '../UI/Modal';

interface UserDataType {
  key: string;
  id: string;
  title: string;
  description: string;
}

const UserTable: React.FC = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState<UserDataType[]>([]);

  useEffect(() => {
    fetchDataHandler();
  }, []);

  const fetchDataHandler = async () => {
    const response = await fetch(
      'https://tasks-8c581-default-rtdb.firebaseio.com/tasks.json'
    );
    const responseData = await response.json();
    // console.log(responseData, 'aako data');

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

  const deleteHandler = async (id: string) => {
    console.log('delete han chito');
    await fetch(
      'https://tasks-8c581-default-rtdb.firebaseio.com/tasks/' + id + '.json',
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
              deleteHandler(user.id);
            }}
          />
        </Space>
      ),
    },
  ];

  // const addHandler = () => {

  //     console.log('button chalena');
  //     navigate("/");

  // }

  return (
    <>
      <div className={classes.title}>
        <h1>List of Users</h1>
        <Button onClick={() => navigate('/createUser')}>Add New</Button>
      </div>
      <Table columns={columns} dataSource={userData} />
      <DeleteModal></DeleteModal>
    </>
  );
};

export default UserTable;
