import { useState } from "react";
import { db } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CriarContato() {
  const [contato, setContato] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (contato !== "") {
      await addDoc(collection(db, "contacts"), {
        contato,
      });
      setContato("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <input
            type="text"
            placeholder="Nome do novo contato"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
          />
        </div>
        <div className="">
          <button>Criar Contato</button>
        </div>
      </form>
    </div>
  );
}
