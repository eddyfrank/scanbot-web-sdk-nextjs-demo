import { useState } from 'react';
import Script from 'next/script';
import BarCodeScannerNew from './barcode-scanner.component'

export default function Home() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  
  return (
    <>
      <Script src="/ScanbotSDK.min.js" onReady={() => {setIsScriptLoaded(true)}} />

      {isScriptLoaded && (
        <BarCodeScannerNew handleBarcode={(barcodeValue) => {alert(barcodeValue)}} />
      )}
    </>
  )
}
