import React, { useEffect } from 'react';

declare const window: Window &
  typeof globalThis & {
    ScanbotSDK: any
  }

interface IBarCodeScannerNew {
  handleBarcode?: (barcode: string) => void;
}

const BarCodeScannerNew: React.FC<IBarCodeScannerNew> = ({ handleBarcode }) => {
  // trial key only valid for localhost!
  const LICENSE_KEY = 
    "ZOSrZgQW3HFwFPDrKVJMI0tOt45RXy" +
    "f7VN0JXqf/PHaVyna1Dwxq2a6zy9Fs" +
    "p98ZMih2vyy2v0yXSGURo4NpCo3dt4" +
    "IVezf6Nzoxv7qYC2Xrte5AnZEycUDK" +
    "h965+GJd5OtHTguTIa9mraP13tIspc" +
    "j6jQvJqRx+f4i2hLdQsFvuA3cNOlxG" +
    "24yvYqE9gL2wECFFkWvxyXvPhLQzt+" +
    "sbuCAa7WAy4oWivooKySMr2/giPD0U" +
    "1FysRWdG3eNhYsNYZMsW7xc4HwdchY" +
    "PP0v/e6DJiWTeMSU2tnC2Qv1DWoURU" +
    "eZRklQGGc7OohweDjEfq4y3bVEzGQp" +
    "n/ym2At3ZesQ==\nU2NhbmJvdFNESw" +
    "psb2NhbGhvc3R8ZWRkeWZyYW5rLmRl" +
    "CjE2ODIxMjE1OTkKNTEyCjg=\n";

  const barCodeStart = async () => {
    const config = {
      onBarcodesDetected: (e: any) => handleBarcode && handleBarcode(`${e.barcodes[0].text} (${e.barcodes[0].format})`),
      containerId: 'barcode-view',
      style: {
        window: {
          aspectRatio: 2.5,
          paddingPropLeft: 0.2,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        },
      },
      videoConstraints: {
        facingMode: 'environment',
        resizeMode: 'none',
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 },
        experimental: {
          focusMode: 'continous',
          focusDistance: 0,
        },
      },
      engineMode: 'NEXT_GEN',
      //barcodeFormats: ['EAN_8', 'EAN_13'],
    };

    const sdk = await window.ScanbotSDK.initialize({ licenseKey: LICENSE_KEY, engine: '/' });
    sdk.createBarcodeScanner(config);
  };

  useEffect(() => {
    if (window.ScanbotSDK) {
      barCodeStart();
    } else {
      alert('ERROR: Scanbot SDK JS not loaded (yet)!');
    }
  });

  return (
    <>
      <div id="barcode-view" />
    </>
  );
};

export default BarCodeScannerNew;