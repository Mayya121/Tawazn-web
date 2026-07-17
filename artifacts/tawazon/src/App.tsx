import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { LanguageProvider } from '@/contexts/language-context';
import { UserDataProvider } from '@/contexts/user-data-context';
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
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 20 }}>
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
        <UserDataProvider>
          <div style={{ minHeight: '100vh', backgroundColor: '#03060d', color: 'white' }}>
            <BackgroundEffects />
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
              <Navbar />
              <Router />
            </WouterRouter>
          </div>
        </UserDataProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
