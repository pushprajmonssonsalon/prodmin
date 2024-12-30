import * as React from "react";
import Popover from "@mui/material/Popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { crmLinks } from "../../services/utils/roles";

export default function CustomPopover() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    
    const path = pathname.split("/")[1];
    if (crmLinks.includes(path)) {
      localStorage.removeItem("crmtoken");
      localStorage.removeItem("role");

    } else {
      localStorage.removeItem("protoken");
      localStorage.removeItem("prorole");
      localStorage.removeItem("isAdmin");

    }

    navigate("/login");
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <BsThreeDotsVertical
        size={20}
        onClick={handleClick}
        className="cursor-pointer"
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Button onClick={handleLogout} sx={{ p: 2 }}>
          Logout
        </Button>
      </Popover>
    </div>
  );
}
