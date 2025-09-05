import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const ModalUser = () => {

  const { logout, user, isAuthenticated, isLoading } = useAuth0();


  if (isLoading) {
    return <div>Cargando...</div>;
  }

  // Define tu namespace
  const namespace = `${import.meta.env.VITE_AUTH0_NAMESPACE}`;
  const userRoles = user?.[`${namespace}/roles`] || [];

  
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-8 min-w-[220px] py-4 px-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {
            userRoles.includes('ADMIN') ? 
            <DropdownMenuItem>
              <Link to="/dashboard">Dashboard</Link>
            </DropdownMenuItem> : null
          } 
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem className="p-0">
          <Button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className="w-full flex justify-start items-center px-3 py-2 text-left"
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModalUser;