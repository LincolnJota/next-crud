import { useEffect, useState } from 'react';
import Botao from '../components/Botao';
import Formulario from '../components/Formulario';
import Layout from '../components/Layout';
import Tabela from '../components/Tabela';
import Usuario from '../core/Usuario';
import useUsuarios from '../hooks/useUsuarios';
import Loading from '../components/Loading';
import { IconeRecarregar } from '../components/Icones';


type Props = {
  result: Usuario[];
}

export default function Home(props: Props) {

  const {
    usuario,
    usuarios,
    novoUsuario,
    tabelaVisivel,
    exibirTabela,
    salvarUsuario,
    excluirUsuario,
    editarUsuario,
    carregandoOperacao,
    obterTodos,
    setOperacaoCarregando,
  } = useUsuarios();

  return (
    <>
      <Loading isLoading={carregandoOperacao}>
        <div className={`
      flex h-screen w-screen justify-center items-center
     text-white bg-[#151515]
    `}>
          <Layout titulo='Cadastro Simples'>
            {tabelaVisivel ? (
              <>
                <div className="flex justify-end">
                  <Botao onClick={async () => {
                    setOperacaoCarregando(true);
                    await obterTodos();
                  }} cor='blue' className="mb-4 mr-2 group hover:bg-gradient-to-tr"><div className='group-hover:rotate-180 transition-transform duration-500'>{IconeRecarregar}</div></Botao>
                  <Botao onClick={novoUsuario} cor='green' className="mb-4 hover:bg-gradient-to-tr">Novo Usuario</Botao>
                </div>
                <Tabela usuarios={usuarios} usuarioSelecionado={editarUsuario}
                  usuarioDeletado={excluirUsuario}></Tabela>
              </>
            ) : (

              <Formulario
                usuarioMudou={salvarUsuario}
                usuario={usuario}
                CancelarClick={() => exibirTabela()}
              />

            )}
          </Layout>
        </div>
      </Loading>
    </>
  )
}