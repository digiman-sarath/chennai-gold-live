import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Critical pages - load immediately
import Index from "./pages/Index";
import CityGoldRates from "./pages/CityGoldRates";
import NotFound from "./pages/NotFound";

// Lazy load non-critical pages for faster initial load
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ModernGoldRates = lazy(() => import("./pages/ModernGoldRates"));
const GoldBuyingGuide = lazy(() => import("./pages/GoldBuyingGuide"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const Articles = lazy(() => import("./pages/Articles"));
const Article = lazy(() => import("./pages/Article"));
const ArticleManagement = lazy(() => import("./pages/ArticleManagement"));
const ArticleEditor = lazy(() => import("./pages/ArticleEditor"));
const DistrictContentManager = lazy(() => import("./pages/DistrictContentManager"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogList = lazy(() => import("./pages/BlogList"));

// Minimal loading fallback for fast perceived load
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/rates" element={<ModernGoldRates />} />
              <Route path="/gold-rates/:city" element={<CityGoldRates />} />
              <Route path="/buying-guide" element={<GoldBuyingGuide />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<Article />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin-panel" element={<AdminDashboard />} />
              <Route path="/admin/articles" element={<ArticleManagement />} />
              <Route path="/admin/articles/new" element={<ArticleEditor />} />
              <Route path="/admin/articles/edit/:id" element={<ArticleEditor />} />
              <Route path="/admin/district-content" element={<DistrictContentManager />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
