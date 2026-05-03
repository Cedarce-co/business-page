import { SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY } from "@/lib/contact";

const SITE = "https://cedarce.ng";

export default function PrivacyPolicyDocument() {
  return (
    <article className="space-y-6 text-cliq-text-body">
      <header className="space-y-2 border-b border-cliq-gray-200 pb-8">
        <p className="text-sm font-semibold text-cliq-text-heading">Cedarce Co</p>
        <h1 className="text-4xl font-black text-cliq-text-heading">Privacy Policy</h1>
        <p className="text-sm text-cliq-text-muted">
          Effective Date: May 2026 · Last Updated: May 2026
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">1. Introduction</h2>
        <p className="leading-relaxed">
          Welcome to Cedarce. We are a digital business services company registered in Nigeria, helping businesses set up their websites, payments, invoicing, business email, bulk messaging, mobile apps, and more.
        </p>
        <p className="leading-relaxed">
          At Cedarce, we take your privacy seriously. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website at {SITE}, use our services, or interact with us in any way.
        </p>
        <p className="leading-relaxed">
          By using our website or services, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our services.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">2. Who We Are</h2>
        <p className="leading-relaxed">
          <strong>Cedarce Co</strong>
          <br />
          Website: {SITE.replace("https://", "")}
          <br />
          Email: {SUPPORT_EMAIL}
          <br />
          Phone: {SUPPORT_PHONE_DISPLAY}
          <br />
          Location: Nigeria
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">3. Information We Collect</h2>
        <h3 className="text-lg font-semibold text-cliq-text-heading">3.1 Information You Give Us Directly</h3>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>Full name</li>
          <li>Business name</li>
          <li>Email address</li>
          <li>WhatsApp and phone number</li>
          <li>State and city of residence</li>
          <li>Business type and industry</li>
          <li>Service requests and project details</li>
          <li>Payment-related information submitted through our request forms</li>
          <li>Any other information you voluntarily provide when filling out a form, booking a consultation, or contacting us</li>
        </ul>
        <h3 className="text-lg font-semibold text-cliq-text-heading">3.2 Information We Collect Automatically</h3>
        <p className="leading-relaxed">When you visit our site, we may automatically collect:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Device type (mobile, desktop, tablet)</li>
          <li>Pages visited and time spent on each page</li>
          <li>Referring website or source</li>
          <li>Date and time of your visit</li>
        </ul>
        <h3 className="text-lg font-semibold text-cliq-text-heading">3.3 Information From Third Parties</h3>
        <p className="leading-relaxed">We may receive information from third-party platforms such as:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>Payment processors (e.g. Paystack, Flutterwave) when we integrate payment services for your business</li>
          <li>Domain registrars when we register or manage domains on your behalf</li>
          <li>Email service providers when we configure business email accounts for your business</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">4. How We Use Your Information</h2>
        <p className="leading-relaxed">We use the information we collect to:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>Respond to your service requests and enquiries</li>
          <li>Set up and deliver the services you have requested</li>
          <li>Schedule consultations and follow-up calls</li>
          <li>Send you service updates, project status, and support communications</li>
          <li>Send invoices, receipts, and payment confirmations</li>
          <li>Improve our website, services, and customer experience</li>
          <li>
            Send relevant business tips, updates, and announcements <em>(you can opt out at any time)</em>
          </li>
          <li>Comply with legal obligations under Nigerian law</li>
        </ul>
        <p className="leading-relaxed">We do not use your information for automated decision-making or profiling.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">5. How We Share Your Information</h2>
        <p className="leading-relaxed">
          We do not sell, rent, or trade your personal information to any third party.
        </p>
        <p className="leading-relaxed">We may share your information only in the following circumstances:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>
            <strong>Service delivery:</strong> We may share relevant details with trusted third-party providers (e.g. domain registrars, hosting providers, payment processors) strictly to deliver the service you have requested.
          </li>
          <li>
            <strong>Legal requirements:</strong> We may disclose your information if required to do so by Nigerian law, court order, or government authority.
          </li>
          <li>
            <strong>Business transfer:</strong> In the unlikely event of a merger, acquisition, or sale of Cedarce, your information may be transferred as part of that transaction. We will notify you before this happens.
          </li>
        </ul>
        <p className="leading-relaxed">
          All third parties we work with are required to handle your data securely and only for the purpose for which it was shared.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">6. Data Storage and Security</h2>
        <p className="leading-relaxed">
          Your information is stored securely on our systems. We take reasonable technical and organisational measures to protect your data from unauthorised access, loss, misuse, or disclosure.
        </p>
        <p className="leading-relaxed">These measures include:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>Encrypted data transmission (SSL/HTTPS) across our website</li>
          <li>Restricted internal access to personal data</li>
          <li>Secure storage practices for all client information</li>
        </ul>
        <p className="leading-relaxed">
          However, no method of transmission over the internet is 100% secure. While we do our best to protect your information, we cannot guarantee absolute security.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">7. How Long We Keep Your Data</h2>
        <p className="leading-relaxed">We retain your personal information for as long as is necessary to:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>Deliver and support the services you have requested</li>
          <li>Meet our legal and accounting obligations</li>
          <li>Resolve disputes or enforce our agreements</li>
        </ul>
        <p className="leading-relaxed">When your information is no longer needed, we delete or anonymise it securely.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">8. Your Rights</h2>
        <p className="leading-relaxed">As a user of our services, you have the right to:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>
            <strong>Access:</strong> Request a copy of the personal information we hold about you.
          </li>
          <li>
            <strong>Correction:</strong> Ask us to correct any inaccurate or incomplete information.
          </li>
          <li>
            <strong>Deletion:</strong> Request that we delete your personal information, subject to legal obligations.
          </li>
          <li>
            <strong>Objection:</strong> Object to how we use your information, including for marketing purposes.
          </li>
          <li>
            <strong>Withdrawal of consent:</strong> Withdraw your consent to receive marketing communications at any time.
          </li>
        </ul>
        <p className="leading-relaxed">
          To exercise any of these rights, please contact us at {SUPPORT_EMAIL}. We will respond within 7 business days.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">9. Cookies</h2>
        <p className="leading-relaxed">
          Our website may use cookies and similar tracking technologies to improve your browsing experience and understand how visitors use our site.
        </p>
        <p className="leading-relaxed">Cookies we may use include:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>
            <strong>Essential cookies:</strong> Required for the website to function properly.
          </li>
          <li>
            <strong>Analytics cookies:</strong> Help us understand how people use our site (e.g. Google Analytics).
          </li>
          <li>
            <strong>Preference cookies:</strong> Remember your settings and preferences.
          </li>
        </ul>
        <p className="leading-relaxed">
          You can control cookies through your browser settings. Disabling cookies may affect some functionality of our website.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">10. Third-Party Links</h2>
        <p className="leading-relaxed">
          Our website may contain links to third-party websites, tools, or services. We are not responsible for the privacy practices or content of those external sites. We encourage you to read their privacy policies before providing any personal information.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">11. Children&apos;s Privacy</h2>
        <p className="leading-relaxed">
          Our services are intended for businesses and individuals aged 18 and above. We do not knowingly collect personal information from anyone under the age of 18. If we discover that we have inadvertently collected data from a minor, we will delete it immediately.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">12. Changes to This Policy</h2>
        <p className="leading-relaxed">
          We may update this Privacy Policy from time to time to reflect changes in our services, technology, or legal requirements. When we do, we will update the &quot;Last Updated&quot; date at the top of this page.
        </p>
        <p className="leading-relaxed">
          We encourage you to review this page periodically. Continued use of our services after any changes constitutes your acceptance of the updated policy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">13. Contact Us</h2>
        <p className="leading-relaxed">
          If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:
        </p>
        <p className="leading-relaxed">
          <strong>Cedarce Co</strong>
          <br />
          Email: {SUPPORT_EMAIL}
          <br />
          Phone: {SUPPORT_PHONE_DISPLAY}
          <br />
          Website: {SITE.replace("https://", "")}
        </p>
        <p className="leading-relaxed text-cliq-text-muted">We are available Monday to Saturday, 8am-8pm (WAT).</p>
      </section>

      <p className="border-t border-cliq-gray-200 pt-8 text-sm text-cliq-text-muted">
        © {new Date().getFullYear()} Cedarce Co. All rights reserved.
      </p>
    </article>
  );
}
