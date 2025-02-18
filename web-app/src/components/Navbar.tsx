import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { LogOut, User } from "lucide-react"

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-black text-white border-b border-gray-700">
      {/* 🔍 Search Bar (Left) */}
      <div className="w-1/3">
        <Input placeholder="Search..." className="w-full rounded-md border-gray-500 text-white" />
      </div>

      {/* 👤 User Profile (Right) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 text-gray-800">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatar || "/default-avatar.png"} alt="User Avatar" />
              <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-gray-900 text-white border-gray-700">
          <DropdownMenuItem onClick={() => navigate("/profile")} className="hover:bg-gray-800">
            <User className="w-4 h-4 mr-2" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout} className="text-red-500 hover:bg-gray-800">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
