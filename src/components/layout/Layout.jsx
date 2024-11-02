import { useLocation } from 'react-router-dom';
import {useEffect} from 'react';


const Layout = ({ children }) => {
    const { pathname } = useLocation();
    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    
    return <div className='flex flex-col content-center'>{children}</div>;
  }
  
  export default Layout
