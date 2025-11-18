import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav style={{ padding: 12 }}>
      <Link to="/form" style={{ marginRight: 12 }}>Form</Link>
      <Link to="/table-view">List View</Link>
    </nav>
  )
}

export default Navigation