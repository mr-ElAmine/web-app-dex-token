import { StrictMode, type JSX } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import RouterApp from './routes/index';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <RouterApp />
      </StrictMode>
    </QueryClientProvider>
  );
}

export default App;
