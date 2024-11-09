import { Outlet } from "react-router-dom"
import { NavBar } from "../components/headers/NavBar"
import { Footer } from "../components/footers/Footer"

export const MainLayout = () => {
  return (
    <main className="dark:bg-black overflow-hidden">
      {/* <nav>Navbar</nav> */}
      <NavBar />
      <Outlet />
      <Footer />
      {/* <footer>Footer</footer> */}
    </main>
  )
}
