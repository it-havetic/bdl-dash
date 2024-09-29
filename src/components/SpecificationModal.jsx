import { Col, Divider, Modal, Row, Tag } from "antd";
import PropTypes from "prop-types";

const SpecificationModal = ({ visible, onClose, specification }) => {
  // Check if specification is available
  if (!specification) {
    return (
      <Modal
        title="Specification Details"
        visible={visible}
        onCancel={onClose}
        footer={null}
        className="!w-[900px]" // Full width for better readability
        style={{ top: 20 }} // Adjust position if needed
      >
        <p>Loading...</p>
      </Modal>
    );
  }

  return (
    <Modal
      title="Specification Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width="60%" // Full width for better readability
      style={{ top: 20 }} // Adjust position if needed
      bodyStyle={{ padding: 0 }} // Optional: Remove default padding
    >
      {/* Grouped Specification Details */}
      <Row gutter={[16, 16]} style={{ padding: "20px", fontSize: "20px" }}>
        {/* Increased base font size */}
        <Col span={12}>
          <span style={{ fontSize: "18px" }}>Group:</span>{" "}
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            {specification.group?.name || "N/A"}
          </span>
        </Col>
        <Col span={12}>
          <span style={{ fontSize: "18px" }}>Note:</span>{" "}
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            {specification.note || ""}
          </span>
        </Col>
        <Col span={12}>
          <span style={{ fontSize: "18px" }}>Series:</span>{" "}
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            {specification.series?.name || "N/A"}
          </span>
        </Col>
        <Col span={12}>
          <span style={{ fontSize: "18px" }}>Sub-series:</span>{" "}
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            {specification.subSeries?.name || "N/A"}
          </span>
        </Col>

        {/* All Array Data Moved to Left Side */}
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <span style={{ fontSize: "18px" }}>Watts:</span>{" "}
              {specification.watts?.map((watt) => (
                <Tag key={watt} color="blue" style={{ fontSize: "20px" }}>
                  {watt}
                </Tag>
              )) || "N/A"}
            </Col>
            <Col span={12}>
              <span style={{ fontSize: "18px" }}>Lumens:</span>{" "}
              {specification.lumens?.map((lumen) => (
                <Tag key={lumen} color="green" style={{ fontSize: "20px" }}>
                  {lumen}
                </Tag>
              )) || "N/A"}
            </Col>
            <Col span={12}>
              <span style={{ fontSize: "18px" }}>Beam Angle:</span>{" "}
              {specification.beamAngle?.map((angle) => (
                <Tag key={angle} color="orange" style={{ fontSize: "20px" }}>
                  {angle}
                </Tag>
              )) || "N/A"}
            </Col>
            <Col span={12}>
              <span style={{ fontSize: "18px" }}>Rim Color:</span>{" "}
              {specification.rimColor?.map((color) => (
                <Tag key={color} color="purple" style={{ fontSize: "20px" }}>
                  {color}
                </Tag>
              )) || "N/A"}
            </Col>
            <Col span={12}>
              <span style={{ fontSize: "18px" }}>Mounting:</span>{" "}
              {specification.mounting_array?.map((mount) => (
                <Tag key={mount} color="cyan" style={{ fontSize: "20px" }}>
                  {mount}
                </Tag>
              )) || "N/A"}
            </Col>
            <Col span={12}>
              <span style={{ fontSize: "18px" }}>Glare:</span>{" "}
              {specification.glare?.map((g) => (
                <Tag key={g} color="volcano" style={{ fontSize: "20px" }}>
                  {g}
                </Tag>
              )) || "N/A"}
            </Col>
            <Col span={12}>
              <span style={{ fontSize: "18px" }}>Body Color:</span>{" "}
              {specification.bodyColor?.map((color) => (
                <Tag key={color} color="lime" style={{ fontSize: "20px" }}>
                  {color}
                </Tag>
              )) || "N/A"}
            </Col>
            <Col span={12}>
              <span style={{ fontSize: "18px" }}>Dimming:</span>{" "}
              {specification.dimming?.map((dim) => (
                <Tag key={dim} color="magenta" style={{ fontSize: "20px" }}>
                  {dim}
                </Tag>
              )) || "N/A"}
            </Col>
            <Col span={12}>
              <span style={{ fontSize: "18px" }}>CCT:</span>{" "}
              {specification.cct?.map((cct) => (
                <Tag key={cct} color="red" style={{ fontSize: "20px" }}>
                  {cct}
                </Tag>
              )) || "N/A"}
            </Col>
            <Col span={12}>
              <span style={{ fontSize: "18px" }}>IP:</span>{" "}
              {specification.ip?.map((ip) => (
                <Tag key={ip} color="skyBlue" style={{ fontSize: "20px" }}>
                  {ip}
                </Tag>
              )) || "N/A"}
            </Col>
          </Row>
        </Col>

        {/* Non-Array Data (Right Side) */}
        <Col span={12}>
          <span style={{ fontSize: "18px" }}>Dimension:</span>{" "}
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            {specification.dimention || "N/A"}
          </span>
        </Col>
        <Col span={12}>
          <span style={{ fontSize: "18px" }}>Shape:</span>{" "}
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            {specification.shape || "N/A"}
          </span>
        </Col>
        <Col span={12}>
          <span style={{ fontSize: "18px" }}>Thickness:</span>{" "}
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            {specification.thickness || "N/A"}
          </span>
        </Col>
        <Col span={12}>
          <span style={{ fontSize: "18px" }}>Mounting:</span>{" "}
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            {specification.mounting || "N/A"}
          </span>
        </Col>
        <Col span={12}>
          <span style={{ fontSize: "18px" }}>Finish:</span>{" "}
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            {specification.finish || "N/A"}
          </span>
        </Col>
        <Col span={12}>
          <span style={{ fontSize: "18px" }}>Capacity:</span>{" "}
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            {specification.capacity || "N/A"}
          </span>
        </Col>
        <Col span={12}>
          <span style={{ fontSize: "18px" }}>Customization:</span>{" "}
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            {specification.customization || "N/A"}
          </span>
        </Col>
      </Row>

      <Divider />

      {/* Media Section (Image and Video) */}
      <Row style={{ padding: "20px", fontSize: "20px", height: "480px" }}>
        <Col span={12}>
          <span style={{ fontSize: "18px" }}>Image:</span>{" "}
          {specification.image ? (
            <img
              src={`${import.meta.env.VITE_URL}${specification.image}`}
              alt="Product"
              style={{ height: "70%", borderRadius: "5px", marginTop: "10px" }} // Added border radius and margin
            />
          ) : (
            "N/A"
          )}
        </Col>
        <Col span={12}>
          <span style={{ fontSize: "18px" }}>Video:</span>{" "}
          {specification.video ? (
            <video
              src={`${import.meta.env.VITE_URL}${specification.video}`}
              controls
              style={{ width: "100%", borderRadius: "5px", marginTop: "10px" }} // Set width to 100% for responsiveness
            />
          ) : (
            "N/A"
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default SpecificationModal;

SpecificationModal.propTypes = {
  specification: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
