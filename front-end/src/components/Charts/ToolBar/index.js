import { BsZoomIn, BsZoomOut, BsDashLg, BsPlusLg } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import { connect } from 'react-redux';
import { showSideNav  } from './../../../redux/actions';

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

const ToolBar = (props) => {

    const { zoomIn, zoomOut, state, setModal, showSideNav } = props

    return (
        <div className="tool-bar">

            <div className='menu' onClick={() => showSideNav(true)}>
                <AiOutlineMenu size={30}  color='black'/>
            </div>
                

            <div className='tools'>

                <BsZoomIn onClick={zoomIn} style={{}} color={state.zoomIn ? 'green': 'gray' } />
            
                <BsZoomOut onClick={zoomOut} style={{marginLeft: '10px'}} color={state.zoomOut ? 'green': 'gray' } /> 

                <BsDashLg style={{marginLeft: '10px'}} color='gray' />

                <BsDashLg style={{marginLeft: '10px', transform: 'rotate(315deg)'}} color='gray' />

                <BsPlusLg style={{marginLeft: '10px'}} color='gray' />

                <button 
                    className='add-indicator'
                    onClick={() => setModal(true)}
                    > Add Indicator </button>

            </div>

            
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps) (ToolBar);