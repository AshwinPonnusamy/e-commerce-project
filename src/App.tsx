import { useEffect } from 'react';
import Router from './route/MainRoutes'
import { BrowserRouter, useLocation } from 'react-router-dom'


const App = () => {

  function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }
  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <Router />
      </BrowserRouter>
    </>
  )
}
export default App