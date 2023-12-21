// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import AllSpots from './components/Spots/Spots';
import SpotDetails from './components/SpotDetails/SpotDetails';
import ManageSpots from './components/ManageSpots/ManageSpots';
import CreateSpot from './components/CreateSpot/CreateSpot';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
       <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <AllSpots />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails />
      },
      {
        path: '/spots/current',
        element: <ManageSpots />
      },
      {
        path: '/spots/new',
        element: <CreateSpot />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
