import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries/users";
import { DataTable } from "../../components/DataTable";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useMemo } from "react";
import { UserRow } from "./Users.interface";

const HEADERS = ["Email", "Verified", "User Name"];

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);

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
          <DataTable headers={HEADERS} rows={rows} />
        </Box>
      )}
    </Box>
  );
};

export default Users;
