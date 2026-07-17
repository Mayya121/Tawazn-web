import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { LanguageProvider } from '@/contexts/language-context';
import { Navbar } from '@/components/navbar';
import Home from '@/pages/home';
import Dashboard from '@/pages/dashboard';
import Insights from '@/pages/insights';
import Challenges from '@/pages/challenges';
import { BackgroundEffects } from '@/components/background-effects';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/insights" component={Insights} />
      <Route path="/challenges" component={Challenges} />
      <Route>
        <div className="min-h-screen flex items-center justify-center text-xl" style={{ color: 'white' }}>
          404 | Page Not Found
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div style={{ minHeight: '100vh', backgroundColor: '#03060d', color: 'white' }}>
          <BackgroundEffects />
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
