import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, InputNumber, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const TechnologicalMapPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [form] = Form.useForm();

  // Загружает список технологических карт с сервера
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

  // Загружает справочник материалов (включая единицы измерения)
const fetchMaterials = async () => {
    try {
      const response = await axios.get('http://localhost:5084/api/Dictionary/GetMaterials');
      setMaterials(response.data);
    } catch (error) {
      message.error('Ошибка при загрузке справочника материалов');
    }
  };

  // Открывает форму для добавления новой записи
const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // Открывает форму редактирования и заполняет поля значениями выбранной записи
const handleEdit = (record) => {
    setEditingItem(record);
    form.setFieldsValue({
      ...record,
      equipmentCode: record.equipment?.code,
      preparedMaterialCode: record.preparedMaterial?.code,
      rawMaterialCode: record.rawMaterial?.code,
      measurementUnitCode: record.preparedMaterial?.measurementUnitCode
    });
    setIsModalVisible(true);
  };

  // Обрабатывает сохранение данных: добавление или редактирование записи
const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        code: editingItem ? editingItem.code : undefined
      };
      if (editingItem) {
        await axios.post('http://localhost:5084/api/TechnologicalMap/Edit', payload);
        message.success('Успешно отредактировано');
      } else {
        await axios.post('http://localhost:5084/api/TechnologicalMap/Add', payload);
        message.success('Успешно добавлено');
      }
      setIsModalVisible(false);
      fetchData();
    } catch (error) {
      message.error('Ошибка при сохранении');
    }
  };

  // Определяет структуру столбцов таблицы
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
      title: 'Готовый материал',
      dataIndex: ['preparedMaterial', 'nameMaterial'],
      key: 'preparedMaterialName',
    },
    {
      title: 'Ед. изм.',
      dataIndex: ['preparedMaterial', 'measurementUnit'],
      key: 'measurementUnit',
      render: (unit) => unit?.name || ''
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
    fetchMaterials();
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
          <Form.Item name="equipmentCode" label="Оборудование" rules={[{ required: true }]}> 
            <Select placeholder="Выберите оборудование">
              {[...new Set(materials.map(m => m.code))].map(code => {
                const name = data.find(d => d.equipment?.code === code)?.equipment?.name || `Оборудование ${code}`;
                return <Option key={code} value={code}>{name}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item name="preparedMaterialCode" label="Подготовленный материал" rules={[{ required: true }]}> 
            <Select placeholder="Выберите материал">
              {materials.map(mat => (
                <Option key={mat.code} value={mat.code}>{mat.nameMaterial.trim()}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="measurementUnitCode" label="Единица измерения">
            <Select placeholder="Выберите единицу измерения">
              {materials.map(mat => (
                <Option key={mat.measurementUnitCode} value={mat.measurementUnitCode}>{mat.measurementUnit?.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="quantityPreparedMaterial" label="Кол-во подготовленного материала" rules={[{ required: true }]}> 
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="rawMaterialCode" label="Сырьё" rules={[{ required: true }]}> 
            <Select placeholder="Выберите сырьё">
              {materials.map(mat => (
                <Option key={mat.code} value={mat.code}>{mat.nameMaterial.trim()}</Option>
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
