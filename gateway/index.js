const express = require("express");

const app = express();

const CONSUL_HOST = process.env.CONSUL_HOST;
const PORT = 8080;

async function getService(serviceName) {
  const response = await fetch(
    `http://${CONSUL_HOST}:8500/v1/catalog/service/${serviceName}`
  );

  const services = await response.json();

  if (!services.length) {
    throw new Error("Service not found");
  }

  return services[0];
}

app.get("/:service/info", async (req, res) => {
  try {
    const serviceName = req.params.service;

    const service = await getService(serviceName);

    const response = await fetch(
      `http://${service.ServiceAddress}:${service.ServicePort}/info`
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});