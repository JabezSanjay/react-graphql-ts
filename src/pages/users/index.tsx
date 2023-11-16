import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries/users";
import { DataTable } from "../../components/DataTable";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Input,
  Modal,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { UserRow } from "./Users.interface";
import { useQueryData } from "../../utils/custom-hooks/useQueryData";

const HEADERS = ["Email", "Verified", "User Name"];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Users = () => {
  const { loading, error, data } = useQueryData<{ Users: UserRow[] }>(
    GET_USERS
  );
  const [openUserDialog, setOpenUserDialog] = useState(false);

  const rows: UserRow[] = useMemo(() => {
    return data ? data.Users : [];
  }, [data]);

  if (error) {
    return <Typography variant="h6">Error: {error.message}</Typography>;
  }

  return (
    <Box
      minHeight="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenUserDialog(true)}
          >
            Add User
          </Button>
          <DataTable headers={HEADERS} rows={rows} />
        </Box>
      )}
      <Modal
        open={openUserDialog}
        onClose={() => setOpenUserDialog(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}></Box>
      </Modal>
    </Box>
  );
};

export default Users;
