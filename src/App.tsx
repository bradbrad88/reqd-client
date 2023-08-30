import Areas from "./features/areas/Areas";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Areas />
    </QueryClientProvider>
  );
}

export default App;
