import { Button, QRCode, Segmented, Space } from "antd";
import React, { useState } from "react";

const QRCodeButton = ({
  link = "https://ant.design/", // The link for the QR code
  iconUrl = "", // Optional icon inside the QR code
  bgColor = "#fff", // Background color of the QR code
  qrCodeSize = 256, // Size of the QR code
  fileName = "QRCode", // File name for the download
}) => {
  const [renderType, setRenderType] = useState("canvas"); // State to manage QR code type

  // Function to download canvas QR code as PNG
  const downloadCanvasQRCode = () => {
    const canvas = document.getElementById("myqrcode")?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      doDownload(url, `${fileName}.png`);
    }
  };

  // Function to download SVG QR code
  const downloadSvgQRCode = () => {
    const svg = document.getElementById("myqrcode")?.querySelector("svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      doDownload(url, `${fileName}.svg`);
    }
  };

  // Utility function to trigger download
  const doDownload = (url, fileName) => {
    const a = document.createElement("a");
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Space id="myqrcode" direction="vertical" align="center">
      {/* Segmented control to toggle between canvas and SVG */}
      <Segmented
        options={["canvas", "svg"]}
        onChange={(val) => setRenderType(val)}
      />

      {/* QR Code generation */}
      <QRCode
        className="hidden"
        type={renderType}
        value={link}
        size={qrCodeSize}
        bgColor={bgColor}
        icon={iconUrl || undefined}
        style={{ marginBottom: 16 }}
      />

      {/* Button to download QR code */}
      <Button
        type="primary"
        onClick={
          renderType === "canvas" ? downloadCanvasQRCode : downloadSvgQRCode
        }
      >
         QR Code
      </Button>
    </Space>
  );
};

export default QRCodeButton;
