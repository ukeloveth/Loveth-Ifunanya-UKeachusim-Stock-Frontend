import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import routes from './routes';
import { useEffect, useState } from 'react';

function App() {

  const privateRoutes = routes.privateRoutes.map(({ path, element: Component }) => (
    <Route key={path} path={path} element={<Component />} />
  ));

  const publicRoutes = routes.publicRoutes.map(({ path, element: Component }, index) => (
    <Route key={index} path={path} element={<Component />} />
  ));


  return (
    <Router>
      <Routes>
        {privateRoutes}
        {publicRoutes}
      </Routes>
    </Router>
  );
}

export default App;