import FileUploadWrapper from '../../FileUploadWrapper'
import { QrCodeScanner } from '../../QrCodeScanner'

function EmbarqueStage() {
  return (
    <div>
        Embarque
        <QrCodeScanner />
        <section>
          <h3 className="step-title">5. Comparar </h3>
          <FileUploadWrapper />
        </section>

    </div>
  )
}

export default EmbarqueStage
