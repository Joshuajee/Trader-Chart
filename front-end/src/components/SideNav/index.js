import { useState, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import { connect } from 'react-redux';
import { showSideNav, updateNavs  } from './../../redux/actions';
import SideNavLink from './SideNavLink';
import axios from 'axios';
import { capFirstLetter } from '../Charts/logics/functions';


const mapStateToProps = state => {
    return { 
      sideNav: state.sideNav,
      navs: state.navs,
    };
};
  
  
const mapDispatchToProps = dispatch => {
    return {
        showSideNav: sideNav => dispatch(showSideNav(sideNav)),
        updateNavs: navs => dispatch(updateNavs(navs)),
    };
}


const SideNav = (props) => {

    const { sideNav, showSideNav, updateNavs, navs } = props

    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])


    useEffect(() => {

        
    }, [categories])


    useEffect(() => {

		setLoading(true)

		const controller = new AbortController();

		axios.get(process.env.REACT_APP_API + `assets/assets`).then( res => {

			if (res.data.status === 'success') {
                setCategories(res.data.data)
			}

			setLoading(false)

		}, err => {

			setLoading(false)
		})

		return () => controller.abort()
		
	}, [])

    useEffect(() => {

        const navs = []

        categories.forEach(element => {

            const symbol = element.symbol;
            const category = element.category;

            const index = navs.findIndex(item => item.category === category);

            if (index > -1) {
                navs[index].symbol.push(symbol)
            } else {
                navs.push({category: category, symbol: [symbol]})
            }
        });

        updateNavs(navs)

    }, [categories, updateNavs])

    return (
        <div  className={`nav sidenav ${sideNav? 'sidenav-mov' : ''}`}>

            <div className='logo'> 
                Trader Chart 
            </div>

            { sideNav && 
                    <div 
                        className="close" 
                        onClick={() => showSideNav(false)}> <IoIosClose size={40}/> </div>}
            

            <div className='navs'>

                { navs.map(nav => <SideNavLink text={capFirstLetter(nav.category)} data={nav.symbol} />) }

            </div>


        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps) (SideNav);