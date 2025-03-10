import { ProColumns, ProTable } from "@ant-design/pro-components"
import { request } from "@umijs/max"
import { useEffect, useState } from "react"

export type DictionaryListViewParams<TModel> = {
    dictionaryType : string , 
    columns : ProColumns <TModel> []

}

export default function<TModel extends Record<string,any>> ({dictionaryType , columns}:DictionaryListViewParams<TModel>) 
{
    const [data , setData] = useState <TModel[]>()
    useEffect(()=>{
        request('http://localhost:5084/api/Dictionary/GetMaterials')
        .then(response=>setData(response))
    } , [])

    return <>
        <ProTable<TModel> dataSource={data} columns={columns}  />
    </>
}