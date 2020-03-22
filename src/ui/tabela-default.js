import React from 'react'
import t from 'prop-types'
import MaterialTable from 'material-table'

const TabelaDefault = ({ titulo, columns, data, actions, search = true }) => {
  return (
    <MaterialTable
      title={titulo}
      columns={columns}
      data={data}
      options={{
        actionsColumnIndex: -1,
        search: search
      }}
      actions={actions}
    />
  )
}

TabelaDefault.propTypes = {
  columns: t.array.isRequired,
  data: t.array.isRequired,
  titulo: t.string.isRequired,
  actions: t.array,
  search: t.bool
}

export default TabelaDefault
