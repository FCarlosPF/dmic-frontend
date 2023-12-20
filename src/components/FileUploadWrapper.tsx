import React, { useState } from 'react';
import FileUpload from './FileUpload'; // Asegúrate de proporcionar la ruta correcta al componente FileUpload

const FileUploadWrapper: React.FC = () => {
  const [responseValues, setResponseValues] = useState<string[]>([]);

  const onFileUpload = (responseValue: string) => {
    setResponseValues(prevValues => [...prevValues, responseValue]);
  };

  const renderVerificationResult = () => {
    if (responseValues.length === 2 && responseValues[0] === responseValues[1]) {
      return <p>Los valores coinciden: {responseValues[0]}</p>;
    } else {
      return <p>Los valores no coinciden o no se han recibido ambos aún.</p>;
    }
  };

  return (
    <div>
      <FileUpload onUpload={onFileUpload} />
      <FileUpload onUpload={onFileUpload} />
      {renderVerificationResult()}
    </div>
  );
};

export default FileUploadWrapper;
