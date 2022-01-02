import { } from 'react-icons/bs';
import { IoIosClose } from 'react-icons/io';
import { connect } from 'react-redux';
import { showSideNav  } from './../../redux/actions';
import Link from "./SideNavLink";

const mapStateToProps = state => {
    return { 
      sideNav: state.sideNav
    };
};
  
  
const mapDispatchToProps = dispatch => {
    return {
        showSideNav: sideNav => dispatch(showSideNav(sideNav)),
    };
}


const SideNav = (props) => {

    const { sideNav, showSideNav } = props

    return (
        <div  className={`nav sidenav ${sideNav? 'sidenav-mov' : ''}`}>

            { sideNav && <div className="link" onClick={() => showSideNav(false)}> <IoIosClose size={40}/> </div>}
            
            <div className="link">Forex</div>
            <div className="link">Crypto</div>
            <div className="link">Stocks</div>

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps) (SideNav);