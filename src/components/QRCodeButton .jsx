import { QrcodeOutlined } from "@ant-design/icons";
import { Button, QRCode } from "antd";
import React, { useState } from "react";

const QRCodeButton = ({
  link = "https://ant.design/", // The link for the QR code
  iconUrl = "", // Optional icon inside the QR code
  bgColor = "#fff", // Background color of the QR code
  qrCodeSize = 256, // Size of the QR code
  fileName = "QRCode", // File name for the download
}) => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  // Function to download the SVG QR code
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
    <div
      id="myqrcode"
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Button that shows QR Code on hover */}
      <Button
        className="border-none color-blue"
        icon={<QrcodeOutlined />}
        onClick={downloadSvgQRCode}
      >
        QR Code
      </Button>

      {/* QR Code is displayed on hover */}
      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: "-450px",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: 10,
            padding: 10,
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <QRCode
            type="svg"
            value={link}
            size={qrCodeSize}
            bgColor={bgColor}
            icon={"/public/logo.jpeg"}
          />
        </div>
      )}
    </div>
  );
};

export default QRCodeButton;
