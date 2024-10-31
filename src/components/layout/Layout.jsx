import { useLocation } from 'react-router-dom';
import {useEffect} from 'react';


const Layout = ({ children }) => {
    const { pathname } = useLocation();
    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    
    return <div>{children}</div>;
  }
  
  export default Layout