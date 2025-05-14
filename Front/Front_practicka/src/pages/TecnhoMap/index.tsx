// ✅ ОБНОВЛЕННЫЙ КОД ДЛЯ СТРАНИЦЫ ТЕХНОЛОГИЧЕСКОЙ КАРТЫ

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button, Table, Modal, Form, InputNumber,
  Select, message, Space, Popconfirm, Input
} from 'antd';
import * as XLSX from 'xlsx';

const { Option } = Select;
const { Search } = Input;

const API_BASE = 'http://localhost:5084/api/TechnologicalMap';

const TechnologicalMapPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/GetAll`);
      setData(res.data);
    } catch (err) {
      message.error('Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  const fetchDictionaries = async () => {
    try {
      const [resEquipments, resMaterials] = await Promise.all([
        axios.get('http://localhost:5084/api/Dictionary/GetEquipment'),
        axios.get('http://localhost:5084/api/Dictionary/GetMaterials')
      ]);
      setEquipments(resEquipments.data);
      setMaterials(resMaterials.data);
    } catch (err) {
      message.error('Ошибка при загрузке справочников');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = { ...values };
      if (editingItem) payload.code = editingItem.code;

      const url = editingItem ? `${API_BASE}/Edit` : `${API_BASE}/Add`;
      await axios.post(url, payload);
      message.success(editingItem ? 'Запись обновлена' : 'Запись добавлена');

      setIsModalOpen(false);
      form.resetFields();
      setEditingItem(null);
      fetchData();
    } catch (err) {
      message.error('Ошибка при сохранении');
    }
  };

  const handleDelete = async (code) => {
    try {
      await axios.delete(`${API_BASE}/Delete/${code}`);
      message.success('Запись удалена');
      fetchData();
    } catch (err) {
      message.error('Ошибка при удалении');
    }
  };

  const exportToExcel = () => {
    const exportData = data.map(item => ({
      code: item.code,
      equipment: item.equipment?.name,
      preparedMaterial: item.preparedMaterial?.nameMaterial,
      quantityPreparedMaterial: item.quantityPreparedMaterial,
      rawMaterial: item.rawMaterial?.nameMaterial,
      quantityRawMaterial: item.quantityRawMaterial
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Техкарты');
    XLSX.writeFile(workbook, 'technological_map.xlsx');
  };

  const openModal = (record = null) => {
    setEditingItem(record);
    if (record) {
      form.setFieldsValue({
        equipmentCode: record.equipmentCode,
        preparedMaterialCode: record.preparedMaterialCode,
        quantityPreparedMaterial: record.quantityPreparedMaterial,
        rawMaterialCode: record.rawMaterialCode,
        quantityRawMaterial: record.quantityRawMaterial
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const filteredData = data.filter(item =>
    item.preparedMaterial?.nameMaterial?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.rawMaterial?.nameMaterial?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: 'Код', dataIndex: 'code' },
    { title: 'Оборудование', dataIndex: ['equipment', 'name'] },
    { title: 'Подготовленный материал', dataIndex: ['preparedMaterial', 'nameMaterial'] },
    { title: 'Кол-во подготовленного', dataIndex: 'quantityPreparedMaterial' },
    { title: 'Сырьё', dataIndex: ['rawMaterial', 'nameMaterial'] },
    { title: 'Кол-во сырья', dataIndex: 'quantityRawMaterial' },
    {
      title: 'Действия',
      render: (_, record) => (
        <Space>
          <Button onClick={() => openModal(record)} type="link">Редактировать</Button>
          <Popconfirm
            title="Удалить запись?"
            onConfirm={() => handleDelete(record.code)}
            okText="Да"
            cancelText="Нет"
          >
            <Button danger type="link">Удалить</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  useEffect(() => {
    fetchData();
    fetchDictionaries();
  }, []);

  return (
    <div className="p-6">
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => openModal()}>Добавить</Button>
        <Button onClick={exportToExcel}>Экспорт в Excel</Button>
        <Search placeholder="Поиск по материалу" onSearch={setSearchText} allowClear style={{ width: 300 }} />
      </Space>

      <Table
        rowKey="code"
        loading={loading}
        dataSource={filteredData}
        columns={columns}
        bordered
      />

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
          <Form.Item name="equipmentCode" label="Оборудование" rules={[{ required: true }]}> 
            <Select placeholder="Выберите оборудование">
              {equipments.map((item) => (
                <Option key={item.code} value={item.code}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="preparedMaterialCode" label="Подготовленный материал" rules={[{ required: true }]}> 
            <Select placeholder="Выберите материал">
              {materials.map((item) => (
                <Option key={item.code} value={item.code}>{item.nameMaterial}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="quantityPreparedMaterial" label="Кол-во подготовленного материала" rules={[{ required: true }]}> 
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="rawMaterialCode" label="Сырьё" rules={[{ required: true }]}> 
            <Select placeholder="Выберите сырьё">
              {materials.map((item) => (
                <Option key={item.code} value={item.code}>{item.nameMaterial}</Option>
              ))}
            </Select>
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
