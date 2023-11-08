import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import SearchPage from './pages/Search';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import App from './App';
import Second from './pages/Calendar';
import ScratchWork from './pages/ScratchWork';
import AuthRoute from './components/AuthRoute';
import Login from './pages/Login';
import {IndividualGallery, GalleryHome} from './pages/Gallery';
import FriendsPage from './pages/FriendsPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "/",
    element: <AuthRoute page={<App/>}/>
  },
  {
    path: "search",
    element: <AuthRoute page={<SearchPage/>}/>
  },
  {
    path: "second-page",
    element: <AuthRoute page={<Second/>}/>
  },
  {
    path: "scratch-work",
    element: <AuthRoute page={<ScratchWork/>}/>
  },
  {
    path: "gallery",
    element: <AuthRoute page={<GalleryHome/>}/>
  },
  {
    path: "gallery/:id",
    element: <AuthRoute page={<IndividualGallery/>}/>
  },
  {
    path: "friends",
    element: <AuthRoute page={<FriendsPage/>}/>

  }
]);

root.render(
    <RouterProvider router={router} />
);

