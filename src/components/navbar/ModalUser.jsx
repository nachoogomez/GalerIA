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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth0 } from "@auth0/auth0-react";


const ModalUser = () => {

  const {logout} = useAuth0()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AccountCircleIcon sx={{ color: 'white' }}/>
      </DropdownMenuTrigger>
     <DropdownMenuContent className="mr-8">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
         <DropdownMenuSeparator />
        { /*role === "SUPER" ?  
          <DropdownMenuItem>
            <Link to="/dashboard">Dashboard</Link>
          </DropdownMenuItem> : null
       */ } 
        <DropdownMenuItem>
          <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} >Log Out</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModalUser;