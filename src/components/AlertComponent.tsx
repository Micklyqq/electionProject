import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

interface AlertProps {
  successMessage: string;
  errorMessage: string;
  showSuccess: boolean;
  showError: boolean;
}

const AlertComponent: React.FC<AlertProps> = ({
  successMessage,
  errorMessage,
  showSuccess,
  showError,
}) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    if (showSuccess) {
      setShowSuccessAlert(true);
    }
  }, [showSuccess]);

  useEffect(() => {
    if (showError) {
      setShowErrorAlert(true);
    }
  }, [showError]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px', // Регулируйте расстояние от правого края
      zIndex: '1000', // Устанавливаем z-index, чтобы уведомление было поверх остального содержимого
    }}>
      <Alert variant="success" style={{ display: showSuccessAlert ? 'block' : 'none' }}>
        {successMessage}
      </Alert>
      <Alert variant="danger" style={{ display: showErrorAlert ? 'block' : 'none' }}>
        {errorMessage}
      </Alert>
    </div>
  );
};

export default AlertComponent;
