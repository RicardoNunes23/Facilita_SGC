import axios from "axios";

const API_BASE_URL = "http://localhost:3333/clients";

// Função para obter a lista de clientes
export const getClients = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// Função para editar informações de um cliente
export const editClient = async (selectedClient, inputValue, emailValue, phoneValue, coordenate_xValue, coordenate_yValue) => {
  // Converter coordenadas para float
  const coordenate_xFloat = parseFloat(coordenate_xValue);
  const coordenate_yFloat = parseFloat(coordenate_yValue);

  // Verificar se as coordenadas são válidas
  if (isNaN(coordenate_xFloat) || isNaN(coordenate_yFloat)) {
    // Tratar coordenadas inválidas (por exemplo, exibir uma mensagem de erro)
    console.error("Coordenadas inválidas inseridas.");
    return;
  }

  // Enviar requisição para editar o cliente
  const response = await axios.put(API_BASE_URL, {
    id: selectedClient.id,
    name: inputValue,
    email: emailValue,
    phone: phoneValue,
    coordenate_x: coordenate_xFloat,
    coordenate_y: coordenate_yFloat,
  });

  // Recarregar a página após a edição
  window.location.reload();
  return response.data;
};

// Função para excluir um cliente
export const deleteClient = async (clientId) => {
  // Enviar requisição para excluir o cliente
  const response = await axios.delete(`${API_BASE_URL}/${clientId}`);

  // Recarregar a página após a exclusão
  window.location.reload();
  return response.data;
};

// Função para criar um novo cliente
export const createClient = async (inputValue, emailValue, phoneValue, coordenate_xValue, coordenate_yValue) => {
  // Converter coordenadas para float
  const coordenate_xFloat = parseFloat(coordenate_xValue);
  const coordenate_yFloat = parseFloat(coordenate_yValue);

  // Verificar se as coordenadas são válidas
  if (isNaN(coordenate_xFloat) || isNaN(coordenate_yFloat)) {
    // Tratar coordenadas inválidas (por exemplo, exibir uma mensagem de erro)
    console.error("Coordenadas inválidas inseridas.");
    return;
  }

  // Enviar requisição para criar um novo cliente
  const response = await axios.post(API_BASE_URL, {
    name: inputValue,
    email: emailValue,
    phone: phoneValue,
    coordenate_x: coordenate_xFloat,
    coordenate_y: coordenate_yFloat,
  });

  // Recarregar a página após a criação do cliente
  window.location.reload();
  return response.data;
};
