import {Routes as ReactDomRoutes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import LogIn from '../pages/LogIn';
import Products from '../pages/Products';
import ContactUs from '../pages/ContactUs';
import AboutUs from '../pages/AboutUs';


function Routes(){
    return(
        <ReactDomRoutes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="*" element={<h1>Not Found</h1>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path='/contact' element={<ContactUs/>}/>
            <Route path='/about' element={<AboutUs/>}/>
        </ReactDomRoutes>
    )
}

export default Routes;