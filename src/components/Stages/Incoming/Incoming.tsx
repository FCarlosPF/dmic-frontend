import { useState } from "react"
import BarcodeScanner from "../../BarCodeScanner"
import FileUploadWrapper from "../../FileUploadWrapper"
import Header from "../../Header/Header"
import { QrCodeScanner } from "../../QrCodeScanner"
import { Search } from "../../Search/search"
import Title from "../../Title/Title"
import "./Incoming.css"


export const Incoming = () => {
  const [scannedBarcode, setScannedBarcode] = useState("")
  const [searchSerial, setSearchSerial] = useState("")


  const handleScan = (barcode: string) => {
    // Aquí puedes manejar la respuesta del servidor
    // Por ejemplo, puedes hacer una solicitud al backend para obtener más información sobre el producto

    // Supongamos que tu API devuelve un objeto con la información del producto

    console.log(barcode);
    setScannedBarcode(barcode);

    /*fetch(`http://localhost:3000/catalogoChina/iqms/${barcode}`)
      .then((response) => response.json())
      .then((product) => {
        console.log('Producto encontrado:', product);
        setScannedBarcode(barcode);
        // Realiza las acciones necesarias con la información del producto
      })
      .catch((error) => {
        console.error('Error al obtener el producto:', error);
        setScannedBarcode("");
      });*/


  };



  return (
    <div>
      <Header />
      <Title text="INCOMING" />
      <main className="incoming">
        <section>
          <h3 className="step-title">1. Busqueda del producto </h3>
          <Search />
          <p> Serial de prueba : 7702354930998</p>
        </section>
        <section>
          <h3 className="step-title">2. Escanear con el codigo de barras</h3>

          <BarcodeScanner onScan={handleScan} />
          {
            scannedBarcode ?
              <p>
                Producto encontrado con el código de barras:
                {scannedBarcode}
              </p>
              :
              <p>Aún no ha escaneado un código de barras.</p>
          }


        </section>

<section>
          <h3 className="step-title">4. Copiar los seriales </h3>

          <p><strong>Serial encontrado en la busqueda : </strong>
            {searchSerial ?
              searchSerial
              :
              "Aún no ha buscado un producto."
            }
          </p>
          
          <p>
            <strong>Serial encontrado con el scanner de código de barras : </strong>
            {scannedBarcode ?
              scannedBarcode
              :
              "Aún no ha escaneado un código de barras."
            }
          </p>
        </section>
        <section>
          <h3 className="step-title">5. Comparar </h3>
          <FileUploadWrapper />
        </section>
      </main>
    </div>
  )
}
