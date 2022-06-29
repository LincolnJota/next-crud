import {
  useCreateUsuarioMutation,
  useDeleteUsuarioMutation,
  useGetUsuariosLazyQuery,
  usePublicarUsuarioMutation,
  useUpdateUsuarioMutation
} from "../graphql/generated";

import useTabelaOuForm from "./useTabelaOuForm";
import { useEffect, useState } from "react";
import Usuario from "../core/Usuario";

export default function useUsuarios() {

  const [usuario, setUsuario] = useState<Usuario>(Usuario.vazio());
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const { tabelaVisivel, exibirTabela, exibirForm, formularioVisivel } = useTabelaOuForm();
  const [carregandoOperacao, setOperacaoCarregando] = useState<boolean>(false);

  // Consultas e mutations
  const [getUsuarios, { data: dataGetUsuarios }] = useGetUsuariosLazyQuery({ fetchPolicy: 'no-cache' });
  const [mutAddUsuario, { data: dataCreateUsuario }] = useCreateUsuarioMutation();
  const [mutExcluirUsuario, { data: dataExcluirUsuario }] = useDeleteUsuarioMutation();
  const [mutAtualizarUsuario, { data: dataAtualizarUsuario }] = useUpdateUsuarioMutation();
  const [mutPublicarUsuario, { data: dataPublicarUsuario }] = usePublicarUsuarioMutation();

  useEffect(() => {
    obterTodos();
  }, []);

  async function obterTodos() {
    const { data: result } = await getUsuarios();
    const userConvert = result?.usuarios!.map(usuario => new Usuario(usuario.nome, usuario.idade, usuario.id));
    setUsuarios(userConvert!);
    setOperacaoCarregando(false);

    exibirTabela();
  }

  function editarUsuario(usuario: Usuario) {
    setUsuario(usuario);
    exibirForm();
    console.log(`Editando: ${usuario.nome}`);
  }

  async function excluirUsuario(usuario: Usuario) {
    setOperacaoCarregando(true);
    await mutExcluirUsuario({ variables: { id: usuario.id! } });
    console.log(`Excluiu: ${usuario.nome}`);
    obterTodos();
  }

  async function salvarUsuario(usuario: Usuario) {
    setOperacaoCarregando(true);
    if (usuario.id) {
      console.log(`Atualizando: ${usuario.nome}`);
      await mutAtualizarUsuario({ variables: { id: usuario.id!, toUpdate: { nome: usuario.nome, idade: usuario.idade } } });
      await mutPublicarUsuario({ variables: { id: usuario.id! } });
    } else {
      const result = await mutAddUsuario({ variables: { nome: usuario.nome, idade: usuario.idade } });
      await mutPublicarUsuario({ variables: { id: result.data?.createUsuario?.id ?? '0' } });
      console.log(`Criando: ${usuario.nome}`);
    }
    obterTodos();
    console.log(`Salvou: ${usuario.nome}`);
  }

  function novoUsuario() {
    setUsuario(Usuario.vazio())
    exibirForm();
  }

  return {
    usuario,
    usuarios,
    obterTodos,
    novoUsuario,
    exibirTabela,
    tabelaVisivel,
    salvarUsuario,
    excluirUsuario,
    editarUsuario,
    carregandoOperacao,
    setOperacaoCarregando,
  }
}