export interface TableProps {
  headers: string[];
  rows: any[];
  count?: number;
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
}

export interface Row {
  id: string;
  email: string;
  isVerified: boolean;
  userName: string;
}
