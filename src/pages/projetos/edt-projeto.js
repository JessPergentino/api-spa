import React, { useState, useEffect } from 'react'
import t from 'prop-types'

import { TextField } from '@material-ui/core'

import { Modal, CampoData } from 'ui'

const ModalEdtProjeto = ({ abrir, handleFechar, projetoAtual }) => {
  const [projeto, setProjeto] = useState({})
  const [dataSelecionada, setDataSelecionada] = useState(null)

  useEffect(() => {
    setProjeto(projetoAtual)
    setDataSelecionada(projetoAtual.dataEntrega)
  }, [projetoAtual])

  const handleAlterarData = data => {
    setDataSelecionada(data)
    setProjeto(estadoAnterior => {
      return { ...estadoAnterior, dataEntrega: data }
    })
  }

  const AlterarProjeto = () => {
    console.log(dataSelecionada)
    handleFechar()
  }

  return (
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
      />

      <CampoData
        dataSelecionada={dataSelecionada}
        handleAlterarData={handleAlterarData}
      />
    </Modal>
  )
}

ModalEdtProjeto.propTypes = {
  abrir: t.bool,
  handleFechar: t.func,
  projetoAtual: t.object

}

export default ModalEdtProjeto