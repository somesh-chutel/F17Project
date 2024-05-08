import {Route,Routes} from 'react-router-dom';
import Login from './component/login';
import AllJobs from './component/allJobs';
import Home from './component/home';
import NotFound from './component/notFound';

const App  = ()=> (

  <Routes>

        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/jobs' element={<AllJobs/>}></Route>
        <Route path='/*' element={<NotFound/>}></Route>


  </Routes>
)



export default App;