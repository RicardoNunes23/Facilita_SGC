const express = require("express");
const clientsRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Criação de um novo cliente (C)
clientsRoutes.post("/clients", async (request, response) => {
  try {
    const { name, email, phone, coordenate_x, coordenate_y } = request.body;
    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        coordenate_x,
        coordenate_y,
      },
    });

    return response.status(201).json(client);
  } catch (error) {
    console.error("Error creating client:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});

// Recuperação de todos os clientes (R)
clientsRoutes.get("/clients", async (request, response) => {
  try {
    const clients = await prisma.client.findMany();
    return response.status(200).json(clients);
  } catch (error) {
    console.error("Error retrieving clients:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});

// Atualização de um cliente existente (U)
clientsRoutes.put("/clients/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { name, email, phone, coordenate_x, coordenate_y } = request.body;

    if (!id) {
      return response.status(400).json({ error: "Id is mandatory" });
    }

    const clientAlreadyExist = await prisma.client.findUnique({
      where: { id: parseInt(id) },
    });

    if (!clientAlreadyExist) {
      return response.status(404).json({ error: "Client not found" });
    }

    const updatedClient = await prisma.client.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        phone,
        coordenate_x,
        coordenate_y,
      },
    });

    return response.status(200).json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});

// Exclusão de um cliente (D)
clientsRoutes.delete("/clients/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const intId = parseInt(id);

    if (!intId) {
      return response.status(400).json({ error: "Id is mandatory" });
    }

    const clientAlreadyExist = await prisma.client.findUnique({
      where: { id: intId },
    });

    if (!clientAlreadyExist) {
      return response.status(404).json({ error: "Client not found" });
    }

    await prisma.client.delete({ where: { id: intId } });

    return response.status(200).send();
  } catch (error) {
    console.error("Error deleting client:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = clientsRoutes;