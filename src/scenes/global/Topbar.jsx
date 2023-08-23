import { Box, Icon, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutLinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutLinedIcon from "@mui/icons-material/DarkModeOutlined";
import { motion } from "framer-motion";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const topbarVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8 } }
  };

  return (
    <motion.div
      variants={topbarVariants}
      initial="initial"
      animate="animate"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        p={2}
        sx={{ boxShadow: "2" }}
      >
        <Typography variant="h2">Weather App</Typography>

        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutLinedIcon />
            ) : (
              <LightModeOutLinedIcon />
            )}
          </IconButton>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Topbar;
