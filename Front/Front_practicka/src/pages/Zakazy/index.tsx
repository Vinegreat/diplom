import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Input, Form, Row, Col, Typography, message, DatePicker, Popconfirm, Select } from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;
const API_BASE = 'http://localhost:5084/api/Orders';

interface OrderItem {
  number: number;
  date: string;
  contractor: {
    code: number;
    name: string;
    inn: string;
    phone: string;
    email: string;
    contactFace: string;
  };
  contractorCode: number;
  material: {
    code: number;
    nameMaterial: string;
    measurementUnit: string | null;
    measurementUnitCode: number;
  };
  materialCode: number;
  quantity: number;
  plannedCompletionDate: string;
  actualDateCompletion: string;
  staff: {
    code: number;
    fullName: string;
  };
  staffCode: number;
}

interface DictionaryItem {
  code: number;
  name: string;
  fullName?: string;
  nameMaterial?: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [contractors, setContractors] = useState<DictionaryItem[]>([]);
  const [materials, setMaterials] = useState<DictionaryItem[]>([]);
  const [staffs, setStaffs] = useState<DictionaryItem[]>([]);

  const [newOrder, setNewOrder] = useState({
    contractorCode: '',
    materialCode: '',
    quantity: '',
    plannedCompletionDate: '',
    staffCode: '',
    actualDateCompletion: '',
  });

  const [editOrder, setEditOrder] = useState({
    contractorCode: '',
    materialCode: '',
    quantity: '',
    plannedCompletionDate: '',
    staffCode: '',
    orderNumber: '',
    actualDateCompletion: '',
  });

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE}/GetAll`);
      setOrders(res.data);
    } catch (error) {
      message.error('Ошибка загрузки заказов');
    }
  };

  const fetchDictionaries = async () => {
    try {
      const [contractorsRes, materialsRes, staffRes] = await Promise.all([
        axios.get('http://localhost:5084/api/Dictionary/GetContractor'),
        axios.get('http://localhost:5084/api/Dictionary/GetMaterials'),
        axios.get('http://localhost:5084/api/Dictionary/GetStaff'),
      ]);
      setContractors(contractorsRes.data);
      setMaterials(materialsRes.data);
      setStaffs(staffRes.data);
    } catch (err) {
      message.error('Ошибка загрузки справочников');
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchDictionaries();
  }, []);

  const handleCreate = async () => {
    try {
      await axios.post(`${API_BASE}/Add`, newOrder);
      message.success('Заказ успешно создан');
      fetchOrders();
      setNewOrder({
        contractorCode: '',
        materialCode: '',
        quantity: '',
        plannedCompletionDate: '',
        staffCode: '',
        actualDateCompletion: '',
      });
    } catch (error) {
      message.error('Ошибка при создании заказа');
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`${API_BASE}/Edit`, editOrder);
      message.success('Заказ успешно обновлен');
      fetchOrders();
      setEditOrder({
        contractorCode: '',
        materialCode: '',
        quantity: '',
        plannedCompletionDate: '',
        staffCode: '',
        orderNumber: '',
        actualDateCompletion: '',
      });
    } catch (error) {
      message.error('Ошибка при редактировании заказа');
    }
  };

  const handleDelete = async (Number: number) => {
    try {
      await axios.delete (`${API_BASE}/Delete?number=${Number}`);
      message.success(`Order №${Number} deleted`);
      fetchOrders();
    } catch (error) {
      message.error('Failed to delete order');
    }
  };

  const handleSelectOrder = (order: OrderItem) => {
    setEditOrder({
      contractorCode: order.contractorCode.toString(),
      materialCode: order.materialCode.toString(),
      quantity: order.quantity.toString(),
      plannedCompletionDate: order.plannedCompletionDate,
      staffCode: order.staffCode.toString(),
      orderNumber: order.number.toString(),
      actualDateCompletion: order.actualDateCompletion,
    });
  };

  const renderSelectField = (label: string, value: string, onChange: (val: string) => void, options: DictionaryItem[]) => (
    <Form.Item label={label}>
      <Select value={value} onChange={onChange} allowClear>
        {options.map((opt) => (
          <Option key={opt.code} value={opt.code.toString()}>
            {opt.name || opt.nameMaterial || opt.fullName}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Список заказов</Title>

      <Row gutter={[16, 16]}>
        {orders.map((order, idx) => (
          <Col span={8} key={idx}>
            <Card
              title={`Заказ №${order.number}`}
              bordered
              onClick={() => handleSelectOrder(order)}
              style={{ cursor: 'pointer' }}
              extra={
                <Popconfirm
                  title="Удалить этот заказ?"
                  onConfirm={() => handleDelete(order.number)}
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button danger size="small">Удалить</Button>
                </Popconfirm>
              }
            >
              <p><strong>Дата:</strong> {new Date(order.date).toLocaleString()}</p>
              <p><strong>Контрагент:</strong> {order.contractor?.name}</p>
              <p><strong>Материал:</strong> {order.material?.nameMaterial}</p>
              <p><strong>Кол-во:</strong> {order.quantity}</p>
              <p><strong>Плановая дата:</strong> {new Date(order.plannedCompletionDate).toLocaleString()}</p>
              <p><strong>Факт. дата:</strong> {new Date(order.actualDateCompletion).toLocaleString()}</p>
              <p><strong>Сотрудник:</strong> {order.staff?.fullName}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={4} style={{ marginTop: 32 }}>Создать заказ</Title>
      <Form layout="vertical" onFinish={handleCreate}>
        <Row gutter={16}>
          <Col span={8}>{renderSelectField('Контрагент', newOrder.contractorCode, (val) => setNewOrder({ ...newOrder, contractorCode: val }), contractors)}</Col>
          <Col span={8}>{renderSelectField('Материал', newOrder.materialCode, (val) => setNewOrder({ ...newOrder, materialCode: val }), materials)}</Col>
          <Col span={8}><Form.Item label="Количество"><Input value={newOrder.quantity} onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })} /></Form.Item></Col>
          <Col span={8}><Form.Item label="Плановая дата"><DatePicker style={{ width: '100%' }} value={newOrder.plannedCompletionDate ? dayjs(newOrder.plannedCompletionDate) : null} onChange={(date) => setNewOrder({ ...newOrder, plannedCompletionDate: date ? date.toISOString() : '' })} /></Form.Item></Col>
          <Col span={8}>{renderSelectField('Сотрудник', newOrder.staffCode, (val) => setNewOrder({ ...newOrder, staffCode: val }), staffs)}</Col>
          <Col span={8}><Form.Item label="Фактическая дата"><DatePicker style={{ width: '100%' }} value={newOrder.actualDateCompletion ? dayjs(newOrder.actualDateCompletion) : null} onChange={(date) => setNewOrder({ ...newOrder, actualDateCompletion: date ? date.toISOString() : '' })} /></Form.Item></Col>
        </Row>
        <Button type="primary" htmlType="submit">Добавить</Button>
      </Form>

      <Title level={4} style={{ marginTop: 32 }}>Редактировать заказ</Title>
      <Form layout="vertical" onFinish={handleEdit}>
        <Row gutter={16}>
          <Col span={8}>{renderSelectField('Контрагент', editOrder.contractorCode, (val) => setEditOrder({ ...editOrder, contractorCode: val }), contractors)}</Col>
          <Col span={8}>{renderSelectField('Материал', editOrder.materialCode, (val) => setEditOrder({ ...editOrder, materialCode: val }), materials)}</Col>
          <Col span={8}><Form.Item label="Количество"><Input value={editOrder.quantity} onChange={(e) => setEditOrder({ ...editOrder, quantity: e.target.value })} /></Form.Item></Col>
          <Col span={8}><Form.Item label="Плановая дата"><DatePicker style={{ width: '100%' }} value={editOrder.plannedCompletionDate ? dayjs(editOrder.plannedCompletionDate) : null} onChange={(date) => setEditOrder({ ...editOrder, plannedCompletionDate: date ? date.toISOString() : '' })} /></Form.Item></Col>
          <Col span={8}>{renderSelectField('Сотрудник', editOrder.staffCode, (val) => setEditOrder({ ...editOrder, staffCode: val }), staffs)}</Col>
          <Col span={8}><Form.Item label="Фактическая дата"><DatePicker style={{ width: '100%' }} value={editOrder.actualDateCompletion ? dayjs(editOrder.actualDateCompletion) : null} onChange={(date) => setEditOrder({ ...editOrder, actualDateCompletion: date ? date.toISOString() : '' })} /></Form.Item></Col>
        </Row>
        <Button type="primary" htmlType="submit">Редактировать</Button>
      </Form>
    </div>
  );
}
