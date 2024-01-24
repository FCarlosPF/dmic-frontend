// @ts-ignore
import Quagga from "quagga";
import React, { useEffect, useRef, useState } from 'react';

interface BarcodeScannerProps {
  onScan: (barcode: string ) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan }) => {
  const videoRef = useRef<HTMLDivElement|HTMLVideoElement | null>(null);
  const [, setError] = useState<string | null>(null);
  

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: videoRef.current, // Cambiado de document.querySelector a videoRef.current
          constraints: {
            width: 640,
            height: 300,
            facingMode: 'environment', // usa la cámara trasera (back camera) si está disponible
          },
        },
        decoder: {
          readers: ['ean_reader', 'code_128_reader',], // o usa otros lectores según tus necesidades
        },
      },
      (err: Error) => {
        if (err) {
          console.error('Error al inicializar Quagga:', err);
          setError('Error al acceder a la cámara. Asegúrate de que la cámara esté disponible y permite el acceso.');
          return;
        }

        Quagga.start();

        Quagga.onDetected((data: any) => {
          const barcode = data.codeResult.code;
          onScan(barcode);
        });
      }
    );

    return () => {
      Quagga.stop();
    };
  }, [onScan]);

  return <div id="barcode-scanner" ref={(element) => (videoRef.current = element)} />; // Agregado ref para videoRef

};

export default BarcodeScanner;