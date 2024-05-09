import {Route,Routes} from 'react-router-dom';
import Login from './component/login';
import AllJobs from './component/allJobs';
import Home from './component/home';
import NotFound from './component/notFound';
import ProtectedRoute from './component/protectedRoute';

const App  = ()=> (

  <Routes>

        <Route path='/' element={<ProtectedRoute Component={Home}/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/jobs' element={<ProtectedRoute Component = {AllJobs}/>}></Route>
        <Route path='/*' element={<NotFound/>}></Route>


  </Routes>
)



export default App;