import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { LanguageProvider } from '@/contexts/language-context';
import { Navbar } from '@/components/navbar';
import Home from '@/pages/home';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route>
        <div className="min-h-screen flex items-center justify-center text-xl text-muted-foreground">
          404 | Not Found
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground font-sans">
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Navbar />
            <Router />
          </WouterRouter>
        </div>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
