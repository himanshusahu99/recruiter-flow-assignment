import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="nav">
      <Link to="/form">Add a Box</Link>
      <Link to="/table-view">List View</Link>
    </nav>
  )
}

export default Navigation