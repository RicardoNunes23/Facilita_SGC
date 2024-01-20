import React, { useEffect, useState } from "react";

const NewClientForm = ({
  inputVisibility,
  inputValue,
  emailValue,
  phoneValue,
  coordenate_xValue,
  coordenate_yValue,

  setInputValue,
  setEmailValue,
  setPhoneValue,
  setCoordenate_xValue,
  setCoordenate_yValue,

  selectedClient,
  editClient,
  createClient,
  handleWithNewButton,
  cancelForm,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Atualiza os campos do formulário quando um cliente é selecionado
  useEffect(() => {
    if (selectedClient) {
      setInputValue(selectedClient.name || "");
      setEmailValue(selectedClient.email || "");
      setPhoneValue(selectedClient.phone || "");
      setCoordenate_xValue(selectedClient.coordenate_x || "");
      setCoordenate_yValue(selectedClient.coordenate_y || "");
      setIsEditing(true); // Define o modo de edição como verdadeiro
    } else {
      setIsEditing(false); // Se não houver cliente selecionado, desativa o modo de edição
    }
  }, [selectedClient]);

  const handleCancel = () => {
    // Limpar os campos e esconder o formulário
    setInputValue("");
    setEmailValue("");
    setPhoneValue("");
    setCoordenate_xValue("");
    setCoordenate_yValue("");


    setIsEditing(false); // Desativa o modo de edição
    handleWithNewButton(); // Esconder o formulário
    if (typeof cancelForm === "function") {
      cancelForm(); // Executar a lógica específica de cancelamento, se for uma função
      console.log("Formulário cancelado");
    } else {
      console.error("cancelForm não é uma função");
    }
  };

  const handleSave = () => {
    // Verifica se algum dos campos está vazio
    if (!inputValue || !emailValue || !phoneValue || !coordenate_xValue || !coordenate_yValue) {
      console.error("Por favor, preencha todos os campos antes de salvar.");
      return;
    }
  
    // Chama a função apropriada com base no modo de edição
    if (isEditing) {
      editClient();
    } else {
      createClient();
    }
  };

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <input
          value={inputValue}
          style={{ display: inputVisibility ? "flex" : "none" }}
          onChange={(event) => setInputValue(event.target.value)}
          className="inputName"
          placeholder="Nome"
        />
        <input
          value={emailValue}
          style={{ display: inputVisibility ? "flex" : "none" }}
          onChange={(event) => setEmailValue(event.target.value)}
          className="inputEmail"
          placeholder="Email"
        />
        <input
          value={phoneValue}
          style={{ display: inputVisibility ? "flex" : "none" }}
          onChange={(event) => setPhoneValue(event.target.value)}
          className="inputPhone"
          placeholder="Telefone"
        />
        <input
          value={coordenate_xValue}
          style={{ display: inputVisibility ? "flex" : "none" }}
          onChange={(event) => setCoordenate_xValue(event.target.value)}
          className="inputCoordenate_x"
          placeholder="Coordenada X"
        />
        <input
          value={coordenate_yValue}
          style={{ display: inputVisibility ? "flex" : "none" }}
          onChange={(event) => setCoordenate_yValue(event.target.value)}
          className="inputCoordenate_y"
          placeholder="Coordenada Y"
        />
       <button
        onClick={inputVisibility ? handleSave : handleWithNewButton}
        className="newClientButton"
      >
        {inputVisibility ? (isEditing ? "Salvar" : "Cadastrar") : "+ Adicionar Cliente"}
      </button>
      <button
        onClick={handleCancel}
        className={inputVisibility ? "cancelButton" : ""}
      >
        {inputVisibility ? "Cancelar" : ""}
      </button>
      </div>
    </>
  );
};

export default NewClientForm;
