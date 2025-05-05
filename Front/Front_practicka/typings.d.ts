import '@umijs/max/typings';

export type Material ={

    code : number ,
    nameMaterial : string , 
    measurementUnit : MeasurementUnit , 
    measurementUnitCode : number 
    
}
export type MeasurementUnit={
    code : number , 
    name : string 
}
export type 