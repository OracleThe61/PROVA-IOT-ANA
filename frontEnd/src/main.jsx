import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from './layout/Layout.jsx';
import Error from './pages/Error.jsx';
import { AuthProvider } from './context/Context.jsx';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha.jsx';
import Home from './pages/Home/Home.jsx';
import ListaUsuarios from './pages/ListaUsuarios/ListaUsuarios.jsx';
import Login from './pages/Login/Login.jsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "cadastro", element: <Cadastro /> },
      { path: "home", element: <Home /> },
      { path: "esqueciSenha", element: <RecuperarSenha /> },
      { path: "usuario", element: <ListaUsuarios /> },
      { path: "*", element: <Error /> },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
