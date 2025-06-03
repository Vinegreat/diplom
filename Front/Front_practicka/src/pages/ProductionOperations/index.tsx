import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, InputNumber, Select, message, Space, Input, Tag, DatePicker } from 'antd';
import axios from 'axios';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';

const { Option } = Select;
const { Search } = Input;

const ProductionOperations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [orders, setOrders] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [statusMap, setStatusMap] = useState({});

  const API_BASE = "http://localhost:5084/api/ProductionOperations";

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/GetAll`);
      setData(res.data);
    } catch (err) {
      message.error("Ошибка при загрузке данных");
    } finally {
      setLoading(false);
    }
  };

  const fetchDictionaries = async () => {
    try {
      const [resOrders, resEquipments, resWarehouses, resMaterials] = await Promise.all([
        axios.get("http://localhost:5084/api/Dictionary/GetProductionOrder"),
        axios.get("http://localhost:5084/api/Dictionary/GetEquipment"),
        axios.get("http://localhost:5084/api/Dictionary/GetWareHouse"),
        axios.get("http://localhost:5084/api/Dictionary/GetMaterials"),
      ]);
      setOrders(resOrders.data);
      setEquipments(resEquipments.data);
      setWarehouses(resWarehouses.data);
      setMaterials(resMaterials.data);
    } catch (err) {
      message.error("Ошибка при загрузке справочников");
    }
  };

  const getLabel = (list, valueField, labelField, value) => {
    const found = list.find((item) => item[valueField] === value);
    return found ? found[labelField] : value;
  };

  const handleSubmit = async (values) => {
    try {
      if (editingRecord) {
        await axios.post(`${API_BASE}/Edit`, { number: editingRecord.number, ...values });
        message.success("Запись обновлена успешно");
      } else {
        await axios.post(`${API_BASE}/Add`, values);
        message.success("Запись добавлена успешно");
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingRecord(null);
      fetchData();
    } catch (err) {
      message.error("Ошибка при сохранении данных");
    }
  };

  const handleDelete = async (number) => {
    try {
      await axios.delete(`${API_BASE}/Delete/${number}`);
      message.success("Запись удалена");
      fetchData();
    } catch (err) {
      message.error("Ошибка при удалении записи");
    }
  };

  const exportToExcel = () => {
    const exportData = data.map(item => ({
      number: item.number,
      order: getLabel(orders, "number", "number", item.orderCode),
      preparedMaterial: getLabel(materials, "code", "nameMaterial", item.preparedMaterialCode),
      amount: item.amountPreparedProduction,
      equipment: getLabel(equipments, "code", "name", item.equipmentCode),
      warehouseRaw: getLabel(warehouses, "code", "name", item.wareHouseRawMaterialCode),
      warehousePrepared: getLabel(warehouses, "code", "name", item.wareHousePreparedMaterialCode),
      status: statusMap[item.number] || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Производство");
    XLSX.writeFile(workbook, "production_orders.xlsx");
  };

  const openModal = (record = null) => {
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue({
        ...record,
        plannedCompletionDate: record.plannedCompletionDate ? dayjs(record.plannedCompletionDate) : null,
        actualDateCompletion: record.actualDateCompletion ? dayjs(record.actualDateCompletion) : null
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const setStatus = (number, status) => {
    setStatusMap(prev => ({ ...prev, [number]: status }));
  };

  const filteredData = data.filter(item =>
    getLabel(materials, "code", "nameMaterial", item.preparedMaterialCode)?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
    getLabel(equipments, "code", "name", item.equipmentCode)?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
    getLabel(orders, "number", "number", item.orderCode)?.toString().toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Номер", dataIndex: "number" },
    { title: "Заказ", dataIndex: "orderCode", render: (code) => getLabel(orders, "number", "number", code) },
    { title: "готовый материал", dataIndex: "preparedMaterialCode", render: (code) => getLabel(materials, "code", "nameMaterial", code) },
    { title: "Количество продукции", dataIndex: "amountPreparedProduction" },
    { title: "Оборудование", dataIndex: "equipmentCode", render: (code) => getLabel(equipments, "code", "name", code) },
    { title: "Склад сырья", dataIndex: "wareHouseRawMaterialCode", render: (code) => getLabel(warehouses, "code", "name", code) },
    { title: "Склад подготовленного материала", dataIndex: "wareHousePreparedMaterialCode", render: (code) => getLabel(warehouses, "code", "name", code) },
    
    {
      title: "Действия",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>Редактировать</Button>
          
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
        <Button type="primary" onClick={() => openModal()}>Добавить производственный заказ</Button>
        <Button onClick={exportToExcel}>Экспорт в Excel</Button>
        <Search placeholder="Поиск по материалу, оборудованию или заказу" onSearch={setSearchText} allowClear style={{ width: 300 }} />
      </Space>

      

      <Table
        rowKey="number"
        loading={loading}
        dataSource={filteredData}
        columns={columns}
        bordered
        onRow={(record) => ({ onDoubleClick: () => openModal(record) })}
      />

      <Modal
        open={isModalOpen}
        title={editingRecord ? "Редактировать запись" : "Добавить производственный заказ"}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingRecord(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="orderCode" label="Код заказа" rules={[{ required: true }]}> 
            <Select placeholder="Выберите заказ">
              {orders.map((item) => (
                <Option key={item.number} value={item.number}>Заказ №{item.number}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="preparedMaterialCode" label=" Готовый материала" rules={[{ required: true }]}> 
            <Select placeholder="Выберите материал">
              {materials.map((item) => (
                <Option key={item.code} value={item.code}>{item.nameMaterial.trim()}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="amountPreparedProduction" label="Количество продукции" rules={[{ required: true }]}> 
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="equipmentCode" label="Оборудования" rules={[{ required: true }]}> 
            <Select placeholder="Выберите оборудование">
              {equipments.map((item) => (
                <Option key={item.code} value={item.code}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="wareHouseRawMaterialCode" label=" Склад сырья" rules={[{ required: true }]}> 
            <Select placeholder="Выберите склад сырья">
              {warehouses.map((item) => (
                <Option key={item.code} value={item.code}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="wareHousePreparedMaterialCode" label=" Склад готового материала" rules={[{ required: true }]}> 
            <Select placeholder="Выберите склад подготовленного материала">
              {warehouses.map((item) => (
                <Option key={item.code} value={item.code}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductionOperations;
