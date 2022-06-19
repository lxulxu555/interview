import { ReactNode } from "react";

export interface TableColumns {
    title: string;
    dataIndex: string;
    render?:any
}

export interface TableData {
    key:number | null;
    name: string;
    age: string;
}