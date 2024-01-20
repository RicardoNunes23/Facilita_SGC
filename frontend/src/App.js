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

  const fetchClients = () => {
    getClients()
      .then((data) => setClients(data))
      .catch(handleError);
  };

  const handleWithEditButtonClick = (client) => {
    setSelectedClient(client);
    setInputVisibility(true);
  };

  const handleWithNewButton = () => {
    setInputVisibility(!inputVisibility);
  };

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
      fetchClients(); // Reuse the fetchClients function
      resetForm();
    } catch (error) {
      handleError(error);
    }
  };

  const deleteClientHandler = async (client) => {
    try {
      await deleteClient(client.id);
      fetchClients(); // Reuse the fetchClients function
    } catch (error) {
      handleError(error);
    }
  };

  const createClientHandler = async () => {
    try {
      await createClient(
        inputValue,
        emailValue,
        phoneValue,
        coordenate_xValue,
        coordenate_yValue
      );
      fetchClients(); // Reuse the fetchClients function
      setInputVisibility(!inputVisibility);
      resetForm();
    } catch (error) {
      handleError(error);
    }
  };

  const resetForm = () => {
    setInputValue("");
    setEmailValue("");
    setPhoneValue("");
    setCoordenate_xValue("");
    setCoordenate_yValue("");
  };

  const handleError = (error) => {
    console.error("Error occurred:", error);
    setError("An error occurred. Please try again.");
  };

  return (
    <div className="App">
      <header className="container">
        <MenuBar />
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
