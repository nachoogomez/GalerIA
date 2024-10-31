import {Routes as ReactDomRoutes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import LogIn from '../pages/LogIn';


function Routes(){
    return(
        <ReactDomRoutes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LogIn/>}/>
        </ReactDomRoutes>
    )
}

export default Routes;