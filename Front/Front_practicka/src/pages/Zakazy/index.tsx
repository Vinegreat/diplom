import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, message } from "antd";
import axios from "axios";
import moment from "moment";
import { ColumnsType } from "antd/es/table";

interface Order {
  id: number;
  orderNumber?: number;
  сontractorCode: number;
  materialCode: number;
  quantity: number;
  plannedCompletionDate: string;
  fullName?: string;
  equipmentCode: number;
  actualDateCompletion?: string;
  staffCode?: string;
  material?: {
    nameMaterial: string;
  };
}

const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5084/api/Orders/GetAll");
      setOrders(response.data);
    } catch (error) {
      message.error("Ошибка при загрузке заказов");
    }
  };

  const handleCreate = () => {
    setEditMode(false);
    form.resetFields();
    setOpen(true);
  };

  const handleEdit = (order: Order) => {
    setEditMode(true);
    setCurrentOrder(order);
    form.setFieldsValue({
      сontractorCode: order.сontractorCode,
      materialCode: order.materialCode,
      quantity: order.quantity,
      plannedCompletionDate: moment(order.plannedCompletionDate),
      staffCode: order.staffCode || order.fullName,
      actualDateCompletion: order.actualDateCompletion ? moment(order.actualDateCompletion) : null
    });
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        plannedCompletionDate: values.plannedCompletionDate.toISOString(),
        actualDateCompletion: values.actualDateCompletion ? values.actualDateCompletion.toISOString() : null
      };

      if (editMode && currentOrder) {
        await axios.put(`http://localhost:5084/api/Orders/Edit`, {
          ...payload,
          orderNumber: currentOrder.orderNumber
        });
        message.success("Заказ обновлен");
      } else {
        await axios.post("http://localhost:5084/api/Orders/Add", payload);
        message.success("Заказ создан");
      }
      setOpen(false);
      fetchOrders();
    } catch (error: any) {
      console.error("Ошибка при сохранении заказа:", error?.response?.data || error.message);
      message.error("Ошибка при сохранении заказа");
    }
  };

  const columns: ColumnsType<Order> = [
    {
      title: "Материал",
      render: (_, record) => record.material?.nameMaterial || record.materialCode,
      key: "materialCode"
    },
    { title: "Количество", dataIndex: "quantity", key: "quantity" },
    {
      title: "Сотрудник (почта)",
      key: "staffDisplay",
      render: (_, record) => record.staff?.fullName || record.staffCode || "-"
    }
    ,
    { title: "Дата план", dataIndex: "plannedCompletionDate", key: "plannedCompletionDate" },
    {
      title: "Дата факт",
      dataIndex: "actualDateCompletion",
      key: "actualDateCompletion",
      render: (text: string) => text || "-"
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>Редактировать</Button>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Производственные заказы</h2>
        <Button type="primary" onClick={handleCreate}>Добавить заказ</Button>
      </div>

      <Table columns={columns} dataSource={orders} rowKey="id" bordered />

      <Modal
        open={open}
        title={editMode ? "Редактирование заказа" : "Создание заказа"}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="сontractorCode" label="Код контрагента" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="materialCode" label="Код материала" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="quantity" label="Количество" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="staffCode" label="код сотрудника" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="plannedCompletionDate" label="Плановая дата завершения" rules={[{ required: true }]}> <DatePicker style={{ width: '100%' }} /> </Form.Item>
          <Form.Item name="actualDateCompletion" label="Фактическая дата завершения"> <DatePicker style={{ width: '100%' }} /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrdersTable;
