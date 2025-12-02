import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminPanel from "./pages/AdminPanel";
import ModernGoldRates from "./pages/ModernGoldRates";
import CityGoldRates from "./pages/CityGoldRates";
import GoldBuyingGuide from "./pages/GoldBuyingGuide";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import ArticleManagement from "./pages/ArticleManagement";
import ArticleEditor from "./pages/ArticleEditor";
import DistrictContentManager from "./pages/DistrictContentManager";
import BlogPostManagement from "./pages/BlogPostManagement";
import SiteFilesManager from "./pages/SiteFilesManager";
import IndexingQueue from "./pages/IndexingQueue";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rates" element={<ModernGoldRates />} />
            <Route path="/gold-rates/:city" element={<CityGoldRates />} />
            <Route path="/buying-guide" element={<GoldBuyingGuide />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<Article />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/admin/articles" element={<ArticleManagement />} />
            <Route path="/admin/articles/new" element={<ArticleEditor />} />
            <Route path="/admin/articles/edit/:id" element={<ArticleEditor />} />
            <Route path="/admin/district-content" element={<DistrictContentManager />} />
            <Route path="/admin/blog-posts" element={<BlogPostManagement />} />
            <Route path="/admin/site-files" element={<SiteFilesManager />} />
            <Route path="/admin/indexing" element={<IndexingQueue />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
