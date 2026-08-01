import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Ndukego Homes Gallery",
  description: "How Ndukego Homes Gallery collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: July 2026</p>

      <div className="prose prose-sm max-w-none space-y-8 text-foreground">

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Ndukego Investments &amp; Properties Limited (&ldquo;Ndukego&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, store, and protect information about you when you use the Ndukego Homes Gallery Platform (&ldquo;Platform&rdquo;).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This Policy is compliant with the Nigeria Data Protection Act (NDPA) 2023 and the Nigeria Data Protection Regulation (NDPR).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">2. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed">We collect the following categories of personal data:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li><strong>Identity data:</strong> first name, last name</li>
            <li><strong>Contact data:</strong> email address, phone number, city, state</li>
            <li><strong>Account data:</strong> username, password (stored encrypted), account preferences</li>
            <li><strong>Transaction data:</strong> reservation requests and status history</li>
            <li><strong>Usage data:</strong> pages viewed, properties browsed, search queries</li>
            <li><strong>Technical data:</strong> IP address, browser type, device information</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">3. How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed">We use your personal data to:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Create and manage your account on the Platform</li>
            <li>Process and respond to your property inquiries and reservation requests</li>
            <li>Send you transactional emails (reservation confirmations, status updates)</li>
            <li>Contact you about properties matching your interests</li>
            <li>Improve the Platform and our services</li>
            <li>Comply with legal obligations and maintain audit records</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">4. Legal Basis for Processing</h2>
          <p className="text-muted-foreground leading-relaxed">
            We process your data on the following legal bases: (a) your consent, where you have provided it; (b) performance of a contract, where processing is necessary to fulfill a reservation or service request; (c) legitimate interests of our business, where your interests do not override ours; and (d) compliance with a legal obligation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">5. Data Sharing</h2>
          <p className="text-muted-foreground leading-relaxed">
            We do not sell your personal data to third parties. We may share your data with:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Our staff who need it to process your requests</li>
            <li>Service providers who help us operate the Platform (e.g., cloud hosting, email delivery) under strict data processing agreements</li>
            <li>Regulatory or law enforcement authorities when required by law</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">6. Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain your personal data for as long as your account is active or as needed to provide you with our services. We may retain certain data for longer periods where required by law or for legitimate business purposes such as resolving disputes or enforcing agreements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">7. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed">Under applicable data protection law, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li><strong>Access</strong> — request a copy of your personal data</li>
            <li><strong>Correction</strong> — request correction of inaccurate data</li>
            <li><strong>Deletion</strong> — request deletion of your data, subject to legal obligations</li>
            <li><strong>Objection</strong> — object to processing based on legitimate interests</li>
            <li><strong>Portability</strong> — receive your data in a structured, machine-readable format</li>
            <li><strong>Withdraw consent</strong> — where processing is based on consent</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">To exercise any of these rights, contact us at the details below.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">8. Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Platform uses cookies and similar technologies to maintain your login session and improve your experience. Authentication cookies are strictly necessary and cannot be disabled. You can control other cookies through your browser settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">9. Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal data, including encrypted data transmission (HTTPS), encrypted password storage, and access controls. No system is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">10. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            For any privacy-related queries or to exercise your rights, please contact:
          </p>
          <div className="rounded-xl border bg-card p-4 text-sm space-y-1">
            <p className="font-semibold">Data Privacy Officer</p>
            <p className="text-muted-foreground">Ndukego Investments &amp; Properties Limited</p>
            <p className="text-muted-foreground">Nigeria</p>
            <p className="text-muted-foreground">Email: privacy@ndukegohomes.com</p>
          </div>
        </section>

      </div>
    </div>
  );
}
