import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

const Table = ({ clients, handleWithEditButtonClick, deleteClient }) => {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);


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
      selector: (row) => (row.coordenate_x),
      sortable: true,
    },
    {
      name: "Coordenada Y",
      selector: (row) => (row.coordenate_y),
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

  function formatPhoneNumber(phoneNumber) {
    const cleaned = String(phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  }

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
          (String(row.coordenate_x).includes(filterValue)) || // Convert to string
          (String(row.coordenate_y).includes(filterValue))    // Convert to string
        );
      });
      setRecords(newData);
    }
  }
  return (
    <div className="container mt-5">
      <div className="text-end">
        <input
          className="inputSearch"
          type="text"
          id="filterInput"
          placeholder="Digite nome, email ou telefone para filtrar"
          onChange={handleFilter}
        />
      </div>
      <DataTable
        columns={columns}
        data={records}
        selectableRows
        fixedHeader
        pagination
      />
    </div>
  );
}

export default Table;