import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button, Table, Modal, Form, InputNumber, DatePicker, Select, message, Space, Popconfirm, Input
} from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;
const { Search } = Input;
const API_BASE = 'http://localhost:5084/api/DocumentsMovementMaterial';

const DocumentMovementMaterialPage = () => {
  const [documents, setDocuments] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchData();
    fetchDictionaries();
    fetchOrders();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/GetAll`);
      setDocuments(res.data);
    } catch (err) {
      message.error('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  const fetchDictionaries = async () => {
    try {
      const [c, m, w, s] = await Promise.all([
        axios.get('http://localhost:5084/api/Dictionary/GetContractor'),   // было GetContractors
        axios.get('http://localhost:5084/api/Dictionary/GetMaterials'),   // ✅ оставляем
        axios.get('http://localhost:5084/api/Dictionary/GetWareHouse'),   // было GetWarehouses
        axios.get('http://localhost:5084/api/Dictionary/GetStaff'),       // ✅ оставляем
      ]);
      setContractors(c.data);
      setMaterials(m.data);
      setWarehouses(w.data);
      setStaffs(s.data);
    } catch (err) {
      message.error('Ошибка загрузки справочников');
    }
  };
  
  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5084/api/Dictionary/GetProductionOrder'); // было api/Orders/GetAll
      setOrders(res.data);
    } catch (err) {
      message.error('Ошибка загрузки заказов');
    }
  };
  

  const handleSubmit = async (values) => {
    try {
      if (editingDocument) {
        await axios.post(`${API_BASE}/Edit`, {
          code: editingDocument.code,
          ...values,
        });
        message.success('Документ обновлён');
      } else {
        await axios.post(`${API_BASE}/Add`, values);
        message.success('Документ добавлен');
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingDocument(null);
      fetchData();
    } catch (err) {
      message.error('Ошибка при сохранении');
    }
  };

  const handleDelete = async (code) => {
    try {
      await axios.delete(`${API_BASE}/Delete?code=${code}`);
      message.success(`Документ с кодом ${code} удалён`);
      fetchData();
    } catch (err) {
      message.error('Ошибка удаления');
    }
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.material?.nameMaterial?.toLowerCase().includes(searchText.toLowerCase()) ||
    doc.contractor?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: 'Код', dataIndex: 'code' },
    { title: 'Материал', dataIndex: ['material', 'nameMaterial'] },
    { title: 'Кол-во', dataIndex: 'quantityMaterial' },
    { title: 'Отправитель', dataIndex: ['wareHouseSender', 'name'] },
    { title: 'Получатель', dataIndex: ['wareHouseRecipient', 'name'] },
    { title: 'Контрагент', dataIndex: ['contractor', 'name'] },
    { title: 'Сотрудник', dataIndex: ['staff', 'fullName'] },
    { title: 'Заказ', dataIndex: ['order', 'number'] },
    {
      title: 'Действия',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>Редактировать</Button>
          <Popconfirm
            title="Удалить документ?"
            onConfirm={() => handleDelete(record.code)}
            okText="Да"
            cancelText="Нет"
          >
            <Button type="link" danger>Удалить</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const openModal = (record = null) => {
    setEditingDocument(record);
    if (record) {
      form.setFieldsValue({
        ...record,
        productionCode: record.order?.number,
        dateDocument: dayjs(`${record.dateDocument.year}-${record.dateDocument.month}-${record.dateDocument.day}`),
        dateDocumentCreated: dayjs(`${record.dateDocumentCreated.year}-${record.dateDocumentCreated.month}-${record.dateDocumentCreated.day}`),
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => openModal()}>Добавить документ движения материалов</Button>
        <Search placeholder="Поиск" onSearch={setSearchText} enterButton allowClear />
      </Space>

      <Table
        rowKey="code"
        loading={loading}
        dataSource={filteredDocuments}
        columns={columns}
        bordered
        onRow={(record) => ({
          onDoubleClick: () => openModal(record),
        })}
      />

      <Modal
        open={isModalOpen}
        title={editingDocument ? 'Редактировать документ' : 'Добавить документ движения материалов'}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingDocument(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="dateDocument" label="Дата документа" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="dateDocumentCreated" label="Дата создания документа" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="typeMovementMaterialCode" label="Тип движения материала" rules={[{ required: true }]}>
            <Select placeholder="Выберите тип движения материала">
              <Option value={1}>Тип 1</Option>
              <Option value={2}>Тип 2</Option>
            </Select>
          </Form.Item>
          <Form.Item name="materialCode" label="Материал" rules={[{ required: true }]}>
            <Select placeholder="Выберите материал">
              {materials.map((m) => (
                <Option key={m.code} value={m.code}>{m.nameMaterial}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="quantityMaterial" label="Количество материала" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="wareHouseSenderCode" label="Склад отправителя" rules={[{ required: true }]}>
            <Select placeholder="Выберите склад отправителя">
              {warehouses.map((w) => (
                <Option key={w.code} value={w.code}>{w.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="wareHouseRecipientCode" label="Склад получателя" rules={[{ required: true }]}>
            <Select placeholder="Выберите склад получателя">
              {warehouses.map((w) => (
                <Option key={w.code} value={w.code}>{w.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="contractorCode" label="Контрагент" rules={[{ required: true }]}>
            <Select placeholder="Выберите контрагента">
              {contractors.map((c) => (
                <Option key={c.code} value={c.code}>{c.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="staffCode" label="Сотрудник" rules={[{ required: true }]}>
            <Select placeholder="Выберите сотрудника">
              {staffs.map((s) => (
                <Option key={s.code} value={s.code}>{s.fullName}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="productionCode" label="Производственный заказ" rules={[{ required: true }]}>
            <Select placeholder="Выберите заказ">
              {orders.map((o) => (
                <Option key={o.number} value={o.number}>
                  {`#${o.number} — ${o.material?.nameMaterial} для ${o.contractor?.name}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DocumentMovementMaterialPage;
