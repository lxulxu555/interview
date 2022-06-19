import { useContext } from 'react'
import { MenuData } from '../../interface/menu.interface'
import { demoContext } from '../../redux/reduce'
import './menu.css'

interface IProps {
    menuData: Array<MenuData>
}

export default function Menu({ menuData }: IProps) {
    const { state, dispatch } = useContext(demoContext)
    const renderMenu = () => {
        return menuData.map(menu => {
            {
                return <div className="menu" key={menu.id}>
                    {menu.name}
                    {renderSubMenu(menu?.subMenu)}
                </div>
            }
        })
    }

    const renderSubMenu = (subMenu: Array<MenuData> = []) => {
        return <div className="two-menu-list">
            {subMenu?.map(sub => {
                return <div className="menu" key={sub.id}>
                    {sub.name}
                </div>
            })}
        </div>
    }

    return <div className={state.isFoldedMenu ? "left-menu-fold" : 'left-menu'}>
        {renderMenu()}
    </div>
}