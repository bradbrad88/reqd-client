import { MutateFunction, QueryKey, useMutation as useM, useQueryClient } from "react-query";

export const useMutation = <DataReturn, Variables>(
  key: QueryKey,
  mutateFn: MutateFunction<unknown, unknown, Variables>,
  optimisticUpdater?: (previous: DataReturn, vars: Variables) => DataReturn
) => {
  const client = useQueryClient();
  const { mutate, status, mutateAsync } = useM(mutateFn, {
    onMutate: async vars => {
      if (!optimisticUpdater) return;

      await client.cancelQueries(key);
      const prev = client.getQueryData(key) as DataReturn;
      const current = optimisticUpdater(prev, vars);
      client.setQueryData(key, current);
    },
    onSettled: () => {
      client.invalidateQueries(key);
    },
  });

  return { mutate, status, mutateAsync };
};
