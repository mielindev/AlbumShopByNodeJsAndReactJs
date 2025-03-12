import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

export const CartBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
  color: "white",
}));
