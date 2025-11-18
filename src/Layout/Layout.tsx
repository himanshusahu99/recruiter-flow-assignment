import { Routes, Route, Navigate } from 'react-router-dom'
import Navigation from '../navigation/Navigation'
import TableView from '../pages/table-view/TableView'
import Form from '../pages/form/Form'

const Layout = () => {
  return (
  <div>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/form" replace />} />
          <Route path="/form" element={<Form />} />
          <Route path="/table-view" element={<TableView />} />
        </Routes>
      </main>
    </div>
  )
}

export default Layout