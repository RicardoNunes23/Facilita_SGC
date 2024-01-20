const express = require("express");

const allClients = [{ nome: "aaaa", status: false }];
const clientsRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");
const { response } = require("express");

const prisma = new PrismaClient();

// C
clientsRoutes.post("/clients", async (request, response) => {
  const { name } = request.body;
  const client = await prisma.client.create({
    data: {
      name,
    },
  });

  return response.status(201).json(client);
});
// R
clientsRoutes.get("/clients", async (request, response) => {
  const clients = await prisma.client.findMany();
  return response.status(200).json(clients);
});
// U

clientsRoutes.put("/clients", async (request, response) => {
  const { name, id, status } = request.body;

  if (!id) {
    return response.status(400).json("Id is mandatory");
  }

  const clientAlreadyExist = await prisma.client.findUnique({ where: { id } });

  if (!clientAlreadyExist) {
    return response.status(404).json("Client not exist");
  }

  const client = await prisma.client.update({
    where: {
      id,
    },
    data: {
      name,
      status,
    },
  });

  return response.status(200).json(client);
});
// D
clientsRoutes.delete("/clients/:id", async (request, response) => {
  const { id } = request.params;

  const intId = parseInt(id);

  if (!intId) {
    return response.status(400).json("Id is mandatory");
  }

  const clientAlreadyExist = await prisma.client.findUnique({
    where: { id: intId },
  });

  if (!clientAlreadyExist) {
    return response.status(404).json("Client not exist");
  }

  await prisma.client.delete({ where: { id: intId } });

  return response.status(200).send();
});

module.exports = clientsRoutes;