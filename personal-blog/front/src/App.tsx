import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import DashboardAdmin from './components/DashboardAdmin';
import PostDescriptions from './components/PostDescriptions';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/admin' element={<DashboardAdmin />}/>
                <Route path='/admin/add' element={<AddPost />} />
                <Route path='/admin/editar/:id' element={<EditPost />} />
                <Route path='/post/:id' element={<PostDescriptions />}/>
            </Routes>
        </>
    )
}

export default App
