export interface MenuData {
    id: string;
    name: string;
    subMenu?: Array<MenuData>
}