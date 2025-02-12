import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/auth/auth.provider"

function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

export default App;
