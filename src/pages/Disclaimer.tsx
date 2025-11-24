import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Info, TrendingUp, Shield, ExternalLink } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Disclaimer | Chennai Gold Price</title>
        <meta 
          name="description" 
          content="Disclaimer for Chennai Gold Price. Important information about gold rate accuracy, investment advice, and usage of our gold price tracking service."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://chennaigoldprice.com/disclaimer" />
        <link rel="alternate" hrefLang="en" href="https://chennaigoldprice.com/disclaimer" />
        <link rel="alternate" hrefLang="x-default" href="https://chennaigoldprice.com/disclaimer" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Disclaimer",
            "description": "Disclaimer for Chennai Gold Price. Important information about gold rate accuracy, investment advice, and usage of our gold price tracking service.",
            "url": "https://chennaigoldprice.com/disclaimer",
            "inLanguage": "en",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Chennai Gold Price",
              "url": "https://chennaigoldprice.com"
            },
            "datePublished": "2025-01-24",
            "dateModified": "2025-01-24",
            "mainEntity": {
              "@type": "Article",
              "headline": "Disclaimer - Chennai Gold Price",
              "author": {
                "@type": "Organization",
                "name": "Chennai Gold Price",
                "url": "https://chennaigoldprice.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Chennai Gold Price",
                "url": "https://chennaigoldprice.com"
              },
              "datePublished": "2025-01-24",
              "dateModified": "2025-01-24"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://chennaigoldprice.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Disclaimer",
                  "item": "https://chennaigoldprice.com/disclaimer"
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <Header />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-yellow-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Disclaimer
          </h1>
          <p className="text-lg text-muted-foreground">
            Last Updated: January 24, 2025
          </p>
        </div>

        {/* General Disclaimer */}
        <Card className="p-8 mb-8 border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/20">
          <div className="flex items-start gap-3 mb-4">
            <Info className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">Important Notice</h2>
              <p className="text-foreground/90 leading-relaxed">
                The information provided on Chennai Gold Price (chennaigoldprice.com) is for general informational purposes only. While we strive to provide accurate and up-to-date gold rate information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the information.
              </p>
            </div>
          </div>
        </Card>

        {/* Price Accuracy */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Gold Price Accuracy</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">Real-Time Data:</strong> Gold prices displayed on our website are sourced from third-party API providers (GoldAPI.io). While we update prices regularly, actual market prices may vary.
            </p>
            
            <p>
              <strong className="text-foreground">Local Variations:</strong> Gold prices can vary between different jewelers, cities, and regions based on factors such as:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Making charges and craftsmanship fees</li>
              <li>GST (Goods and Services Tax)</li>
              <li>Local demand and supply</li>
              <li>Purity variations (22K, 24K, 18K)</li>
              <li>Exchange rates and international gold prices</li>
            </ul>

            <p className="pt-4">
              <strong className="text-foreground">Verification Required:</strong> We strongly recommend verifying current gold rates directly with authorized jewelers before making any purchase or investment decisions.
            </p>
          </div>
        </Card>

        {/* Investment Advice */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Not Financial or Investment Advice</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The content on this website is <strong className="text-foreground">NOT intended as financial, investment, or professional advice</strong>. Chennai Gold Price is an informational service only.
            </p>
            
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg">
              <p className="font-semibold text-foreground mb-2">⚠️ Important:</p>
              <ul className="space-y-2 text-sm">
                <li>• Do not rely solely on information from this website for investment decisions</li>
                <li>• Consult qualified financial advisors before investing in gold</li>
                <li>• Past price trends do not guarantee future performance</li>
                <li>• Gold investments carry market risks</li>
                <li>• We are not responsible for any financial losses incurred</li>
              </ul>
            </div>

            <p className="pt-4">
              Gold investment decisions should be made after careful consideration of your financial situation, risk tolerance, and consultation with certified financial advisors.
            </p>
          </div>
        </Card>

        {/* No Guarantees */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">No Guarantees or Warranties</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>We do not guarantee or warrant that:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The information on this website is completely accurate, reliable, or current</li>
              <li>Our website will be available at all times without interruptions</li>
              <li>The website is free from errors, viruses, or other harmful components</li>
              <li>Gold prices displayed match the exact prices offered by jewelers</li>
              <li>Any defects in the website will be corrected promptly</li>
            </ul>
          </div>
        </Card>

        {/* Third-Party Links */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <ExternalLink className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Third-Party Links and Resources</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Our website may contain links to third-party websites or resources (such as GoldAPI.io, jeweler websites, or gold market resources).
            </p>
            
            <p>
              <strong className="text-foreground">Disclaimer:</strong> We are not responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The content, accuracy, or opinions expressed on third-party websites</li>
              <li>Privacy practices of external websites</li>
              <li>Products, services, or information offered by third parties</li>
              <li>Any losses or damages arising from third-party interactions</li>
            </ul>

            <p className="pt-4">
              Please review the terms and privacy policies of any third-party websites you visit.
            </p>
          </div>
        </Card>

        {/* User Responsibility */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">User Responsibility</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>By using Chennai Gold Price, you agree that:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You use the website and its information at your own risk</li>
              <li>You are responsible for verifying all information before acting on it</li>
              <li>You will not hold us liable for any decisions made based on website content</li>
              <li>You understand that gold prices are subject to market fluctuations</li>
              <li>You will conduct your own research and due diligence</li>
            </ul>
          </div>
        </Card>

        {/* Limitation of Liability */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Limitation of Liability</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              To the fullest extent permitted by law, Chennai Gold Price, its owners, employees, and affiliates shall not be liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Any direct, indirect, incidental, or consequential damages</li>
              <li>Loss of profits, revenue, or business opportunities</li>
              <li>Loss of data or information</li>
              <li>Financial losses from gold purchases or investments</li>
              <li>Damages arising from website use or inability to use the website</li>
              <li>Errors, omissions, or inaccuracies in the content</li>
              <li>Unauthorized access to our servers or databases</li>
            </ul>

            <p className="pt-4 font-semibold text-foreground">
              This limitation applies even if we have been advised of the possibility of such damages.
            </p>
          </div>
        </Card>

        {/* Accuracy of Guides and Educational Content */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Educational Content Disclaimer</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Our buying guides, purity checking methods, GST calculations, and other educational content are provided for general informational purposes only.
            </p>
            
            <p>
              <strong className="text-foreground">Please Note:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Tax rates and regulations may change; always verify current GST rates</li>
              <li>BIS hallmarking standards may be updated by authorities</li>
              <li>Making charges and industry practices may vary</li>
              <li>Local regulations may differ across regions</li>
            </ul>

            <p className="pt-4">
              Always consult with certified professionals and official sources for the most current and accurate information.
            </p>
          </div>
        </Card>

        {/* Changes to Disclaimer */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Disclaimer</h2>
          <p className="text-muted-foreground">
            We reserve the right to modify this disclaimer at any time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of the website after changes constitutes acceptance of the modified disclaimer.
          </p>
        </Card>

        {/* Contact */}
        <Card className="p-8 bg-primary/5 border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Questions or Concerns?</h2>
          <div className="space-y-3 text-foreground/90">
            <p>If you have any questions about this disclaimer, please contact us:</p>
            <div className="space-y-2">
              <p><strong>Website:</strong> chennaigoldprice.com</p>
              <p><strong>Email:</strong> support@chennaigoldprice.com</p>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Disclaimer;
