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
    <div className="bg-neutral-200 p-4 rounded-lg my-6 w-full">
      <form onSubmit={handleSubmit} className="w-full h-full flex flex-col items-center justify-center gap-4">
        <input
          className="h-10 rounded-md px-4 text-xl outline-none w-full"
          type="text"
          placeholder="Nome do novo contato"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
        />
        <button className="w-full h-10 bg-[#38bdf8] rounded-lg">Criar Contato</button>
      </form>
    </div>
  );
}
