import { Button, Segmented, Space } from "antd";
import { useState, useRef } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";

const QRCodeButton = ({
  link = "https://ant.design/", // The link for the QR code
  bgColor = "#fff", // Background color of the QR code
  qrCodeSize = 256, // Size of the QR code
  fileName = "QRCode", // File name for the download
}) => {
  const [renderType, setRenderType] = useState("canvas"); // State to manage QR code type
  const canvasRef = useRef(); // Reference to the hidden canvas

  // Function to download canvas QR code as PNG
  const downloadCanvasQRCode = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      doDownload(url, `${fileName}.png`);
    }
  };

  // Function to download SVG QR code
  const downloadSvgQRCode = () => {
    const svgElement = document.getElementById("svgQRCode");
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
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
    <Space direction="vertical" align="center">
      {/* Segmented control to toggle between canvas and SVG */}
      <Segmented
        options={["canvas", "svg"]}
        onChange={(val) => setRenderType(val)}
      />

      {/* Hidden QR Code for canvas download */}
      {renderType === "canvas" && (
        <div style={{ display: "none" }} ref={canvasRef}>
          <QRCodeCanvas value={link} size={qrCodeSize} bgColor={bgColor} />
        </div>
      )}

      {/* Hidden QR Code for SVG download */}
      {renderType === "svg" && (
        <div style={{ display: "none" }}>
          <QRCodeSVG
            id="svgQRCode"
            value={link}
            size={qrCodeSize}
            bgColor={bgColor}
          />
        </div>
      )}

      {/* Button to download QR code */}
      <Button
        type="primary"
        onClick={
          renderType === "canvas" ? downloadCanvasQRCode : downloadSvgQRCode
        }
      >
        Download QR Code
      </Button>
    </Space>
  );
};

export default QRCodeButton;
