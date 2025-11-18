import React from 'react'

export type Column<T> = {
  key: string
  displayName: string
  render?: (row: T) => React.ReactNode
  align?: 'left' | 'right' | 'center'
}

function Table<T>({ columns, data }: { columns: Column<T>[]; data: T[] }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>
              {col.displayName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={(row as any).id ?? `row-${rowIndex}`}>
            {columns.map((col) => (
              <td key={`${(row as any).id ?? rowIndex}-${col.key}`}>
                {col.render ? col.render(row) : (row as any)[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
