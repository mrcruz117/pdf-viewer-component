import React, { useContext } from "react";
import {
  Toolbar,
  Box,
  Typography,
  CssBaseline,
  AppBar,
  IconButton,
  Button,
} from "@mui/material";
import { ApiContext } from "../contexts/ApiContext";

const navItems = ["Ingest Pdf", "Chat"];

function NavBar() {
  const { loading, dispatch, setCurrentPage } = useContext(ApiContext);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Technical Records
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                onClick={() => handlePageChange(item)}
                key={item}
                sx={{ color: "#fff" }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default NavBar;
