import useBoxForm from './useForm'

const Form = () => {
  const { form, setField, error, status, handleSubmit, } = useBoxForm()

  return (
    <div>
      <h2>Shipping Box - Add</h2>
      <form onSubmit={handleSubmit} className="form-root">
        <div>
          <label>Receiver name</label>
          <div>
            <input
              value={form.receiverName}
              onChange={(event) => setField('receiverName', event.target.value)}
              placeholder="Receiver name"
            />
          </div>
        </div>

        <div>
          <label>Weight (kg)</label>
          <div>
            <input
              type="number"
              value={form.weight}
              onChange={(event) => {
                const val = event.target.value
                const n = val === '' ? '' : Number(val)
                setField('weight', n)
              }}
              min={0}
              step="1"
            />
          </div>
        </div>

        <div>
          <label>Box colour</label>
          <div>
            <input
              type="color"
              value={form.colour}
              onChange={(event) => setField('colour', event.target.value)}
            />
          </div>
        </div>

        <div>
          <label>Destination Country</label>
          <div>
            <select value={form.destination} onChange={(event) => setField('destination', event.target.value)}>
              <option value="Sweden">Sweden</option>
              <option value="China">China</option>
              <option value="Brazil">Brazil</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
        </div>

        <div >
          <button type="submit">Save</button>
        </div>
      </form>

      {error && <div className="form-error">{error}</div>}
      {status && <div className="form-status">{status}</div>}
    </div>
  )
}

export default Form