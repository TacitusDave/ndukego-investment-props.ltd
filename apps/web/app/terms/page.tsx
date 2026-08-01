import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Ndukego Homes Gallery",
  description: "Terms and conditions for using the Ndukego Homes Gallery Platform.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: July 2026</p>

      <div className="prose prose-sm max-w-none space-y-8 text-foreground">

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">1. Agreement to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using the Ndukego Homes Gallery Platform (&ldquo;Platform&rdquo;), operated by Ndukego Investments &amp; Properties Limited (&ldquo;Ndukego&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">2. Use of the Platform</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Platform is provided for the purpose of browsing, inquiring about, and reserving real estate properties offered by Ndukego Investments &amp; Properties Limited. You agree to use the Platform only for lawful purposes and in a manner consistent with these Terms.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>You must provide accurate information when creating an account or submitting an inquiry</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You must not use the Platform to transmit any misleading or fraudulent information</li>
            <li>You must not attempt to access areas of the Platform you are not authorized to access</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">3. Property Listings</h2>
          <p className="text-muted-foreground leading-relaxed">
            Property listings on the Platform are subject to availability and may change without notice. All prices are indicative and subject to confirmation. A reservation submitted through the Platform does not constitute a binding contract of sale. A reservation request is reviewed and confirmed by our sales team, who will contact you to proceed.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            No online payments are processed through this Platform. All financial transactions are completed in person at our offices.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">4. Reservations</h2>
          <p className="text-muted-foreground leading-relaxed">
            Submitting a reservation request on the Platform is an expression of interest only. It does not guarantee that the property will be held exclusively for you until our sales team confirms the reservation and any applicable reservation fee arrangements are agreed upon in writing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">5. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            All content on the Platform, including but not limited to text, images, logos, and software, is the property of Ndukego Investments &amp; Properties Limited and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">6. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            To the fullest extent permitted by law, Ndukego Investments &amp; Properties Limited shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform. Our total liability shall not exceed the amount, if any, paid by you for access to the Platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">7. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to update these Terms at any time. Continued use of the Platform after any changes constitutes your acceptance of the revised Terms. We will endeavour to notify registered users of significant changes via email.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">8. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="rounded-xl border bg-card p-4 text-sm space-y-1">
            <p className="font-semibold">Ndukego Investments &amp; Properties Limited</p>
            <p className="text-muted-foreground">Nigeria</p>
            <p className="text-muted-foreground">Email: info@ndukegohomes.com</p>
          </div>
        </section>

      </div>
    </div>
  );
}
