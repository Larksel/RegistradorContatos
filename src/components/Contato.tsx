import { useState } from "react";
import { PencilSimple, Trash } from "@phosphor-icons/react";

interface ContatosProps {
  contato: any;
  handleDelete: any;
  handleEdit: any;
}

export default function Contato(props: ContatosProps) {
  const { contato, handleDelete, handleEdit } = props;
  const [novoNome, setNovoNome] = useState(contato);

  const handleChange = (e: any) => {
    e.preventDefault();
    setNovoNome(e.target.value);
  };

  return (
    <div className="">
      <input
        type="text"
        value={contato === "" ? novoNome : contato}
        className="list"
        onChange={handleChange}
      />
      <div>
        <button
          className=""
          onClick={() => handleEdit(contato, novoNome)}
        >
          <PencilSimple id="i" />
        </button>
        <button className="" onClick={() => handleDelete(contato.id)}>
          <Trash id="i" />
        </button>
      </div>
    </div>
  );
}
