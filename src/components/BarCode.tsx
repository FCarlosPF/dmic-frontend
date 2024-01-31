import React from "react";
import Barcode from "react-barcode";

interface BarCodeProps {
  additionalProp: number;
}

export const BarCode: React.FC<BarCodeProps> = ({ additionalProp }) => {
  const barcodeData = additionalProp.toString();

  return (
    <>
      <Barcode
        value={barcodeData}
        width={4}
        height={30}
        fontSize={12}
        background="transparent"
      />
    </>
  );
};
