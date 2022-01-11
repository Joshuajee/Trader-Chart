import { useState } from "react"
import { NavLink } from "react-router-dom"

const SideNavLink = (props) => {

    const { data } = props

    const [show, setShow] = useState(false)

    return (
        <div className="nav-link">

            <div className="link" onClick={() => setShow(!show)}>{props.text} </div>
                   
            {
                show && <div className="sub"> 
                
                    { data.map(item =>{

                        return <NavLink className="link"> {item}  </NavLink> 
                    } ) } </div>
            }
    
        </div>
    )
}

export default SideNavLink