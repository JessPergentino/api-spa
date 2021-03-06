import React, { useState, useEffect, useContext } from 'react'
import t from 'prop-types'

import { TextField } from '@material-ui/core'

import { Modal, CampoData, SnackBar } from 'ui'

import api from 'services/api'
import { ProjetoContext } from 'contexts/projetos'
import { AuthContext } from 'contexts/auth'

const ModalEdtProjeto = ({ abrir, handleFechar, projetoAtual }) => {
  const [projeto, setProjeto] = useState({})
  const [dataSelecionada, setDataSelecionada] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const { listarProjetos } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)

  useEffect(() => {
    setProjeto(projetoAtual)
    setDataSelecionada(projetoAtual.dataEntrega)
  }, [projetoAtual])

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const handleAlterarData = data => {
    setDataSelecionada(data)
    setProjeto(estadoAnterior => {
      return { ...estadoAnterior, dataEntrega: data }
    })
  }

  const AlterarProjeto = (e) => {
    e.preventDefault()
    api.put(`/projetos/${projeto.id}`, projeto)
      .then((response) => {
        listarProjetos(userLogin.user.id)
        setOpenSnackbar(true)
      })
    handleFechar()
  }

  return (
    <>
      <Modal titulo='Editar Projeto' open={abrir} handleClose={handleFechar} handleSave={AlterarProjeto} operacao='Alterar'>
        <TextField
          onChange={(e) => {
            const val = e.target.value
            setProjeto(prevState => {
              return { ...prevState, nome: val }
            })
          }}
          value={projeto.nome}
          autoFocus
          id='nome'
          label='Nome'
          type='text'
          width='100%'
          margin='normal'
          fullWidth
          required
        />

        <TextField
          onChange={(e) => {
            const val = e.target.value
            setProjeto(prevState => {
              return { ...prevState, descricao: val }
            })
          }}
          value={projeto.descricao}
          id='descricao'
          label='Descrição'
          type='text'
          multiline
          rows='4'
          width='100%'
          margin='normal'
          fullWidth
          required
        />

        <CampoData
          dataSelecionada={dataSelecionada}
          handleAlterarData={handleAlterarData}
        />
      </Modal>

      <SnackBar
        openSnackbar={openSnackbar}
        duracao={4000}
        handleClose={handleCloseSnackbar}
        tipo='success'
        mensagem='Projeto Alterado com Sucesso!'
      />
    </>
  )
}

ModalEdtProjeto.propTypes = {
  abrir: t.bool,
  handleFechar: t.func,
  projetoAtual: t.object

}

export default ModalEdtProjeto
