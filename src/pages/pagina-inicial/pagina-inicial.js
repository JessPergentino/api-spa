import React, { useContext } from 'react'
import styled from 'styled-components'
import {
  Divider as MaterialDivider,
  Grid,
  Paper,
  Typography
} from '@material-ui/core'
import Grafico from 'pages/pagina-inicial/graficos'

import { AuthContext } from 'contexts/auth'
import { ProjetoContext } from 'contexts/projetos'
import { RequisitoContext } from 'contexts/requisitos'

const PaginaInical = () => {
  const { userLogin } = useContext(AuthContext)
  const { projetos, projetoAtual, listarProjetos, buscarProjeto } = useContext(ProjetoContext)
  const { listarRequisitos } = useContext(RequisitoContext)
  const condicao = userLogin.user.projetos.length > 0 && projetos.length === 0

  if (condicao) {
    if (userLogin.user.projetos.length > 0 && projetos.length === 0) {
      if (userLogin.user.projetos.length > 0) {
        buscarProjeto(userLogin.user.projetos[0].id)
        listarRequisitos(userLogin.user.projetos[0].id)
      }
      listarProjetos(userLogin.user.id)
    }
  }

  return (
    <>
      <Grid container direction='column'>
        <Title variant='h3'>
          Bem vindo, {userLogin.primeiroNome}!
        </Title>

        {projetoAtual && (<Title variant='h4'>Este é o dashboard do {projetoAtual.nome}</Title>)}

        {!projetoAtual && (<Title variant='h4'> Cadastre um novo projeto para começar </Title>)}
      </Grid>

      {projetoAtual &&
        (
          <GraficosGrid>
            <Grid item xs>
              <PaperGrafico>
                <Grafico />

                <Divider />
                <Typography>Titulo do Gráfico</Typography>
              </PaperGrafico>
            </Grid>

            <Grid item xs>
              <PaperGrafico>
                <Grafico />

                <Divider />
                <Typography>Titulo do Gráfico</Typography>
              </PaperGrafico>
            </Grid>
          </GraficosGrid>
        )}
    </>
  )
}

const Title = styled(Typography).attrs({
  gutterBottom: true,
  align: 'center'
})`
`

const GraficosGrid = styled(Grid).attrs({
  container: true,
  spacing: 5
})`
padding: 20px;
`

const PaperGrafico = styled(Paper)`
align-items: center;
display: flex;
flex-direction: column;
min-width: 250px;
padding: 20px 0;
`

const Divider = styled(MaterialDivider)`
margin: 20px 0;
width: 100%;
`

export default PaginaInical
