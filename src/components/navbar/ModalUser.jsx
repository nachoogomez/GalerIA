import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AvatarIcon from "../ui/AvatarIcon";

import { useDispatch, useSelector } from "react-redux";
import { clearCurrentUser } from "../../redux/user/userSlice";
import { jwtDecode } from "jwt-decode";

const ModalUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearCurrentUser());
    navigate("/login");
  }; 
  
  const token = useSelector((state) => state.user.currentUser.access_token);

  const decodedToken = jwtDecode(token);
 
  const role = decodedToken.role; 
  
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {role === "SUPER" ? 
          <DropdownMenuItem>
            <Link to="/dashboard">Dashboard</Link>
          </DropdownMenuItem> : null
        }
        <DropdownMenuItem>
          <Button onClick={handleLogout}>Log Out</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModalUser;