// ✅ ОБНОВЛЕННЫЙ КОД ДЛЯ СТРАНИЦЫ ЗАКАЗОВ С ФИКСОМ ДАТЫ

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button, Table, Modal, Form, InputNumber,
  DatePicker, Select, message, Space, Popconfirm, Input
} from 'antd';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';

const { Option } = Select;
const { Search } = Input;
const API_BASE = 'http://localhost:5084/api/Orders';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchData();
    fetchDictionaries();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/GetAll`);
      setOrders(res.data);
    } catch (err) {
      message.error('Ошибка загрузки заказов');
    } finally {
      setLoading(false);
    }
  };

  const fetchDictionaries = async () => {
    try {
      const [c, m, s] = await Promise.all([
        axios.get('http://localhost:5084/api/Dictionary/GetContractor'),
        axios.get('http://localhost:5084/api/Dictionary/GetMaterials'),
        axios.get('http://localhost:5084/api/Dictionary/GetStaff'),
      ]);
      setContractors(c.data);
      setMaterials(m.data);
      setStaffs(s.data);
    } catch (err) {
      message.error('Ошибка загрузки справочников');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ContractorCode: values.contractorCode,
        MaterialCode: values.materialCode,
        Quantity: values.quantity,
        PlannedCompletionDate: values.plannedCompletionDate?.toISOString(),
        ActualDateCompletion: values.actualDateCompletion?.toISOString() || null,
        StaffCode: values.staffCode,
      };
  
      if (editingOrder) {
        // ВАЖНО: сервер ждёт OrderNumber
        await axios.post(`${API_BASE}/Edit`, {
          OrderNumber: editingOrder.number,
          ...payload,
        });
        message.success('Заказ обновлён');
      } else {
        await axios.post(`${API_BASE}/Add`, payload);
        message.success('Заказ добавлен');
      }
  
      setIsModalOpen(false);
      form.resetFields();
      setEditingOrder(null);
      fetchData();
    } catch (err) {
      console.error(err);
      message.error('Ошибка при сохранении');
    }
  };
  

  const handleDelete = async (number) => {
    try {
      await axios.delete(`${API_BASE}/Delete?number=${number}`);
      message.success(`Заказ №${number} удалён`);
      fetchData();
    } catch (err) {
      message.error('Ошибка удаления');
    }
  };

  const exportToExcel = () => {
    const exportData = orders.map(order => {
      const staffEmail = staffs.find(s => s.code === order.staffCode)?.email || '';
      return {
        number: order.number,
        date: new Date(order.date).toLocaleString(),
        contractor: order.contractor?.name || '',
        material: order.material?.nameMaterial || '',
        quantity: order.quantity,
        plannedCompletionDate: new Date(order.plannedCompletionDate).toLocaleString(),
        actualDateCompletion: new Date(order.actualDateCompletion).toLocaleString(),
        staffEmail
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Заказы');
    XLSX.writeFile(workbook, 'orders.xlsx');
  };

  const filteredOrders = orders.filter((order) =>
    order.material?.nameMaterial?.toLowerCase().includes(searchText.toLowerCase()) ||
    order.contractor?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    order.staff?.fullName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: 'Номер', dataIndex: 'number' },
    { title: 'Дата', dataIndex: 'date', render: (d) => new Date(d).toLocaleString() },
    { title: 'Контрагент', dataIndex: ['contractor', 'name'] },
    { title: 'Материал', dataIndex: ['material', 'nameMaterial'] },
    { title: 'Кол-во', dataIndex: 'quantity' },
    { title: 'Плановая дата', dataIndex: 'plannedCompletionDate', render: (d) => new Date(d).toLocaleString() },
    { title: 'Факт. дата', dataIndex: 'actualDateCompletion', render: (d) => new Date(d).toLocaleString() },
    { title: 'Сотрудник', dataIndex: ['staff', 'fullName'] },
    {
      title: 'Действия',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>Редактировать</Button>
          <Popconfirm
            title="Удалить заказ?"
            onConfirm={() => handleDelete(record.number)}
            okText="Да"
            cancelText="Нет"
          >
            
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const openModal = (record = null) => {
    setEditingOrder(record);
    if (record) {
      form.setFieldsValue({
        ...record,
        plannedCompletionDate: record.plannedCompletionDate ? dayjs(record.plannedCompletionDate) : null,
        actualDateCompletion: record.actualDateCompletion ? dayjs(record.actualDateCompletion) : null,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => openModal()}>Добавить заказ</Button>
        <Button onClick={exportToExcel}>Экспорт в Excel</Button>
        <Search placeholder="Поиск" onSearch={setSearchText} enterButton allowClear />
      </Space>

      <Table
        rowKey="number"
        loading={loading}
        dataSource={filteredOrders}
        columns={columns}
        bordered
        onRow={(record) => ({
          onDoubleClick: () => openModal(record),
        })}
      />

      <Modal
        open={isModalOpen}
        title={editingOrder ? 'Редактировать заказ' : 'Добавить заказ'}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingOrder(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="contractorCode" label="Контрагент" rules={[{ required: true }]}> 
            <Select placeholder="Выберите контрагента">
              {contractors.map((c) => (
                <Option key={c.code} value={c.code}>{c.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="materialCode" label="Материал" rules={[{ required: true }]}> 
            <Select placeholder="Выберите материал">
              {materials.map((m) => (
                <Option key={m.code} value={m.code}>{m.nameMaterial}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="quantity" label="Количество" rules={[{ required: true }]}> 
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="plannedCompletionDate" label="Плановая дата" rules={[{ required: true }]}> 
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="actualDateCompletion" label="Фактическая дата"> 
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="staffCode" label="Сотрудник" rules={[{ required: true }]}> 
            <Select placeholder="Выберите сотрудника">
              {staffs.map((s) => (
                <Option key={s.code} value={s.code}>{s.fullName}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrdersPage;
