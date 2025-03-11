import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  InputNumber,
  Select,
  Space,
  Popconfirm,
  message,
} from "antd";

const { Option } = Select;
const API_BASE = "http://localhost:5084/api/ProductionOperations";

const ProductionOperations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const [orders, setOrders] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [materials, setMaterials] = useState([]);

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
        await axios.post(`${API_BASE}/Edit`, {
          number: editingRecord.number,
          ...values,
        });
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

  const openModal = (record = null) => {
    setEditingRecord(record);
    if (record) form.setFieldsValue(record);
    else form.resetFields();
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Номер",
      dataIndex: "number",
    },
    {
      title: "Заказ",
      dataIndex: "orderCode",
      render: (code) => getLabel(orders, "number", "number", code),
    },
    {
      title: "Материал",
      dataIndex: "preparedMaterialCode",
      render: (code) => getLabel(materials, "code", "nameMaterial", code),
    },
    {
      title: "Количество продукции",
      dataIndex: "amountPreparedProduction",
    },
    {
      title: "Оборудование",
      dataIndex: "equipmentCode",
      render: (code) => getLabel(equipments, "code", "name", code),
    },
    {
      title: "Склад сырья",
      dataIndex: "wareHouseRawMaterialCode",
      render: (code) => getLabel(warehouses, "code", "name", code),
    },
    {
      title: "Склад подготовленного материала",
      dataIndex: "wareHousePreparedMaterialCode",
      render: (code) => getLabel(warehouses, "code", "name", code),
    },
    {
      title: "Действия",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>Редактировать</Button>
          <Popconfirm
            title="Удалить запись?"
            onConfirm={() => handleDelete(record.number)}
            okText="Да"
            cancelText="Нет"
          >
            <Button type="link" danger>Удалить</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
    fetchDictionaries();
  }, []);

  return (
    <div className="p-6">
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => openModal()}>Добавить запись</Button>
      </Space>

      <Table
        rowKey="number"
        loading={loading}
        dataSource={data}
        columns={columns}
        bordered
        onRow={(record) => ({
          onDoubleClick: () => openModal(record),
        })}
      />

      <Modal
        open={isModalOpen}
        title={editingRecord ? "Редактировать запись" : "Добавить запись"}
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
          <Form.Item name="preparedMaterialCode" label="Код подготовленного материала" rules={[{ required: true }]}> 
            <Select placeholder="Выберите материал">
              {materials.map((item) => (
                <Option key={item.code} value={item.code}>{item.nameMaterial.trim()}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="amountPreparedProduction" label="Количество продукции" rules={[{ required: true }]}> 
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="equipmentCode" label="Код оборудования" rules={[{ required: true }]}> 
            <Select placeholder="Выберите оборудование">
              {equipments.map((item) => (
                <Option key={item.code} value={item.code}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="wareHouseRawMaterialCode" label="Код склада сырья" rules={[{ required: true }]}> 
            <Select placeholder="Выберите склад сырья">
              {warehouses.map((item) => (
                <Option key={item.code} value={item.code}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="wareHousePreparedMaterialCode" label="Код склада подготовленного материала" rules={[{ required: true }]}> 
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
