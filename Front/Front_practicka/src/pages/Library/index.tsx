// src/pages/LibraryPage.tsx

import { PageContainer, ProTable, ProColumns } from '@ant-design/pro-components';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { request } from '@umijs/max';

const { TabPane } = Tabs;

// Типы
interface Material {
  id: number;
  code: string;
  nameMaterial: string;
  measurementUnit: { name: string };
}

interface Contractor {
  id: number;
  name: string;
  phone: string;
}

interface Staff {
  id: number;
  fullName: string;
  position: string;
}

interface Equipment {
  id: number;
  type: string;
  model: string;
}

interface WareHouse {
  id: number;
  name: string;
  address: string;
}

// Колонки
const materialColumns: ProColumns<Material>[] = [
  { title: 'Код', dataIndex: 'code' },
  { title: 'Название', dataIndex: 'nameMaterial' },
  { title: 'Ед. измерения', renderText: (_, record) => record.measurementUnit.name },
];

const contractorColumns: ProColumns<Contractor>[] = [
  { title: 'Название', dataIndex: 'name' },
  { title: 'Телефон', dataIndex: 'phone' },
];

const staffColumns: ProColumns<Staff>[] = [
  { title: 'ФИО', dataIndex: 'fullName' },
  { title: 'Должность', dataIndex: 'position' },
];

const equipmentColumns: ProColumns<any>[] = [
  { title: 'Название', dataIndex: 'name' },
];


const warehouseColumns: ProColumns<WareHouse>[] = [
  { title: 'Название', dataIndex: 'name' },
];

const LibraryPage: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [warehouses, setWarehouses] = useState<WareHouse[]>([]);

  useEffect(() => {
    request('http://localhost:5084/api/Dictionary/GetMaterials').then(setMaterials);
    request('http://localhost:5084/api/Dictionary/GetContractor').then(setContractors);
    request('http://localhost:5084/api/Dictionary/GetStaff').then(setStaff);
    request('http://localhost:5084/api/Dictionary/GetEquipment').then(setEquipment);
    request('http://localhost:5084/api/Dictionary/GetWareHouse').then(setWarehouses);
  }, []);

  return (
    <PageContainer ghost>
      <Tabs defaultActiveKey="1" destroyInactiveTabPane>
        <TabPane tab="Материалы" key="1">
          <ProTable rowKey="id" columns={materialColumns} dataSource={materials} search={false} />
        </TabPane>
        <TabPane tab="Заказчики" key="2">
          <ProTable rowKey="id" columns={contractorColumns} dataSource={contractors} search={false} />
        </TabPane>
        <TabPane tab="Сотрудники" key="3">
          <ProTable rowKey="id" columns={staffColumns} dataSource={staff} search={false} />
        </TabPane>
        <TabPane tab="Оборудование" key="4">
          <ProTable rowKey="id" columns={equipmentColumns} dataSource={equipment} search={false} />
        </TabPane>
        <TabPane tab="Склад" key="5">
          <ProTable rowKey="id" columns={warehouseColumns} dataSource={warehouses} search={false} />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default LibraryPage;
