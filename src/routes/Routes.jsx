import {Routes as ReactDomRoutes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import LogIn from '../pages/LogIn';
import Products from '../pages/Products';


function Routes(){
    return(
        <ReactDomRoutes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="*" element={<h1>Not Found</h1>}/>
            <Route path="/products" element={<Products/>}/>
        </ReactDomRoutes>
    )
}

export default Routes;