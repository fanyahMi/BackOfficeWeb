import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));

// annonce page
const Annonces = Loadable(lazy(() => import('app/views/annonce/list/AppTable')));

// stat page
const Accueil = Loadable(lazy(() => import('app/views/acceuil/AppTableauBord')));

const Users = Loadable(lazy(() => import('app/views/utilisateur/list/AppTable')));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,

      // statistique route
      {
        path: '/accueil',
        element: <Accueil />,
        auth: authRoles.admin
      },

      // annonce route
      {
        path: '/public/annonces',
        element: <Annonces />,
        auth: authRoles.admin
      },
      {
        path: '/utilisateur',
        element: <Users />,
        auth: authRoles.admin
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },

  { path: '/', element: <Navigate to="/accueil" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
