import { SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY } from "@/lib/contact";

const SITE = "https://cedarce.ng";

export default function TermsOfServiceDocument() {
  return (
    <article className="space-y-6 text-cliq-text-body">
      <header className="space-y-2 border-b border-cliq-gray-200 pb-8">
        <p className="text-sm font-semibold text-cliq-text-heading">Cedarce Co</p>
        <h1 className="text-4xl font-black text-cliq-text-heading">Terms of Service</h1>
        <p className="text-sm text-cliq-text-muted">
          Effective Date: May 2026 · Last Updated: May 2026
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">1. Introduction</h2>
        <p className="leading-relaxed">
          These Terms of Service (&quot;Terms&quot;) govern your use of the Cedarce website at {SITE} and all services provided by Cedarce Co (&quot;Cedarce&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
        </p>
        <p className="leading-relaxed">
          By accessing our website, creating an account, submitting a service request, or engaging our services in any form, you (&quot;Client&quot;, &quot;you&quot;, or &quot;your&quot;) agree to be bound by these Terms.
        </p>
        <p className="leading-relaxed">If you do not agree to these Terms, please do not use our website or services.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">2. About Cedarce</h2>
        <p className="leading-relaxed">
          Cedarce is a digital business services company based in Nigeria. We help businesses, from startups to growing enterprises, go professional by setting up and managing their digital infrastructure. Our services include website development, mobile app development, domain and hosting setup, business email configuration, payment gateway integration, invoicing systems, bulk messaging, digital marketing and ads, and staff training.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">3. Eligibility</h2>
        <p className="leading-relaxed">To use our services, you must:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>Be at least 18 years of age</li>
          <li>Have the legal authority to enter into a binding agreement on behalf of yourself or your business</li>
          <li>Provide accurate and truthful information during registration and onboarding</li>
        </ul>
        <p className="leading-relaxed">
          We reserve the right to refuse service to anyone who does not meet these requirements or who we believe may misuse our services.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">4. Our Services</h2>
        <h3 className="text-lg font-semibold text-cliq-text-heading">4.1 Service Packages</h3>
        <p className="leading-relaxed">Cedarce offers the following service packages:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>
            <strong>Starter:</strong> Entry-level digital stack for new businesses
          </li>
          <li>
            <strong>Business:</strong> Full-service professional setup for growing businesses
          </li>
          <li>
            <strong>Enterprise:</strong> Custom scope, integrations, and dedicated delivery for larger operations
          </li>
        </ul>
        <p className="leading-relaxed">
          Individual services are also available outside of packages. Pricing is displayed on our website and is subject to change. Final pricing for custom or enterprise projects is confirmed after a discovery consultation.
        </p>
        <h3 className="text-lg font-semibold text-cliq-text-heading">4.2 Service Delivery</h3>
        <p className="leading-relaxed">Upon confirmation of payment and project scope:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>Standard setups are typically delivered within <strong>48-72 hours</strong></li>
          <li>Complex builds (mobile apps, custom integrations) have timelines agreed upon in writing before work begins</li>
          <li>Cedarce will communicate progress and any changes to timelines promptly</li>
        </ul>
        <h3 className="text-lg font-semibold text-cliq-text-heading">4.3 Client Responsibilities</h3>
        <p className="leading-relaxed">To enable timely delivery, you agree to:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>Provide accurate business information, content, logos, and materials required for your project</li>
          <li>Respond to requests for information or approvals in a timely manner</li>
          <li>Designate a point of contact for your project</li>
          <li>Notify us promptly of any changes that may affect the project</li>
        </ul>
        <p className="leading-relaxed">
          Delays caused by a failure to provide required information or approvals on time are not the responsibility of Cedarce.
        </p>
        <h3 className="text-lg font-semibold text-cliq-text-heading">4.4 Third-Party Services</h3>
        <p className="leading-relaxed">
          Some of our services involve third-party platforms such as domain registrars, hosting providers, payment processors (Paystack, Flutterwave), email providers, and messaging platforms. While we configure and manage these on your behalf, their own terms and conditions apply. Cedarce is not liable for outages, policy changes, or actions taken by these third parties.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">5. Accounts and Registration</h2>
        <h3 className="text-lg font-semibold text-cliq-text-heading">5.1 Creating an Account</h3>
        <p className="leading-relaxed">
          To submit a service request or access your client dashboard, you must create an account. You agree to provide accurate information and keep your account details up to date.
        </p>
        <h3 className="text-lg font-semibold text-cliq-text-heading">5.2 Account Security</h3>
        <p className="leading-relaxed">
          You are responsible for maintaining the confidentiality of your login credentials. You agree to notify us immediately at {SUPPORT_EMAIL} if you suspect any unauthorised access to your account.
        </p>
        <p className="leading-relaxed">
          Cedarce is not liable for any loss or damage resulting from unauthorised access to your account caused by your failure to keep your credentials secure.
        </p>
        <h3 className="text-lg font-semibold text-cliq-text-heading">5.3 Account Suspension</h3>
        <p className="leading-relaxed">We reserve the right to suspend or terminate your account if:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>You provide false or misleading information</li>
          <li>You violate any part of these Terms</li>
          <li>Your account is used for fraudulent, illegal, or harmful activities</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">6. Payments and Fees</h2>
        <h3 className="text-lg font-semibold text-cliq-text-heading">6.1 Payment Terms</h3>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>A deposit is required before work begins on any project. The deposit amount will be communicated during consultation or stated in your project proposal</li>
          <li>Full payment for smaller services is required upfront</li>
          <li>For larger projects, a payment schedule (e.g. 50% upfront, 50% on delivery) will be agreed in writing</li>
        </ul>
        <h3 className="text-lg font-semibold text-cliq-text-heading">6.2 Accepted Payment Methods</h3>
        <p className="leading-relaxed">
          We accept payment via bank transfer and online payment channels. Payment details will be provided in your invoice.
        </p>
        <h3 className="text-lg font-semibold text-cliq-text-heading">6.3 Late Payments</h3>
        <p className="leading-relaxed">
          Failure to make payment by the agreed due date may result in a pause or suspension of work on your project. Cedarce reserves the right to apply a late payment fee for invoices unpaid beyond 14 days of the due date.
        </p>
        <h3 className="text-lg font-semibold text-cliq-text-heading">6.4 Refunds</h3>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>If Cedarce is unable to deliver the agreed service, a full or partial refund will be issued as appropriate</li>
          <li>Refunds are not available once a service has been fully delivered and accepted by the client</li>
          <li>
            Deposits are non-refundable once work has commenced, unless Cedarce fails to begin work within the agreed timeframe
          </li>
          <li>Refund requests must be submitted in writing to {SUPPORT_EMAIL} within 7 days of the issue arising</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">7. Intellectual Property</h2>
        <h3 className="text-lg font-semibold text-cliq-text-heading">7.1 Your Content</h3>
        <p className="leading-relaxed">
          You retain ownership of all content, logos, images, and materials you provide to Cedarce for use in your project.
        </p>
        <h3 className="text-lg font-semibold text-cliq-text-heading">7.2 Deliverables</h3>
        <p className="leading-relaxed">
          Upon full payment, ownership of the final deliverables (website, app, configured systems) is transferred to you. This excludes any third-party components, plugins, or tools used in the build, which remain subject to their respective licences.
        </p>
        <h3 className="text-lg font-semibold text-cliq-text-heading">7.3 Cedarce IP</h3>
        <p className="leading-relaxed">
          All original code, templates, frameworks, methodologies, and tools developed by Cedarce remain the intellectual property of Cedarce Co. You are granted a licence to use the deliverables for your business purposes, but you may not resell, redistribute, or claim ownership of Cedarce&apos;s underlying tools or frameworks.
        </p>
        <h3 className="text-lg font-semibold text-cliq-text-heading">7.4 Portfolio Rights</h3>
        <p className="leading-relaxed">
          Unless you expressly request otherwise in writing, Cedarce reserves the right to reference your project (business name, service type, general outcome) in our portfolio, case studies, or marketing materials.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">8. Confidentiality</h2>
        <p className="leading-relaxed">
          Both parties agree to keep confidential any sensitive business information shared during the course of the engagement. Cedarce will not disclose your business information to any third party except as required to deliver your services or comply with legal obligations.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">9. Support and Maintenance</h2>
        <h3 className="text-lg font-semibold text-cliq-text-heading">9.1 Post-Launch Support</h3>
        <p className="leading-relaxed">Each package includes a defined support period:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>Starter: 30 days post-launch support</li>
          <li>Business: 90 days implementation support</li>
          <li>Enterprise: Ongoing support as agreed in your contract</li>
        </ul>
        <p className="leading-relaxed">
          Support covers bug fixes, configuration adjustments, and guidance on using your setup. It does not cover new features or scope additions, which will be quoted separately.
        </p>
        <h3 className="text-lg font-semibold text-cliq-text-heading">9.2 Out-of-Scope Work</h3>
        <p className="leading-relaxed">
          Any work requested beyond the agreed project scope will be assessed and quoted separately before proceeding. Cedarce will not begin out-of-scope work without written agreement from the client.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">10. Limitation of Liability</h2>
        <p className="leading-relaxed">To the fullest extent permitted by Nigerian law:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>Cedarce is not liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our services</li>
          <li>
            Our total liability to you for any claim arising from our services shall not exceed the total amount you paid Cedarce for the specific service giving rise to the claim
          </li>
          <li>Cedarce is not liable for losses caused by third-party platform outages, policy changes, or service disruptions beyond our control</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">11. Warranties and Disclaimers</h2>
        <p className="leading-relaxed">Cedarce provides its services with reasonable skill and care. However:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>We do not guarantee specific business outcomes (e.g. sales growth, customer increase) resulting from our services</li>
          <li>
            Websites and systems are delivered based on agreed specifications. We are not responsible for performance issues caused by third-party hosting, payment processors, or external platforms
          </li>
          <li>We do not warrant that our website or services will be uninterrupted, error-free, or free from security vulnerabilities at all times</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">12. Prohibited Use</h2>
        <p className="leading-relaxed">You agree not to use Cedarce services to:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>Conduct any fraudulent, deceptive, or illegal activity</li>
          <li>Build platforms or systems intended to harm, scam, or exploit others</li>
          <li>Violate the intellectual property rights of any third party</li>
          <li>Distribute malware, spam, or harmful content through systems we build or configure for you</li>
          <li>Resell or sublicense Cedarce services without written permission</li>
        </ul>
        <p className="leading-relaxed">
          Violation of this clause gives Cedarce the right to immediately terminate your account and project without refund.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">13. Termination</h2>
        <h3 className="text-lg font-semibold text-cliq-text-heading">13.1 By You</h3>
        <p className="leading-relaxed">
          You may terminate your engagement with Cedarce at any time by notifying us in writing. Deposits and payments made for work already commenced are non-refundable.
        </p>
        <h3 className="text-lg font-semibold text-cliq-text-heading">13.2 By Cedarce</h3>
        <p className="leading-relaxed">We may terminate or suspend your account and services at our discretion if:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>You breach any provision of these Terms</li>
          <li>You engage in abusive, threatening, or fraudulent behaviour toward our team</li>
          <li>Payment obligations are not met after reasonable notice</li>
        </ul>
        <p className="leading-relaxed">
          Upon termination, any work completed up to that point remains your property, subject to settlement of outstanding payments.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">14. Governing Law and Dispute Resolution</h2>
        <p className="leading-relaxed">These Terms are governed by the laws of the Federal Republic of Nigeria.</p>
        <p className="leading-relaxed">In the event of a dispute:</p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed">
          <li>Both parties agree to first attempt resolution through good-faith negotiation</li>
          <li>If unresolved within 30 days, the dispute may be referred to mediation or arbitration in Nigeria</li>
          <li>Nothing in this clause prevents either party from seeking urgent injunctive relief from a competent Nigerian court</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">15. Changes to These Terms</h2>
        <p className="leading-relaxed">
          We may update these Terms from time to time. When we do, we will update the &quot;Last Updated&quot; date at the top of this page. Continued use of our services after changes are posted constitutes your acceptance of the updated Terms.
        </p>
        <p className="leading-relaxed">
          For significant changes, we will make reasonable efforts to notify you via email or a notice on our website.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-cliq-text-heading">16. Contact Us</h2>
        <p className="leading-relaxed">If you have any questions about these Terms, please contact us:</p>
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
