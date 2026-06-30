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
  Paper,
  Typography,
} from "@mui/material";

import {
  Dashboard,
  People,
  Work,
  UploadFile,
  Assessment,
} from "@mui/icons-material";

import SmartToyIcon from "@mui/icons-material/SmartToy";

import { NavLink } from "react-router-dom";

const drawerWidth = 260;

const menuItems = [
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

export default function Sidebar({
  mobileOpen,
  handleDrawerToggle,
}) {
  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "#0F172A",
        color: "#fff",
      }}
    >
      {/* ================= Logo ================= */}

      <Box
        sx={{
          px: 3,
          py: 4,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <SmartToyIcon
            sx={{
              fontSize: 34,
              color: "#60A5FA",
            }}
          />

          <Box>
            <Typography
              fontWeight={800}
              fontSize="2rem"
              color="white"
            >
              AI Resume
            </Typography>

            <Typography
              sx={{
                color: "#94A3B8",
                fontSize: 15,
              }}
            >
              Recruitment System
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,.08)",
        }}
      />

      {/* ================= Navigation ================= */}

      <Box
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
        }}
      >
        <List>

          {menuItems.map((item) => (

            <ListItem
              key={item.text}
              disablePadding
              sx={{
                mb: 1,
              }}
            >
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  borderRadius: 4,
                  py: 1.7,

                  color: "#E2E8F0",

                  "&.active": {
                    bgcolor: "#2563EB",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.35)",
                  },

                  "&:hover": {
                    bgcolor: "#1E293B",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 42,
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                />
              </ListItemButton>
            </ListItem>

          ))}

        </List>
      </Box>

      {/* ================= Bottom Profile ================= */}

      <Box
        sx={{
          p: 2,
          borderTop:
            "1px solid rgba(255,255,255,.08)",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            bgcolor: "rgba(255,255,255,.06)",
            borderRadius: 4,
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "#fff",
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "#2563EB",
              fontWeight: 700,
              position: "relative",
            }}
          >
            M
          </Avatar>

          <Box>
            <Typography
              fontWeight={700}
              fontSize={18}
            >
              Muhammad Salih
            </Typography>

            <Typography
              sx={{
                color: "#94A3B8",
                fontSize: 15,
              }}
            >
              Administrator
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: {
          md: drawerWidth,
        },
        flexShrink: {
          md: 0,
        },
      }}
    >
      {/* Mobile */}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "#0F172A",
            boxSizing: "border-box",
            height: "100vh",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop */}

      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#0F172A",
            color: "#fff",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            borderRight: "none",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}