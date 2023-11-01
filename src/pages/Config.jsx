import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const productsData = require("../products.json");

const Config = () => {
  const { id } = useParams();
  const [cpuOptions, setCpuOptions] = useState([]);
  const [gpuOptions, setGpuOptions] = useState([]);
  const [ramOptions, setRamOptions] = useState([]);
  const [storageOptions, setStorageOptions] = useState([]);
  const [selectedSpecifications, setSelectedSpecifications] = useState({
    "CPU": "",
    "GPU": "",
    "RAM": "",
    "Storage": "",
  });

  useEffect(() => {

    if (productsData[id - 1]) {
      const product = productsData[id - 1];
      setCpuOptions(product.cpu);
      setGpuOptions(product.gpu);
      setRamOptions(product.ram);
      setStorageOptions(product.storage);

      setSelectedSpecifications({
        CPU: product.cpu[0] || "Not selected",
        GPU: product.gpu[0] || "Not selected",
        RAM: product.ram[0] || "Not selected",
        Storage: product.storage[0] || "Not selected",
      });
    }
  }, [id]);

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Specifications:</h2>
      <ul className="list-unstyled" style={{ fontSize: "1.2rem" }}>
        {Object.entries(selectedSpecifications).map(([optionType, selectedOption], index) => (
          <li key={index} className="mb-3">
            <i
              className={`fa ${
                optionType === "CPU"
                  ? "fa-microchip"
                  : optionType === "GPU"
                  ? "fa-desktop"
                  : optionType === "RAM"
                  ? "fa-memory"
                  : optionType === "Storage"
                  ? "fa-hdd-o"
                  : ""
              } fa-fw mr-2`}
            ></i>
            <strong>{optionType}:</strong> {selectedOption}
          </li>
        ))}
      </ul>

      <hr className="my-4" />

      <h2 className="mb-4">Configuration Options:</h2>

      <div className="mb-4">
        <label className="form-label" style={{ fontSize: "1.2rem" }}>
          <i className="fa fa-microchip fa-fw mr-2"></i> CPU:
        </label>
        <select
          className="form-select"
          value={selectedSpecifications.CPU}
          onChange={(e) => {
            setSelectedSpecifications({
              ...selectedSpecifications,
              CPU: e.target.value,
            });
          }}
        >
          {cpuOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label" style={{ fontSize: "1.2rem" }}>
          <i className="fa fa-desktop fa-fw mr-2"></i> GPU:
        </label>
        <select
          className="form-select"
          value={selectedSpecifications.GPU}
          onChange={(e) => {
            setSelectedSpecifications({
              ...selectedSpecifications,
              GPU: e.target.value,
            });
          }}
        >
          {gpuOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label" style={{ fontSize: "1.2rem" }}>
          <i className="fa fa-memory fa-fw mr-2"></i> RAM:
        </label>
        <select
          className="form-select"
          value={selectedSpecifications.RAM}
          onChange={(e) => {
            setSelectedSpecifications({
              ...selectedSpecifications,
              RAM: e.target.value,
            });
          }}
        >
          {ramOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label" style={{ fontSize: "1.2rem" }}>
          <i className="fa fa-hdd-o fa-fw mr-2"></i> Storage:
        </label>
        <select
          className="form-select"
          value={selectedSpecifications.Storage}
          onChange={(e) => {
            setSelectedSpecifications({
              ...selectedSpecifications,
              Storage: e.target.value,
            });
          }}
        >
          {storageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Config;

