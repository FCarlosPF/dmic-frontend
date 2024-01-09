import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";

interface TrazabilidadData {
  id: number;
  iqms: number;
  salida_incoming: string;
  salida_empaque: string;
  salida_embarque: string;
  id_usuario: number;
}
interface CustomHtml5QrcodeScannerConfig extends Html5QrcodeScannerConfig {
  verbose?: boolean;
}

export const QrCodeScanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<TrazabilidadData | null>(null);

  useEffect(() => {
    const config: CustomHtml5QrcodeScannerConfig = {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
      verbose: false,
    };

    const scanner = new Html5QrcodeScanner("reader", config, false);

    let isScanning = true;

    scanner.render(success, error);

    async function success(result: string) {
      if (isScanning) {
        try {
          // Realizar una solicitud al backend para obtener los datos de trazabilidad
          const response = await fetch(`http://localhost:3000/trazabilidad-china/qr/${result}`);
          if (!response.ok) {
            throw new Error(
              `Error en la solicitud: ${response.status} ${response.statusText}`
            );
          }

          const jsonData = await response.json();

          const data: TrazabilidadData = jsonData.datosTrazabilidad;

          console.log("Respuesta del servidor:", data);

          setScanResult(data);
        } catch (error) {
          console.error("Error al obtener datos de trazabilidad:", error);
        }

        scanner.clear();
        isScanning = false; // Set isScanning to false to stop further scanning
      }
    }

    function error(err: any) {
      console.warn(err);
    }

    return () => {
      // Limpia el scanner cuando el componente se desmonta
      scanner.clear();
    };
  }, []);

  return (
    <div className="App">
      <h3>QR Scanning Code</h3>
      {scanResult ? (
        <div>
          <p>
            Success: <a href={String(scanResult.id)}>{String(scanResult.id)}</a>
          </p>
          {/* Muestra otros datos de trazabilidad según sea necesario */}
        </div>
      ) : (
        <div>
          <div id="reader"></div>
        </div>
      )}
    </div>
  );
};
