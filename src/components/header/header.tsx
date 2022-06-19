import { useContext } from 'react'
import { demoContext } from '../../redux/reduce'
import './header.css'

export default function Header() {
    const { state, dispatch } = useContext(demoContext)
    const foldedMenu = () => {
        dispatch({ type: 'UpdateState', update: { isFoldedMenu: !state.isFoldedMenu } })
    }
    const renderTitle = () => {
       return state.isFoldedMenu ?  `->展开菜单` : `<-折叠菜单`
    }
    return <div className="header" onClick={foldedMenu}><span className="folded-title">{renderTitle()}</span></div>
}