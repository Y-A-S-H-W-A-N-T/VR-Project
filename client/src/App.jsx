import 'aframe';
import { Routes, Route, BrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Panoramic from './screens/panoramic.jsx';
import AR from './screens/ar.jsx';
import Home from './screens/home.jsx';
import MobileAR from './screens/mobileAR.jsx';
import Property from './screens/property.jsx';
import { Register } from './screens/register.jsx';
import { PropUpload } from './screens/propUploads.jsx';
import Initial from './screens/initial.jsx';
import Furniture from './screens/furniture.jsx';
import Model3D from './screens/Model3D.jsx';
import { Login } from './screens/login.jsx';
import UserPropertyList from './screens/UserProperty.jsx';
import {PrivateRoute} from './Private/PrivateRoute.jsx';
import {PublicRoute} from './Private/PublicRoute.jsx'
import Dash from './screens/Dash.jsx'
import Request from './screens/request.jsx';

// import { useUser } from './useContext.jsx'; 


// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const { userId } = useUser();

//   return (
//     <Routes>
//     <Route
//       {...rest}
//       element={userId ? <Outlet /> : <Navigate to="/login" />}
//     /></Routes>
//   );
// };

function App() {
  return (
    <div>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Initial />} />
          <Route path="/home" element={<Home />} />
          <Route path="/vr-view" element={<Panoramic />} />
          <Route path="/ar" element={<AR />} />
          <Route path="/mobilear" element={<MobileAR />} />
          <Route path="/property" element={<Property />} />
          <Route path="/request" element={<Request />} />
         
          <Route path="/propUpload" element={<PropUpload />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/3D-model" element={<Model3D />} />

          <Route path="/p" element={<PrivateRoute />} >
          <Route path='userPropertyList' element={<UserPropertyList />} />
          </Route>
          
          <Route path="/a" element={<PublicRoute />} >
             <Route path="login" element={<Login />} />
             <Route path="register" element={<Register />} />
          </Route>
        </Routes>
        
       
      </BrowserRouter>
    </div>
  )
}

export default App;
