import { Link } from "react-router-dom";
import LegalLayout, { Blank, Section, Bullets } from "./LegalLayout";

const linkClass = "text-blue-600 hover:underline";

const Terms = () => (
  <LegalLayout title="Terms & Conditions">
    <Section title="1. Who we are">
      <p>
        Anytime Work ("ATW", "we", "us") is operated by Anytime Global Private Limited, CIN{" "}
        <Blank k="cin" />, registered office <Blank k="registeredOffice" />, Jaipur, Rajasthan.
        These Terms apply to anyone who uses our website anytimework.in, our mobile apps, or our
        services ("Platform").
      </p>
      <p>
        By creating an account or using the Platform, you agree to these Terms and to our{" "}
        <Link to="/privacy" className={linkClass}>Privacy Policy</Link>,{" "}
        <Link to="/refund-policy" className={linkClass}>Refund & Cancellation Policy</Link> and{" "}
        <Link to="/cookies" className={linkClass}>Cookie Policy</Link>. If you do not agree, please
        do not use the Platform.
      </p>
    </Section>

    <Section title="2. Who can use the Platform">
      <Bullets
        items={[
          <><strong className="text-gray-900">Workers</strong> — individuals who register to find work through ATW.</>,
          <><strong className="text-gray-900">Client Companies</strong> — businesses that engage workers through ATW.</>,
          <><strong className="text-gray-900">Agents</strong> — partners who refer workers or companies (programme not yet open; see section 7).</>,
          <><strong className="text-gray-900">Visitors</strong> — anyone browsing the website.</>,
        ]}
      />
      <p>
        You must be at least 18 years old to register as a Worker or Agent. A Client Company must be
        a legally registered business, and the person registering it must be authorised to act for
        it.
      </p>
    </Section>

    <Section title="3. Your account">
      <Bullets
        items={[
          "One person may hold only one account. Information you give us must be true and current.",
          "You sign in with a one-time password (OTP) sent to your registered mobile number. Never share your OTP with anyone.",
          <>
            <strong className="text-gray-900">
              ATW will never ask you for your OTP, PIN, password or any money by phone, SMS or
              WhatsApp.
            </strong>{" "}
            Report any such request to <Blank k="fraudReportContact" />.
          </>,
          "You are responsible for activity on your account. Tell us at once if you think someone else has used it.",
        ]}
      />
    </Section>

    <Section title="4. What ATW does">
      <p>
        ATW connects Workers with work at Client Companies and manages recruitment, attendance,
        wages, statutory compliance (EPF, ESIC, gratuity) and payouts.
      </p>
      <p>
        For Workers deployed through ATW, <strong className="text-gray-900">ATW is the employer</strong>{" "}
        and is responsible for paying wages and statutory contributions as required by law. The
        Client Company provides the workplace and supervises day-to-day work.
      </p>
      <p>
        Vacancies on the Platform are posted by Client Companies. We check that each vacancy meets
        the applicable minimum wage before it is published, but we do not guarantee that any vacancy
        will be filled or that any Worker will be selected.
      </p>
    </Section>

    <Section title="5. Terms for Workers">
      <Bullets
        ordered
        items={[
          <><strong className="text-gray-900">No fee.</strong> ATW never charges Workers any fee for registration, applying or getting work.</>,
          <><strong className="text-gray-900">Verification.</strong> To apply for work you must complete KYC (identity check), give a live photo taken in the app, and add a bank account in your own name. You may browse vacancies before KYC, but you cannot apply until it is complete.</>,
          <><strong className="text-gray-900">Face enrolment and attendance.</strong> Attendance is recorded by face check on a device at the work site. You agree to enrol your face for this purpose. Details are in our <Link to="/privacy" className={linkClass}>Privacy Policy</Link>.</>,
          <><strong className="text-gray-900">Applying for work.</strong> Each vacancy shows its wage, shift, location and any special conditions (such as trial days or night shifts). <strong className="text-gray-900">When you apply, you accept the published terms of that vacancy.</strong> You may have up to 5 active applications at a time, and you cannot hold two jobs whose shifts overlap.</>,
          <><strong className="text-gray-900">Appointment.</strong> When you are selected, you receive an appointment letter. The appointment letter, together with these Terms, sets out your employment terms.</>,
          <><strong className="text-gray-900">Wages and deductions.</strong> Wages are calculated from your recorded attendance and work output. EPF, ESIC and other deductions are made as required by law and shown on your wage slip.</>,
          <><strong className="text-gray-900">Wallet and withdrawals.</strong> Your earnings are credited to your ATW wallet. You can withdraw to your registered primary bank account only, up to <Blank k="withdrawalsPerDay" /> time(s) per day. Any withdrawal fee is shown before you confirm. See our <Link to="/refund-policy" className={linkClass}>Refund & Cancellation Policy</Link>.</>,
          <><strong className="text-gray-900">Absence.</strong> If you are absent for 3 working days in a row without approved leave, your attendance may be disabled and you may be released from that assignment. You can ask to rejoin; this needs the manager's approval.</>,
          <><strong className="text-gray-900">Conduct.</strong> You must follow the work-site's safety and conduct rules.</>,
        ]}
      />
    </Section>

    <Section title="6. Terms for Client Companies">
      <p>
        A Client Company's relationship with ATW is governed by the signed{" "}
        <strong className="text-gray-900">Master Services Agreement (MSA)</strong>,{" "}
        <strong className="text-gray-900">Rate Card</strong> and{" "}
        <strong className="text-gray-900">Data Processing Agreement (DPA)</strong>. If anything in
        these Terms conflicts with those documents, the signed documents prevail. In summary:
      </p>
      <Bullets
        items={[
          "Service fees are as set out in the Rate Card. Employer EPF, ESIC, gratuity and other statutory costs are billed separately from the service fee.",
          <>Invoice disputes must be raised within <strong className="text-gray-900">7 days</strong> of the invoice date.</>,
          <>Late payments may attract interest at <Blank k="latePaymentInterest" />% per month.</>,
          <>Booking cancellations are charged as set out in our <Link to="/refund-policy" className={linkClass}>Refund & Cancellation Policy</Link>.</>,
          "A Client Company may not directly hire or engage a Worker deployed by ATW except as allowed by the MSA.",
          "The Client Company is responsible for a safe workplace and for following applicable safety laws at its site.",
        ]}
      />
    </Section>

    <Section title="7. Agents">
      <p>
        The Agent programme is not yet open. Registering interest on the website creates no right to
        commission or payment. When the programme opens, Agents will sign a separate agreement.
      </p>
    </Section>

    <Section title="8. What you must not do">
      <Bullets
        items={[
          "Give false information, use another person's identity, or create more than one account.",
          "Use a photo, video or mask to pass face verification, or mark attendance for someone else.",
          "Ask a Worker or Client Company for money in ATW's name.",
          "Copy, scrape, hack, overload or interfere with the Platform.",
          "Use the Platform for anything illegal, including child labour or forced labour.",
        ]}
      />
      <p>
        We may suspend or close an account that breaks these rules. Where fraud is suspected, we may
        hold payments while we investigate, and we may report the matter to the authorities.
      </p>
    </Section>

    <Section title="9. Documents and verification">
      <p>
        Documents issued through the Platform (appointment letters, ID cards, wage slips,
        certificates, invoices) carry a unique number. Anyone can check whether a document is genuine
        at anytimework.in/verify.
      </p>
    </Section>

    <Section title="10. Our content">
      <p>
        The ATW name, logo, website, apps and content belong to Anytime Global Private Limited. You
        may not use them without our written permission.
      </p>
    </Section>

    <Section title="11. Third-party services">
      <p>
        We use trusted third parties for identity checks, banking, payments, messaging and hosting.
        Their services are subject to their own terms. We are not responsible for delays caused by
        banks, government portals or other third parties outside our control.
      </p>
    </Section>

    <Section title="12. Limits of our responsibility">
      <p>
        We work to keep the Platform available and accurate, but we do not promise it will always be
        error-free or uninterrupted. To the extent allowed by law, ATW is not liable for indirect or
        consequential loss arising from use of the Platform. For Client Companies, liability is as
        set out in the MSA.
      </p>
      <p>
        Nothing in these Terms limits any Worker's rights under labour laws, including rights to
        wages and statutory benefits.
      </p>
    </Section>

    <Section title="13. Closing your account">
      <p>
        You may ask us to close your account at any time by contacting <Blank k="supportEmail" />.
        Any wallet balance due to you will be paid to your registered bank account. Some records must
        be kept even after closure, as explained in our{" "}
        <Link to="/privacy" className={linkClass}>Privacy Policy</Link>.
      </p>
    </Section>

    <Section title="14. Governing law and disputes">
      <p>
        These Terms are governed by the laws of India. Please first raise any complaint through our{" "}
        <Link to="/grievance" className={linkClass}>Grievance page</Link>; we will try to resolve it
        quickly.
      </p>
      <p>
        Disputes with Client Companies are settled by arbitration seated at Jaipur, as set out in the
        MSA. Subject to that, the courts at Jaipur, Rajasthan have jurisdiction. Workers retain all
        remedies available to them under labour laws.
      </p>
    </Section>

    <Section title="15. Changes to these Terms">
      <p>
        We may update these Terms. We will show the new date at the top and, for important changes,
        notify you in the app or by SMS/WhatsApp before they take effect.
      </p>
    </Section>

    <Section title="16. Language">
      <p>
        These Terms are available in English and other languages. If there is any difference, the
        English version applies.
      </p>
    </Section>

    <section className="bg-gray-100 p-6 md:p-8 rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Contact</h2>
      <p>
        Anytime Global Private Limited, <Blank k="registeredOffice" />
        <span className="mx-2">·</span>Email: <Blank k="supportEmail" />
        <span className="mx-2">·</span>Helpline: <Blank k="helpline" /> (<Blank k="helplineHours" /> hours)
      </p>
    </section>
  </LegalLayout>
);

export default Terms;
