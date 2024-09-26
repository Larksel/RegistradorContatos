import { useEffect, useState } from 'react';
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './Firebase';
import Contato from './components/Contato';
import CriarContato from './components/CriarContato';

export default function App() {
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'contacts'));

    const unsub = onSnapshot(q, (querySnapshot) => {
      const contatosArray: any = [];

      querySnapshot.forEach((doc) => {
        contatosArray.push({ ...doc.data(), id: doc.id });
      });

      setContatos(() => contatosArray);
    });

    return () => unsub();
  }, []);

  const handleEdit = async (contato: any, novoNome: any) => {
    await updateDoc(doc(db, 'contacts', contato.id), { contato: novoNome });
  };

  const handleDelete = async (id: any) => {
    await deleteDoc(doc(db, 'contacts', id));
  };

  return (
    <div className='flex min-h-screen flex-col items-center'>
      <div className='flex h-24 w-full items-center justify-center bg-neutral-500'>
        <h1 className='rounded-2xl bg-neutral-600 p-6 text-center text-4xl text-white'>
          Registrador de Contatos
        </h1>
      </div>
      <div className='flex flex-col items-center justify-center w-[600px]'>
        <CriarContato />
        <div className='flex flex-col gap-6 w-full'>
          {contatos.map((contato, index) => (
            <Contato
              contato={contato}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
