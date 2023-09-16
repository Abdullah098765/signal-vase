import Navbar from "./components/navbar.js";
import { MyContextProvider } from "./context/context.js";
import { useMyContext } from "./context/context";
import   Sidebar  from './components/sidebar.js'
import { SidebarContextProvider } from "./context/sidebar-context.js";

export default function Home() {
  return (
    <div>
      
      <SidebarContextProvider>
      <MyContextProvider>
        <Navbar />
        <Sidebar />
      </MyContextProvider>
      </SidebarContextProvider>
    </div>
  );
}
