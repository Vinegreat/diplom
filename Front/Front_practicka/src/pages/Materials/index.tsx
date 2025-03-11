import { PageContainer, ProColumns, ProColumnsValueType, ProTable } from "@ant-design/pro-components"
import { renderClient, request } from "@umijs/max"
import { useEffect, useState } from "react"
import { Material } from "typings"

const columns: ProColumns<Material>[]=[
    {
        title : 'Код' , 
        dataIndex : 'code' 
    } , 
    {
        title : 'Название' ,
        dataIndex : 'nameMaterial'
    } ,
    {
        title : 'Ед.измерения' ,
        renderText(text, record, index, action) {
            return record.measurementUnit.name
        }, 
    }
]

export default ()=> 
{
    const [data , setData] = useState <Material[]>()
    useEffect(()=>{
        request('http://localhost:5084/api/Dictionary/GetMaterials')
        .then(response=>setData(response))
    } , [])

    return <>
        <ProTable dataSource={data} columns={columns}  />
    </>
}
