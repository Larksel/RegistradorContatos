import { useState } from "react";
import { PencilSimple, Trash } from "@phosphor-icons/react";

interface ContatosProps {
  contato: any;
  handleDelete: any;
  handleEdit: any;
}

export default function Contato(props: ContatosProps) {
  const { contato, handleDelete, handleEdit } = props;
  const [novoNome, setNovoNome] = useState(contato.contato);

  const handleChange = (e: any) => {
    e.preventDefault();
    setNovoNome(e.target.value);
  };

  return (
    <div className="bg-neutral-100 flex p-6 rounded-lg justify-between gap-6">
      <input
        type="text"
        value={novoNome}
        className="h-10 rounded-md px-4 text-xl outline-none w-full"
        onChange={handleChange}
      />
      <div className="flex items-center justify-center gap-2">
        <button
          className=""
          onClick={() => handleEdit(contato, novoNome)}
        >
          <PencilSimple size={28} color="#38bdf8" />
        </button>
        <button className="" onClick={() => handleDelete(contato.id)}>
          <Trash size={28} color="#ef4444" />
        </button>
      </div>
    </div>
  );
}
