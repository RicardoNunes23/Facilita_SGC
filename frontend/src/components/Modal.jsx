import React from "react";
import Modal from "react-modal";

const RouteModal = ({ isOpen, onRequestClose, orderOfVisit, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal de exemplo"
      style={{
        overlay: {
          zIndex: 1000,
        },
        content: {
          padding: "20px",
          textAlign: "center",
        },
      }}
    >
      <button onClick={closeModal} className="cancelButton"> Fechar</button>
      <h2>Ordem de Visitação:</h2>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Coordenada X</th>
            <th>Coordenada Y</th>
          </tr>
        </thead>
        <tbody>
          {orderOfVisit.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.name}</td>
              <td>{cliente.email}</td>
              <td>{cliente.phone}</td>
              <td>{cliente.coordenate_x}</td>
              <td>{cliente.coordenate_y}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
};

export default RouteModal;
