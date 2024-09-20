import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./Firebase";
import Contato from "./components/Contato";
import CriarContato from "./components/CriarContato";

export default function App() {
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "contacts"));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let contatosArray: any = [];

      querySnapshot.forEach((doc) => {
        contatosArray.push({ ...doc.data(), id: doc.id });
      });

      setContatos(contatosArray);
    });

    return () => unsub();
  }, []);

  const handleEdit = async (contato: any, novoNome: any) => {
    await updateDoc(doc(db, "contacts", contato.id), { contato: novoNome });
  };

  const handleDelete = async (id: any) => {
    await deleteDoc(doc(db, "contacts", id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center w-full h-24 bg-neutral-500">
        <h1 className="text-4xl text-center text-white bg-neutral-600 p-6 rounded-2xl">
          Registrador de Contatos
        </h1>
      </div>
      <CriarContato />
      {contatos.map((contato, index) => (
        <Contato
          contato={contato}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          key={index}
        />
      ))}
    </div>
  );
}
