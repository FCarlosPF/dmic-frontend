import React from 'react';

interface ComponenteAImprimirProps {
  content: string;
}

const ComponenteAImprimir: React.FC<ComponenteAImprimirProps> = ({ content }) => {
  return (
    <div>
      <h1>Componente a Imprimir</h1>
      <p>{content}</p>
    </div>
  );
};

export default ComponenteAImprimir;