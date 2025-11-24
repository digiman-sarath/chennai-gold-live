import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Shield, Lock, Eye, Cookie, Database, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | Chennai Gold Price</title>
        <meta 
          name="description" 
          content="Privacy Policy for Chennai Gold Price. Learn how we collect, use, and protect your personal information when you use our gold rate tracking service."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://chennaigoldprice.com/privacy-policy" />
        <link rel="alternate" hrefLang="en" href="https://chennaigoldprice.com/privacy-policy" />
        <link rel="alternate" hrefLang="x-default" href="https://chennaigoldprice.com/privacy-policy" />
      </Helmet>

      <Header />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Last Updated: January 24, 2025
          </p>
        </div>

        {/* Introduction */}
        <Card className="p-8 mb-8">
          <p className="text-foreground/90 leading-relaxed">
            At Chennai Gold Price ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>chennaigoldprice.com</strong>.
          </p>
        </Card>

        {/* Information We Collect */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Database className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Information We Collect</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">1. Automatically Collected Information</h3>
              <p className="text-muted-foreground mb-3">
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Time zone setting</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Language preferences</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">2. Information You Provide</h3>
              <p className="text-muted-foreground mb-3">
                We do not require user registration. However, if you contact us via email or forms, we collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Name (if provided)</li>
                <li>Email address</li>
                <li>Message content</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">3. Local Storage Data</h3>
              <p className="text-muted-foreground">
                We use browser local storage to save your preferences, such as:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Language preference (English/Tamil)</li>
                <li>Theme settings (if applicable)</li>
                <li>Notification preferences</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3 italic">
                This data is stored locally on your device and is not transmitted to our servers.
              </p>
            </div>
          </div>
        </Card>

        {/* Cookies */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Cookie className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Cookies and Tracking Technologies</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device.
            </p>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Types of Cookies We Use:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </div>

            <p>
              You can control cookies through your browser settings. However, disabling cookies may affect website functionality.
            </p>
          </div>
        </Card>

        {/* How We Use Information */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">How We Use Your Information</h2>
          </div>

          <div className="space-y-3 text-muted-foreground">
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and maintain our gold price tracking service</li>
              <li>Improve website performance and user experience</li>
              <li>Analyze usage patterns and trends</li>
              <li>Detect and prevent technical issues</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Send important updates about our service (if you've opted in)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </Card>

        {/* Third-Party Services */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>We use the following third-party services:</p>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">GoldAPI.io</h3>
              <p>We use GoldAPI.io to fetch real-time gold price data. Please refer to their privacy policy for information about their data practices.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Analytics Services</h3>
              <p>We may use analytics services to understand website usage. These services may collect information such as your IP address, browser type, and pages visited.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Advertising Partners</h3>
              <p>We may display advertisements from third-party ad networks. These partners may use cookies and similar technologies to collect information about your browsing activity.</p>
            </div>
          </div>
        </Card>

        {/* Data Security */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Data Security</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p>
              However, please note that no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </div>
        </Card>

        {/* Your Rights */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Your Privacy Rights</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Disable cookies through your browser settings</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
          </div>
        </Card>

        {/* Children's Privacy */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Children's Privacy</h2>
          <p className="text-muted-foreground">
            Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
          </p>
        </Card>

        {/* Changes to Privacy Policy */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Privacy Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </Card>

        {/* Contact Information */}
        <Card className="p-8 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
          </div>
          <div className="space-y-3 text-foreground/90">
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
            <div className="space-y-2">
              <p><strong>Website:</strong> chennaigoldprice.com</p>
              <p><strong>Email:</strong> privacy@chennaigoldprice.com</p>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
