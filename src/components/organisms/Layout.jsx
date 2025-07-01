import { Outlet } from 'react-router-dom'
import TopToolbar from '@/components/organisms/TopToolbar'
import Sidebar from '@/components/organisms/Sidebar'

const Layout = () => {
  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top Toolbar */}
      <TopToolbar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 relative overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout