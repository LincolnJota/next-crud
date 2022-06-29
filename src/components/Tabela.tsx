import Usuario from "../core/Usuario";
import { IconeDeletar, IconeEditar } from "./Icones";

interface TabelaProps {
  usuarios?: Usuario[]
  usuarioSelecionado?: (usuario: Usuario) => void
  usuarioDeletado?: (usuario: Usuario) => void
}

export default function Tabela(props: TabelaProps) {

  const exibirAcoes = props.usuarioSelecionado || props.usuarioDeletado;

  function renderizarCabecalho() {
    return (
      <tr>
        <th className="text-left p-4">Código</th>
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Idade</th>
        {exibirAcoes ?
          <th className="text-center p-4">Ações</th>
          : false}
      </tr>
    )
  }

  function renderizarDados() {
    return props.usuarios?.map((usuario, i) => {
      return (
        <tr key={usuario.id}
          className={`${i % 2 === 0 ? 'bg-blue-100' : 'bg-blue-50'}`}
        >
          <td className="text-left p-4">{usuario.id}</td>
          <td className="text-left p-4">{usuario.nome}</td>
          <td className="text-left p-4">{usuario.idade}</td>
          {exibirAcoes ? renderizarAcoes(usuario) : false}
        </tr>
      )
    }
    )
  }

  function renderizarAcoes(usuario: Usuario) {
    return (
      <td className="flex justify-center">
        {props.usuarioSelecionado ? (
          <button onClick={() => props.usuarioSelecionado?.(usuario)}
            className={`
          flex justify-center items-center
          text-green-600 rounded-full p-2 m-1
          hover:bg-purple-50
          `}>
            {IconeEditar}
          </button>
        ) : false}

        {props.usuarioDeletado ? (
          <button onClick={() => props.usuarioDeletado?.(usuario)}
            className={`
          flex justify-center items-center
          text-red-500 rounded-full p-2 m-1
          hover:bg-purple-50
          `}>
            {IconeDeletar}
          </button>
        ) : false}

      </td>
    )
  }

  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead className={`
        bg-gradient-to-br from-[#019a9d] to-[#2252c2] text-white
        
      `}>
        {renderizarCabecalho()}
      </thead>
      <tbody>
        {renderizarDados()}
      </tbody>
    </table>
  )
}