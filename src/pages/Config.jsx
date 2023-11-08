import React, { useState, useEffect, useCallback } from "react";
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

      const cpuNames = product.cpu.map((cpu) => cpu.name);
      const gpuNames = product.gpu.map((gpu) => gpu.name);
      const ramNames = product.ram.map((ram) => ram.name);
      const storageNames = product.storage.map((storage) => storage.name);

      setCpuOptions(cpuNames);
      setGpuOptions(gpuNames);
      setRamOptions(ramNames);
      setStorageOptions(storageNames);

      setSelectedSpecifications({
        CPU: cpuNames[0] || "Not selected",
        GPU: gpuNames[0] || "Not selected",
        RAM: ramNames[0] || "Not selected",
        Storage: storageNames[0] || "Not selected",
      });
    }
  }, [id]);

  const handleCPUDropdownChange = (e) => {
    setSelectedSpecifications({
      ...selectedSpecifications,
      CPU: e.target.value,
    });
  };

  const handleGPUDropdownChange = (e) => {
    setSelectedSpecifications({
      ...selectedSpecifications,
      GPU: e.target.value,
    });
  };

  const handleRAMDropdownChange = (e) => {
    setSelectedSpecifications({
      ...selectedSpecifications,
      RAM: e.target.value,
    });
  };

  const handleStorageDropdownChange = (e) => {
    setSelectedSpecifications({
      ...selectedSpecifications,
      Storage: e.target.value,
    });
  };

  // Calculate the configured price based on the difference between selected and default options
  const getConfiguredPrice = useCallback(() => {
    if (productsData[id - 1]) {
      const product = productsData[id - 1];
      let configuredPrice = parseFloat(product.cost); // Initialize with the product's cost

      const getOptionPriceDifference = (selectedOption, defaultOption) => {
        if (selectedOption !== "Not selected") {
          const selectedComponent = product[defaultOption].find(
            (component) => component.name === selectedOption
          );
          if (selectedComponent) {
            return parseFloat(selectedComponent.price) - parseFloat(product[defaultOption][0].price);
          }
        }
        return 0;
      };

      configuredPrice += getOptionPriceDifference(selectedSpecifications.CPU, "cpu");
      configuredPrice += getOptionPriceDifference(selectedSpecifications.GPU, "gpu");
      configuredPrice += getOptionPriceDifference(selectedSpecifications.RAM, "ram");
      configuredPrice += getOptionPriceDifference(selectedSpecifications.Storage, "storage");

      return configuredPrice;
    }
    return 0;
  }, [id, selectedSpecifications]);

  const [configuredPrice, setConfiguredPrice] = useState(getConfiguredPrice());

  useEffect(() => {
    setConfiguredPrice(getConfiguredPrice());
  }, [selectedSpecifications, id, getConfiguredPrice]);

  return (
    <div className="container mt-4 mb-5">
      <div className="mb-4">
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
      </div>
      <hr />

      <div className="mb-4">
        <h2 className="mb-4">Configuration Options:</h2>

        <p style={{ fontSize: "1.4rem" }}>
          <strong>Total Price: </strong> Rs. {configuredPrice}
        </p>

        <div className="mb-4">
          <label className="form-label" style={{ fontSize: "1.2rem" }}>
            <i className="fa fa-microchip fa-fw mr-2"></i> CPU:
          </label>
          <select
            className="form-select"
            value={selectedSpecifications.CPU}
            onChange={handleCPUDropdownChange}
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
            onChange={handleGPUDropdownChange}
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
            onChange={handleRAMDropdownChange}
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
            onChange={handleStorageDropdownChange}
          >
            {storageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Config;

