import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

interface UserDataType {
    title : string;
    description : string;
} 

const UserTable : React.FC = () => {
    let navigate = useNavigate();
    const [userData, setUserData] = useState<UserDataType[]>([]);

    useEffect(() => {
        fetchDataHandler();
    },[]);

    const fetchDataHandler = async() => {
        const response = await fetch('https://tasks-8c581-default-rtdb.firebaseio.com/tasks.json');
        const responseData = await response.json();
        // console.log(responseData, 'aako data');

        const loadedTasks = [];

        for( const key in responseData){
          loadedTasks.push({
            id: key,
            title: responseData[key].title,
            description: responseData[key].description,
          })
        }

        setUserData(loadedTasks);
    }

    const deleteHandler = async() => {
      console.log('delete han chito');
      await fetch('https://tasks-8c581-default-rtdb.firebaseio.com/tasks.json', {
        method: 'DELETE',
      });
    }

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
          render: (index) => (
            <Space size="middle">
              <EditOutlined />
              <DeleteOutlined onClick={() => {
                console.log(index);
                // deleteHandler();
              }}/>
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
        <div className="title">
          <h1>List of Users</h1>
          <Button onClick={() => navigate("/user")}>Add New</Button>
        </div>
        <Table columns={columns} dataSource={userData} />
      </>
    )
}

export default UserTable;