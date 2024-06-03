import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { check } from '../api/userApi' 
import { useDispatch } from 'react-redux';
import { loadUser } from '../redux/slices/userSlice';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {

  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const result = await check();
        if(result){

dispatch(loadUser(result));
        }
      setIsAuthenticated(result !== false);
    };
    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    // Вы можете добавить индикатор загрузки, пока проверка не завершится
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;