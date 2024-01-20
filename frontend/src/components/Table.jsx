import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import RouterModal from "./Modal";

const Table = ({ handleWithEditButtonClick, deleteClient }) => {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderOfVisit, setOrderOfVisit] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showPopup, setShowPopup] = useState(true);

  // Função para otimizar a rota ao clicar no botão "Rota"
  const handleOptimizeRoute = async () => {
    try {
      const response = await axios.post('http://localhost:3333/clients/rota-otimizada', {
        clientesIds: selectedRows,
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

    // Mostra o popup inicial
    setTimeout(() => {
      setShowPopup(false);
    }, 10000);
  }, []);

  // Função para formatar o número de telefone
  function formatPhoneNumber(phoneNumber) {
    const cleaned = String(phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  }

  // Função para abrir o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Função para exibir informações dos clientes selecionados
  const showSelectedClientsInfo = () => {
    const selectedClientsData = records.filter(client => selectedRows.includes(client.id));
    setOrderOfVisit(selectedClientsData);
    openModal();
  };

  // Função para filtrar os dados da tabela
  const handleFilter = (event) => {
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
  };

  // Configuração das colunas da tabela
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

  return (
    <div className="container mt-5">
      {/* Popup inicial */}
      <div className="text-end">
        {/* Botão de teste para otimizar rota */}
        <button onClick={() => { handleOptimizeRoute(); showSelectedClientsInfo(); }} className="newClientButton"> Rota
          {showPopup && (
            <div className="popup">
              Selecione os clientes
            </div>
          )}
        </button>
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
          onSelectedRowsChange={({ selectedRows }) =>
            setSelectedRows(selectedRows.map((row) => row.id))
          }
          fixedHeader
          pagination
        />
      )}
      {/* Modal para exibir a ordem de visita otimizada */}
      <RouterModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        orderOfVisit={orderOfVisit}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Table;
