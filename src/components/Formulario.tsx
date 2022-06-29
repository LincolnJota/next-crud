import { useState } from "react";
import Usuario from "../core/Usuario";
import Botao from "./Botao";
import Entrada from "./Entrada";

interface FormularioProps {
  usuario: Usuario;
  usuarioMudou: (usuario: Usuario) => void;
  CancelarClick?: () => void;
}

export default function Formulario(props: FormularioProps) {
  const id = props.usuario?.id ?? null;
  const [nome, setNome] = useState(props.usuario?.nome ?? '');
  const [idade, setIdade] = useState(props.usuario?.idade ?? 0);


  return (
    <div className={`
      flex flex-col p-5
      bg-gray-200 rounded-md
    `}>
      {id ? (
        <Entrada
          somenteLeitura
          texto="Codigo"
          valor={id}
          className="mb-4"
        />
      ) : false}
      <Entrada texto="Nome" valor={nome} valorMudou={setNome} className="mb-4" />
      <Entrada texto="Idade" valor={idade} tipo="number" valorMudou={setIdade} />
      <div className="flex justify-end mt-3">
        <Botao onClick={() => props.usuarioMudou?.(new Usuario(nome, +idade, id))} cor="blue" className="mr-2 to-slate-800">{id ? 'Alterar' : 'Salvar'}</Botao>
        <Botao onClick={props.CancelarClick}>Cancelar</Botao>
      </div>
    </div>

  )
}