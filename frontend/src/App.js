import React, { useEffect, useState } from "react";
import "./App.css";
import NewClientForm from "./components/NewClientForm";
import Table from "./components/Table";
import MenuBar from "./components/MenuBar";
import {
  getClients,
  editClient,
  deleteClient,
  createClient,
} from "./services/clientService";

const App = () => {
  const [clients, setClients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [coordenate_xValue, setCoordenate_xValue] = useState("");
  const [coordenate_yValue, setCoordenate_yValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectedClient, setSelectedClient] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  // Função para obter a lista de clientes
  const fetchClients = () => {
    getClients()
      .then((data) => setClients(data))
      .catch(handleError);
  };

  // Função para lidar com o clique no botão de edição de cliente
  const handleWithEditButtonClick = (client) => {
    setSelectedClient(client);
    setInputVisibility(true);
  };

  // Função para lidar com o clique no botão de novo cliente
  const handleWithNewButton = () => {
    setInputVisibility(!inputVisibility);
  };

  // Função para editar um cliente existente
  const editClientHandler = async () => {
    try {
      await editClient(
        selectedClient,
        inputValue,
        emailValue,
        phoneValue,
        coordenate_xValue,
        coordenate_yValue
      );
      setSelectedClient();
      setInputVisibility(false);
      fetchClients(); // Reutiliza a função fetchClients para atualizar a lista de clientes
      resetForm();
    } catch (error) {
      handleError(error);
    }
  };

  // Função para lidar com a exclusão de um cliente
  const deleteClientHandler = async (client) => {
    try {
      await deleteClient(client.id);
      fetchClients(); // Reutiliza a função fetchClients para atualizar a lista de clientes
    } catch (error) {
      handleError(error);
    }
  };

  // Função para criar um novo cliente
  const createClientHandler = async () => {
    try {
      await createClient(
        inputValue,
        emailValue,
        phoneValue,
        coordenate_xValue,
        coordenate_yValue
      );
      fetchClients(); // Reutiliza a função fetchClients para atualizar a lista de clientes
      setInputVisibility(!inputVisibility);
      resetForm();
    } catch (error) {
      handleError(error);
    }
  };

  // Função para resetar o formulário após a conclusão de uma operação
  const resetForm = () => {
    setInputValue("");
    setEmailValue("");
    setPhoneValue("");
    setCoordenate_xValue("");
    setCoordenate_yValue("");
  };

  // Função para lidar com erros durante as operações
  const handleError = (error) => {
    console.error("Error occurred:", error);
    setError("An error occurred. Please try again.");
  };

  return (
    <div className="App">
      <header className="container">
        <MenuBar />
        {/* Componente para adicionar ou editar clientes */}
        <NewClientForm
          inputVisibility={inputVisibility}
          inputValue={inputValue}
          emailValue={emailValue}
          phoneValue={phoneValue}
          coordenate_xValue={coordenate_xValue}
          coordenate_yValue={coordenate_yValue}
          setInputValue={setInputValue}
          setEmailValue={setEmailValue}
          setPhoneValue={setPhoneValue}
          setCoordenate_xValue={setCoordenate_xValue}
          setCoordenate_yValue={setCoordenate_yValue}
          selectedClient={selectedClient}
          editClient={editClientHandler}
          createClient={createClientHandler}
          handleWithNewButton={handleWithNewButton}
        />
        {/* Componente para exibir a tabela de clientes */}
        <Table
          clients={clients}
          handleWithEditButtonClick={handleWithEditButtonClick}
          deleteClient={deleteClientHandler}
        />
      </header>
    </div>
  );
};

export default App;
