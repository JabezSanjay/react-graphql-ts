import { useQuery, DocumentNode, OperationVariables } from "@apollo/client";

export const useQueryData = <
  TData = any,
  TVariables extends OperationVariables = any
>(
  query: DocumentNode,
  variables?: TVariables
) => {
  const { loading, error, data } = useQuery<TData, TVariables>(query, {
    variables,
  });

  return { loading, error, data };
};
