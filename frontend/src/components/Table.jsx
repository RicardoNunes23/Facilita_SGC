import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Modal from 'react-modal';

const Table = ({ clients, handleWithEditButtonClick, deleteClient }) => {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderOfVisit, setOrderOfVisit] = useState([]);

  // Função para otimizar a rota ao clicar no botão "Rota"
  const handleOptimizeRoute = async () => {
    try {
      const response = await axios.post('http://localhost:3333/clients/rota-otimizada', {
        clientesIds: records.map(client => client.id),
      });
      setOrderOfVisit(response.data);
      openModal();
    } catch (error) {
      console.error('Erro ao calcular a rota otimizada:', error);
    }
  };

  // Efeito para carregar dados iniciais da tabela
  useEffect(() => {
    const fetchDataFromDatabase = async () => {
      try {
        const response = await axios.get("http://localhost:3333/clients");
        const data = response.data;
        setRecords(data);
        setOriginalRecords(data);
      } catch (error) {
        console.error("Erro ao obter dados do banco:", error);
      }
    };

    fetchDataFromDatabase();
  }, []);

  // Definição das colunas da tabela
  const columns = [
    {
      name: "Nome",
      selector: (row) => row.name.toUpperCase(),
      sortable: true,
    },
    {
      name: "Email",
      sortable: true,
      selector: (row) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(row.email) ? row.email : "Email inválido";
      },
    },
    {
      name: "Telefone",
      selector: (row) => formatPhoneNumber(row.phone),
      sortable: true,
    },
    {
      name: "Coordenada X",
      selector: (row) => row.coordenate_x,
      sortable: true,
    },
    {
      name: "Coordenada Y",
      selector: (row) => row.coordenate_y,
      sortable: true,
    },
    {
      name: "Ações",
      cell: (row) => (
        <div>
          <button onClick={() => handleWithEditButtonClick(row)}>
            <AiOutlineEdit size={20} color={"#5dc700"}></AiOutlineEdit>
          </button>
          <button onClick={() => deleteClient(row)}>
            <AiOutlineDelete size={20} color={"#f53"}></AiOutlineDelete>
          </button>
        </div>
      ),
    },
  ];

  // Função para formatar o número de telefone
  function formatPhoneNumber(phoneNumber) {
    const cleaned = String(phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  }

  // Função para filtrar os dados da tabela
  function handleFilter(event) {
    const filterValue = event.target.value.toLowerCase();
    if (filterValue === "") {
      setRecords(originalRecords);
    } else {
      const newData = originalRecords.filter((row) => {
        return (
          (row.name && row.name.toLowerCase().includes(filterValue)) ||
          (row.email && row.email.toLowerCase().includes(filterValue)) ||
          (row.phone && row.phone.toLowerCase().includes(filterValue)) ||
          (String(row.coordenate_x).includes(filterValue)) ||
          (String(row.coordenate_y).includes(filterValue))
        );
      });
      setRecords(newData);
    }
  }

  // Função para abrir o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mt-5">
      <div className="text-end">
        {/* Botão de teste para otimizar rota */}
        <button onClick={() => { openModal(); handleOptimizeRoute(); }} className="newClientButton">Rota</button>

        {/* Campo de busca */}
        <input
          className="inputSearch"
          type="text"
          id="filterInput"
          placeholder="Digite nome, email ou telefone para filtrar"
          onChange={handleFilter}
        />
      </div>

      {/* Tabela de dados */}
      {!isModalOpen && (
        <DataTable
          columns={columns}
          data={records}
          selectableRows
          fixedHeader
          pagination
        />
      )}

      {/* Modal para exibir a ordem de visita otimizada */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modal de exemplo"
        style={{
          overlay: {
            zIndex: 1000,
          },
          content: {
            padding: '20px',
            textAlign: 'center',
          },
        }}
      >
        <button onClick={closeModal}>Fechar</button>
        <h2>Ordem de Visitação:</h2>
        <table style={{ width: '100%' }}>
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
            {/* Renderização da ordem de visita otimizada */}
            {orderOfVisit.map(cliente => {
              return (
                <tr key={cliente.id}>
                  <td>{cliente.name}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.phone}</td>
                  <td>{cliente.coordenate_x}</td>
                  <td>{cliente.coordenate_y}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default Table;
