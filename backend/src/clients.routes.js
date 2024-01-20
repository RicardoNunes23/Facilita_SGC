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

// Rota para calcular a rota otimizada (usando o algoritmo do Caixeiro Viajante)
clientsRoutes.post("/clients/rota-otimizada", async (request, response) => {
  try {
    // Extrair IDs dos clientes a serem visitados a partir do corpo da requisição
    const { clientesIds } = request.body;

    // Verificar se os IDs dos clientes foram fornecidos
    if (!clientesIds || clientesIds.length === 0) {
      return response.status(400).json({ error: "IDs de cliente são obrigatórios" });
    }

    // Buscar coordenadas dos clientes no banco de dados
    const clientes = await prisma.client.findMany({
      where: { id: { in: clientesIds } },
      select: { id: true, coordenate_x: true, coordenate_y: true, name: true, email: true, phone: true },
    });

    // Verificar se todos os clientes foram encontrados
    if (clientes.length !== clientesIds.length) {
      return response.status(404).json({ error: "Um ou mais clientes não encontrados" });
    }

    // Escolher o ponto de partida
    const startingPoint = { coordenate_x: 0, coordenate_y: 0, name: "Ponto de Partida" };

    // Inserir o ponto de partida na lista de clientes
    clientes.unshift(startingPoint);

    // Ordenar os clientes otimizando a rota usando o algoritmo do Caixeiro Viajante
    const ordemVisita = calcularRotaOtimizada(clientes);

    // Remover o ponto de partida do resultado antes de retornar
    ordemVisita.shift();

    return response.status(200).json(ordemVisita);
  } catch (error) {
    console.error("Erro ao calcular rota otimizada:", error);
    return response.status(500).json({ error: "Erro Interno do Servidor" });
  }
});


// Função para calcular a rota otimizada (usando o algoritmo do Caixeiro Viajante - Vizinho Mais Próximo)
function calcularRotaOtimizada(clientes) {
  if (clientes.length < 2) {
    return clientes; // Nada a otimizar com menos de dois clientes
  }

  const rotaOtimizada = [clientes[0]]; // Começamos com o primeiro cliente na rota
  const clientesRestantes = [...clientes.slice(1)]; // Resto dos clientes a serem visitados

  while (clientesRestantes.length > 0) {
    const clienteAtual = rotaOtimizada[rotaOtimizada.length - 1];
    let clienteMaisProximo;
    let distanciaMinima = Number.MAX_VALUE;

    // Encontrar o cliente mais próximo do cliente atual
    for (const cliente of clientesRestantes) {
      const distancia = calcularDistancia(clienteAtual, cliente);
      if (distancia < distanciaMinima) {
        distanciaMinima = distancia;
        clienteMaisProximo = cliente;
      }
    }

    // Adicionar o cliente mais próximo à rota otimizada
    rotaOtimizada.push(clienteMaisProximo);
    clientesRestantes.splice(clientesRestantes.indexOf(clienteMaisProximo), 1);
  }

  return rotaOtimizada;
}

// Função auxiliar para calcular a distância euclidiana entre dois clientes
function calcularDistancia(clienteA, clienteB) {
  const deltaX = clienteA.coordenate_x - clienteB.coordenate_x;
  const deltaY = clienteA.coordenate_y - clienteB.coordenate_y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}


module.exports = clientsRoutes;
