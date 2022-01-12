import { useState } from "react"
import { Link } from "react-router-dom"

const SideNavLink = (props) => {

    const { data } = props

    const [show, setShow] = useState(false)

    return (
        <div className="nav-link">

            <div className="link" onClick={() => setShow(!show)}>{props.text} </div>
                   
            {
                show && <div className="sub"> 
                
                    { data.map(item =>{

                        return <Link to={`/${item}`} className="link"> {item}  </Link> 
                    } ) } </div>
            }
    
        </div>
    )
}

export default SideNavLink