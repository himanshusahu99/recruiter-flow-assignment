import useBoxes from './useFormTable'
import Table from '../../components/Table'
import type { Column } from '../../components/Table'

const TableView = () => {
  const { items, loading, error, calculateCost } = useBoxes()

  const columns: Column<any>[] = [
    { key: 'receiverName', displayName: 'Receiver name' },
    { key: 'weight', displayName: 'Weight (kg)' },
    {
      key: 'boxColour',
      displayName: 'Box colour',
      render: (box: any) => (
        <div className="color-cell">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
            <rect width="24" height="24" fill={`rgb${box.boxColour}`} stroke="#000" />
          </svg>
          <div>{box.boxColour}</div>
        </div>
      ),
    },
    { key: 'destination', displayName: 'Destination' },
    {
      key: 'cost',
      displayName: 'Shipping cost (INR)',
      render: (box: any) => `INR ${calculateCost(box).toFixed(2)}`,
      align: 'right',
    },
  ]

  return (
    <div>
      <h2>Shipping Boxes - List</h2>

      {loading && <div>Loading...</div>}
      {error && <div className="form-error">{error}</div>}

      {items.length ?   <Table columns={columns} data={items} /> : 'NO Records Found'}
    </div>
  )
}

export default TableView