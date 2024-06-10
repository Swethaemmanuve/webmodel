import React, { useState } from 'react';
import "./App.css"
import axios from 'axios'
import { Button, Modal, Input, Table, Space } from 'antd';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const [formValue, setFormValue] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    status: ''
  });
  const [editUserId, setEditUserId] = useState(null);
  const [message, setMessage] = useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    addUser(input1, input2, input3);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingUser(null); 
  };

  const handleInputChange1 = (e) => {
    setInput1(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setInput2(e.target.value);
  };

  const handleInputChange3 = (e) => {
    setInput3(e.target.value);
  };

  const addUser = (input1, input2, input3) => {
    if (input1 && input2 && input3) {
      const newUser = { input1, input2, input3 };
      if (editingUser) {
        try {
          const response = axios.post('http://localhost:5000/api/adduser', formValue);
          setMessage(response.data.message || 'User added successfully');
          
        } catch (error) {
          console.error('Error adding user:', error);
          setMessage('Some error occurred');
        }
        // Update existing user
        const updatedData = data.map(user => {
          if (user === editingUser) {
            return newUser;
          }
          return user;
        });
        setData(updatedData);
        setEditingUser(null); // Reset editing user state
      } else {
        // Add new user
        setData([...data, newUser]);
      }
      setInput1('');
      setInput2('');
      setInput3('');
    }
  };

  const handleEdit = async (record) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/updateuser/${editUserId}`, formValue);
      setMessage(response.data.message || 'User updated successfully');
      setInput1(record.input1);
      setInput2(record.input2);
      setInput3(record.input3);
      setEditingUser(record);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Some error occurred');
    }
  };
  
  
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/deleteuser/${id}`);
      setMessage(response.data.message || 'User deleted successfully');
      setData(); // Assuming this function sets your data after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Some error occurred');
    }
  };
  

  const columns = [
    {
      title: 'Name',
      dataIndex: 'input1',
      key: 'input1',
    },
    {
      title: 'Email',
      dataIndex: 'input2',
      key: 'input2',
    },
    {
      title: ' Address',
      dataIndex: 'input3',
      key: 'input3',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className='cont'>
      <Button type='primary' style={{marginTop:'2%'}}  onClick={showModal}>Add</Button>
      <br></br>
      <Modal title={editingUser ? "Edit user" : "Add user"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input value={input1} onChange={handleInputChange1} placeholder=" Name" style={{ marginBottom: '10px' }} />
        <Input value={input2} onChange={handleInputChange2} placeholder="Email" style={{ marginBottom: '10px' }} />
        <Input value={input3} onChange={handleInputChange3} placeholder="Address" style={{ marginBottom: '10px' }} />
      </Modal>
      <Table style={{marginTop:'5%',marginLeft:'2%',marginRight:'2%'}} dataSource={data} columns={columns} />
    </div>
  );
};

export default App;
