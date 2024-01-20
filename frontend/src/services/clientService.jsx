import axios from "axios";

const API_BASE_URL = "http://localhost:3333/clients";

export const getClients = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const editClient = async (selectedClient, inputValue, emailValue, phoneValue, coordenate_xValue, coordenate_yValue) => {
  const coordenate_xFloat = parseFloat(coordenate_xValue);
  const coordenate_yFloat = parseFloat(coordenate_yValue);

  if (isNaN(coordenate_xFloat) || isNaN(coordenate_yFloat)) {
    // Handle invalid coordinates here (e.g., show an error message)
    console.error("Invalid coordinates entered.");
    return;
  }

  const response = await axios.put(API_BASE_URL, {
    id: selectedClient.id,
    name: inputValue,
    email: emailValue,
    phone: phoneValue,
    coordenate_x: coordenate_xFloat,
    coordenate_y: coordenate_yFloat,
  });

  window.location.reload();
  return response.data;
};

export const deleteClient = async (clientId) => {
  const response = await axios.delete(`${API_BASE_URL}/${clientId}`);
  window.location.reload();
  return response.data;
};

export const createClient = async (inputValue, emailValue, phoneValue, coordenate_xValue, coordenate_yValue) => {
  const coordenate_xFloat = parseFloat(coordenate_xValue);
  const coordenate_yFloat = parseFloat(coordenate_yValue);

  if (isNaN(coordenate_xFloat) || isNaN(coordenate_yFloat)) {
    // Handle invalid coordinates here (e.g., show an error message)
    console.error("Invalid coordinates entered.");
    return;
  }

  const response = await axios.post(API_BASE_URL, {
    name: inputValue,
    email: emailValue,
    phone: phoneValue,
    coordenate_x: coordenate_xFloat,
    coordenate_y: coordenate_yFloat,
  });

  window.location.reload();
  return response.data;
};
