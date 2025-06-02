import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button, Table, Modal, Form, InputNumber,
  DatePicker, Select, message, Space, Popconfirm, Input
} from 'antd';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';

const { Option } = Select;
const { Search } = Input;

const API_BASE = 'http://localhost:5084/api/RawMaterialArrival';

const RawMaterialArrivalPage = () => {
  const [data, setData] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/GetAll`);
      setData(res.data);
    } catch {
      message.error('Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  const fetchDictionaries = async () => {
    try {
      const [resMaterials, resWarehouses] = await Promise.all([
        axios.get('http://localhost:5084/api/Dictionary/GetMaterials'),
        axios.get('http://localhost:5084/api/Dictionary/GetWareHouse'),
      ]);
      setMaterials(resMaterials.data);
      setWarehouses(resWarehouses.data);
    } catch {
      message.error('Ошибка загрузки справочников');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        date: values.date.format('YYYY-MM-DD') // ✅ правильный формат для DateOnly
      };
      if (editingItem) payload.id = editingItem.id;
  
      await axios.post(`${API_BASE}/${editingItem ? 'Edit' : 'Add'}`, payload);
      message.success(editingItem ? 'Запись обновлена' : 'Запись добавлена');
      setIsModalOpen(false);
      form.resetFields();
      setEditingItem(null);
      fetchData();
    } catch {
      message.error('Ошибка при сохранении');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/Delete/${id}`);
      message.success('Удалено');
      fetchData();
    } catch {
      message.error('Ошибка удаления');
    }
  };

  const exportToExcel = () => {
    const exportData = data.map(item => ({
      date: new Date(item.date).toLocaleDateString(),
      material: item.material?.nameMaterial,
      quantity: item.quantity,
      warehouse: item.warehouse?.name
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Поступление сырья');
    XLSX.writeFile(workbook, 'raw_material_arrival.xlsx');
  };

  const openModal = (record = null) => {
    setEditingItem(record);
    if (record) {
      form.setFieldsValue({
        ...record,
        date: dayjs(record.date)
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchData();
    fetchDictionaries();
  }, []);

  const columns = [
    { title: 'Дата', dataIndex: 'date', render: d => new Date(d).toLocaleDateString() },
    { title: 'Материал', dataIndex: ['material', 'nameMaterial'] },
    { title: 'Кол-во', dataIndex: 'quantity' },
    {
      title: 'Склад',
      dataIndex: 'warehouseCode',
      render: code => {
        const warehouse = warehouses.find(w => w.code === code);
        return warehouse ? warehouse.name : code;
      }
    }
    ,
    {
      title: 'Действия',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>Редактировать</Button>
          <Popconfirm
            title="Удалить запись?"
            onConfirm={() => handleDelete(record.id)}
            okText="Да" cancelText="Нет"
          >
            
          </Popconfirm>
        </Space>
      )
    }
  ];

  const filteredData = data.filter(d =>
    d.material?.nameMaterial?.toLowerCase().includes(searchText.toLowerCase()) ||
    d.warehouse?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6">
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => openModal()}>Добавить</Button>
        <Button onClick={exportToExcel}>Экспорт в Excel</Button>
        <Search placeholder="Поиск" onSearch={setSearchText} allowClear style={{ width: 300 }} />
      </Space>

      <Table rowKey="id" loading={loading} dataSource={filteredData} columns={columns} bordered />

      <Modal
        open={isModalOpen}
        title={editingItem ? 'Редактировать' : 'Добавить'}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingItem(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="date" label="Дата" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="materialCode" label="Материал" rules={[{ required: true }]}>
            <Select>
              {materials.map(m => (
                <Option key={m.code} value={m.code}>{m.nameMaterial}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="quantity" label="Количество" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="warehouseCode" label="Склад" rules={[{ required: true }]}>
            <Select>
              {warehouses.map(w => (
                <Option key={w.code} value={w.code}>{w.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RawMaterialArrivalPage;
