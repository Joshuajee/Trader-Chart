import { useState } from "react"

const SideNavLink = (props) => {

    const { data } = props

    const [show, setShow] = useState(false)

    return (
        <div className="nav-link">

            <div className="link" onClick={() => setShow(!show)}>{props.text} </div>
                   
            {
                show && <div className="sub"> 
                
                    { data.map(item =>{

                        return <div className="link"> {item} </div>
                    } ) } </div>
            }
    
        </div>
    )
}

export default SideNavLink