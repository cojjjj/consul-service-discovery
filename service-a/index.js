const express = require("express");

const app = express();

const SERVICE_NAME = process.env.SERVICE_NAME;
const DISPLAY_NAME = process.env.DISPLAY_NAME;
const SERVICE_PORT = process.env.SERVICE_PORT;
const CONSUL_HOST = process.env.CONSUL_HOST;

app.get("/info", (req, res) => {
  res.json({
    service: DISPLAY_NAME,
    timestamp: new Date().toISOString()
  });
});

app.listen(SERVICE_PORT, async () => {
  console.log(`${DISPLAY_NAME} running on port ${SERVICE_PORT}`);

  await fetch(`http://${CONSUL_HOST}:8500/v1/agent/service/register`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Name: SERVICE_NAME,
      Address: SERVICE_NAME,
      Port: Number(SERVICE_PORT),
      Check: {
        HTTP: `http://${SERVICE_NAME}:${SERVICE_PORT}/info`,
        Interval: "10s"
      }
    })
  });

  console.log(`${DISPLAY_NAME} registered with Consul`);
});