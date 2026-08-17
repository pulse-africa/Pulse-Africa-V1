import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

import MainLayout from '@/components/layout/MainLayout';
import Home from '@/pages/Home';
import Actualites from '@/pages/Actualites';
import ActualiteDetail from '@/pages/ActualiteDetail';
import Videos from '@/pages/Videos';
import Emissions from '@/pages/Emissions';
import Live from '@/pages/Live';
import Tendances from '@/pages/Tendances';
import Recherche from '@/pages/Recherche';
import Connexion from '@/pages/Connexion';
import Profil from '@/pages/Profil';

import StudioLayout from '@/pages/studio/StudioLayout';
import StudioDashboard from '@/pages/studio/StudioDashboard';
import StudioArticles from '@/pages/studio/StudioArticles';
import StudioVideos from '@/pages/studio/StudioVideos';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        {/* Studio Routes (Separate Layout) */}
        <Route path="/studio" nest>
          <StudioLayout>
            <Switch>
              <Route path="/" component={StudioDashboard} />
              <Route path="/articles" component={StudioArticles} />
              <Route path="/videos" component={StudioVideos} />
              {/* Other studio routes would go here */}
              <Route component={NotFound} />
            </Switch>
          </StudioLayout>
        </Route>
        
        {/* Auth Routes */}
        <Route path="/connexion" component={Connexion} />

        {/* Public Routes with Main Layout */}
        <Route path="/" nest={false}>
          <MainLayout>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/actualites" component={Actualites} />
              <Route path="/actualites/:slug" component={ActualiteDetail} />
              <Route path="/videos" component={Videos} />
              <Route path="/emissions" component={Emissions} />
              <Route path="/live" component={Live} />
              <Route path="/tendances" component={Tendances} />
              <Route path="/recherche" component={Recherche} />
              <Route path="/profil" component={Profil} />
              <Route component={NotFound} />
            </Switch>
          </MainLayout>
        </Route>
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
