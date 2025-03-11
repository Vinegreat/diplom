import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, InputNumber, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const TechnologicalMapPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5084/api/TechnologicalMap/GetAll');
      setData(response.data);
    } catch (error) {
      message.error('Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    form.setFieldsValue({
      ...record,
      equipmentCode: record.equipment?.code,
      preparedMaterialCode: record.preparedMaterial?.code,
      rawMaterialCode: record.rawMaterial?.code
    });
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingItem) {
        await axios.post('http://localhost:5084/api/TechnologicalMap/Edit', {
          code: editingItem.code,
          ...values
        });
        message.success('Успешно отредактировано');
      } else {
        await axios.post('http://localhost:5084/api/TechnologicalMap/Add', values);
        message.success('Успешно добавлено');
      }
      setIsModalVisible(false);
      fetchData();
    } catch (error) {
      message.error('Ошибка при сохранении');
    }
  };

  const columns = [
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Оборудование',
      dataIndex: ['equipment', 'name'],
      key: 'equipmentName',
    },
    {
      title: 'Подготовленный материал',
      dataIndex: ['preparedMaterial', 'nameMaterial'],
      key: 'preparedMaterialName',
    },
    {
      title: 'Кол-во подготовленного материала',
      dataIndex: 'quantityPreparedMaterial',
      key: 'quantityPreparedMaterial',
    },
    {
      title: 'Сырьё',
      dataIndex: ['rawMaterial', 'nameMaterial'],
      key: 'rawMaterialName',
    },
    {
      title: 'Кол-во сырья',
      dataIndex: 'quantityRawMaterial',
      key: 'quantityRawMaterial',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Редактировать
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <Button type="primary" onClick={handleAdd} className="mb-4">
        Добавить запись
      </Button>
      <Table columns={columns} dataSource={data} rowKey="code" loading={loading} />

      <Modal
        title={editingItem ? 'Редактирование записи' : 'Добавление записи'}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="equipmentCode" label="Код оборудования" rules={[{ required: true }]}> 
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="preparedMaterialCode" label="Код подготовленного материала" rules={[{ required: true }]}> 
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="quantityPreparedMaterial" label="Кол-во подготовленного материала" rules={[{ required: true }]}> 
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="rawMaterialCode" label="Код сырья" rules={[{ required: true }]}> 
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="quantityRawMaterial" label="Кол-во сырья" rules={[{ required: true }]}> 
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TechnologicalMapPage;
