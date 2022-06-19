import { MenuData } from "../interface/menu.interface";
import { TableData } from "../interface/table.interface";

export interface DemoState {
    isFoldedMenu: boolean;
    demoTableDataSource: Array<TableData>;
    menuData: Array<MenuData>;
}

export const initialState: DemoState = {
    isFoldedMenu: false,
    demoTableDataSource: [{
        key: 1,
        name: 'liam',
        age: '22'
    },
    {
        key: 2,
        name: 'pearl',
        age: '21'
    }],
    menuData: [
        {
            id: '0',
            name: '分类一',
            subMenu: [
                {
                    id: '1',
                    name: '子分类一'
                },
                {
                    id: '2',
                    name: '子分类二'
                }
            ]
        },
        {
            id: '3',
            name: '分类二',
            subMenu: [
                {
                    id: '4',
                    name: '子分类三'
                },
                {
                    id: '5',
                    name: '子分类四',
                }
            ]
        }
    ]
}
