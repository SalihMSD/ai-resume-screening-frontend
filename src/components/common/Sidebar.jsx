import {
  Dashboard,
  People,
  Work,
  UploadFile,
  Assessment,
} from "@mui/icons-material";

import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";

const drawerWidth = 260;

const menus = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/",
  },
  {
    text: "Candidates",
    icon: <People />,
    path: "/candidates",
  },
  {
    text: "Jobs",
    icon: <Work />,
    path: "/jobs",
  },
  {
    text: "Upload Resume",
    icon: <UploadFile />,
    path: "/upload",
  },
  {
    text: "ATS Results",
    icon: <Assessment />,
    path: "/ats",
  },
];

export default function Sidebar() {

  const location = useLocation();

  return (

    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,

        flexShrink: 0,

        "& .MuiDrawer-paper": {

          width: drawerWidth,

          boxSizing: "border-box",

          background: "#0F172A",

          color: "#fff",

          borderRight: "none",

        },

      }}
    >

      <Toolbar>

        <Box>

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            🤖 AI Resume
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#94A3B8",
            }}
          >
            Screening System
          </Typography>

        </Box>

      </Toolbar>

      <Divider
        sx={{
          borderColor: "#334155",
        }}
      />

      <List
        sx={{
          mt: 2,
        }}
      >

        {menus.map((menu) => (

          <ListItem
            key={menu.text}
            disablePadding
            sx={{
              px: 1,
              mb: 1,
            }}
          >

            <ListItemButton

              component={Link}

              to={menu.path}

              selected={location.pathname === menu.path}

              sx={{

                borderRadius: 3,

                "&.Mui-selected": {

                  bgcolor: "#2563EB",

                  color: "#fff",

                },

                "&.Mui-selected:hover": {

                  bgcolor: "#1D4ED8",

                },

                "&:hover": {

                  bgcolor: "#1E293B",

                },

              }}

            >

              <ListItemIcon
                sx={{
                  color: "#fff",
                  minWidth: 40,
                }}
              >

                {menu.icon}

              </ListItemIcon>

              <ListItemText primary={menu.text} />

            </ListItemButton>

          </ListItem>

        ))}

      </List>

      <Box
        sx={{
          mt: "auto",
          p: 3,
        }}
      >

        <Divider
          sx={{
            borderColor: "#334155",
            mb: 3,
          }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >

          <Avatar
            sx={{
              bgcolor: "#2563EB",
            }}
          >
            S
          </Avatar>

          <Box>

            <Typography fontWeight="bold">
              Muhammad Salih
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#94A3B8",
              }}
            >
              Administrator
            </Typography>

          </Box>

        </Box>

      </Box>

    </Drawer>

  );

}