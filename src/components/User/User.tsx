import { Button, Form, Input, Modal } from 'antd';
import { title } from 'process';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type UserDataType = {
  title: string;
  description: string;
};

const User: React.FC = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { userId } = useParams();
  const initialValues = {
    title: '',
    description: '',
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  const fetchUser = async (id: string) => {
    const response = await fetch(
      'https://tasks-8c581-default-rtdb.firebaseio.com/tasks/' + id + '.json'
    );
    const responseData = await response.json();
    form.setFieldsValue(responseData);
  };

  const onFinish = (values: UserDataType) => {
    console.log('Success:', values);
    if (userId) {
      editTaskHandler(userId, values);
    } else {
      createTaskHandler(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const editTaskHandler = async (id: string, values: any) => {
    console.log(values);
    let data = { ...values };
    let response = await fetch(
      `https://tasks-8c581-default-rtdb.firebaseio.com/tasks/${id}.json`,
      {
        method: 'PUT',
        body: JSON.stringify({
          title: values.title,
          description: values.description,
        }),
      }
    );
    navigate('/');
  };

  const createTaskHandler = async (values: any) => {
    await fetch('https://tasks-8c581-default-rtdb.firebaseio.com/tasks.json', {
      method: 'POST',
      body: JSON.stringify({
        title: values.title,
        description: values.description,
      }),
    });
    navigate('/');
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input your title!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input your description!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {/* {user ? "Update" : "Submit"} */}
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default User;
