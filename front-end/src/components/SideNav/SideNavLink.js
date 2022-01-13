import { useState } from "react"
import { Link } from "react-router-dom"

const SideNavLink = (props) => {

    const { data, showSideNav } = props

    const [show, setShow] = useState(false)

    return (
        <div className="nav-link">

            <div className="link" onClick={() => setShow(!show)}>{props.text} </div>
                   
            {
                show && <div> 
                
                    { data.map(item =>{

                        return <Link style={{backgroundColor: 'rgb(58, 78, 86)', width: '88%', fontSize: '14px', paddingLeft: '20%'}} onClick={() => showSideNav(false)} to={`/${item}`} className="link"> {item}  </Link> 
                    } ) } </div>
            }
    
        </div>
    )
}

export default SideNavLink