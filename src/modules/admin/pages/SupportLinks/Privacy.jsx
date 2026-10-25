import { Link } from "react-router-dom";
import LegalLayout, { Blank, Section, Bullets, LegalTable } from "./LegalLayout";

const linkClass = "text-blue-600 hover:underline";

const PrivacyPolicy = () => (
  <LegalLayout title="Privacy Policy">
    <Section title="1. About this policy">
      <p>
        Anytime Global Private Limited ("ATW") respects your privacy. This policy explains what
        personal data we collect, why, who we share it with, how long we keep it, and your rights
        under the Digital Personal Data Protection Act, 2023 ("DPDP Act").
      </p>
      <p>
        ATW is the <strong className="text-gray-900">Data Fiduciary</strong> for personal data
        collected through anytimework.in and the ATW apps.
      </p>
    </Section>

    <Section title="2. What we collect and why">
      <LegalTable
        headers={["Data", "Whose", "Why we need it"]}
        rows={[
          ["Name, mobile number, date of birth, address, gender", "Workers, company contacts, agents", "Create your account, contact you, check age (18+)"],
          ["Aadhaar (via OTP or document), PAN", "Workers", "Verify identity; EPF and ESIC registration as required by law"],
          ["Live photo taken in the app", "Workers", "Profile and ID card; matching your face to your identity"],
          ["Face template (a mathematical code made from your face)", "Workers", "Marking attendance at the work site"],
          ["Bank account and IFSC", "Workers, agents", "Paying wages and withdrawals; we check the account is in your name"],
          ["UAN, ESIC number, nominee details", "Workers", "EPF and ESIC contributions and nomination"],
          ["Attendance times, work output, wages, deductions", "Workers", "Calculating and paying wages; wage slips; statutory filings"],
          ["Saved work location", "Workers", "Showing nearby vacancies"],
          ["Company name, GSTIN, address, billing details", "Client Companies", "Contracts, invoices, GST and TDS"],
          ["Device, IP address, app version, login times", "All users", "Security, fraud prevention, fixing problems"],
          ["Messages and complaints you send us", "All users", "Answering you and resolving issues"],
        ]}
      />
      <p>
        We collect only what we need for these purposes. We do not sell your personal data, and we do
        not use it for advertising by others.
      </p>
    </Section>

    <Section title="3. Face data">
      <p>
        Your face is used <strong className="text-gray-900">only</strong> to confirm your identity
        and record your attendance. We store a face template, not a video. Your face data is never
        shared with Client Companies or any outside party, and never used for any other purpose.
      </p>
      <p>
        We delete your face template within <Blank k="faceTemplateDeleteDays" /> days after you leave
        ATW, unless the law requires us to keep it.
      </p>
    </Section>

    <Section title="4. Consent and legal basis">
      <p>
        We process your data with your consent, which you give when you register and accept this
        policy, and where the law allows us to process it without consent — for example, to meet our
        obligations as your employer under EPF, ESIC, wage and tax laws.
      </p>
      <p>
        You may withdraw your consent at any time (see section 9). Withdrawing consent does not affect
        processing already done. If you withdraw consent for data we need to employ and pay you (such
        as identity, bank or face data), we may not be able to continue offering you work.
      </p>
    </Section>

    <Section title="5. Who we share data with">
      <LegalTable
        headers={["Recipient", "What they get", "Why"]}
        rows={[
          ["Client Company where you work", "Name, photo, designation, attendance, work output", <>Supervising your work. They <strong className="text-gray-900">do not</strong> see your Aadhaar, PAN or bank details.</>],
          ["EPFO and ESIC", "Details required by law", "Registering you and paying contributions"],
          ["Banks and payment partners", "Name, bank account, amount", "Paying wages and withdrawals"],
          ["Identity verification partners", "Aadhaar/PAN details you provide", "Checking your identity and bank account"],
          ["SMS and WhatsApp providers", "Mobile number and message", "Sending OTPs, job offers and alerts"],
          ["Cloud hosting provider", "Stored data, encrypted", "Running the Platform"],
          ["Government or courts", "As legally required", "Complying with law or a lawful order"],
        ]}
      />
      <p>
        Every partner who processes data for us is bound by a contract to use it only for our purpose
        and keep it secure. Our automated job-call voice service receives{" "}
        <strong className="text-gray-900">no personal data</strong> about you.
      </p>
    </Section>

    <Section title="6. Where your data is stored">
      <p>
        Your data is stored on secure servers located in <Blank k="dataServerLocation" />. If we ever
        need to transfer data outside India, we will do so only as permitted under the DPDP Act.
      </p>
    </Section>

    <Section title="7. How long we keep data">
      <Bullets
        items={[
          <>Account and profile data: while your account is active, and up to <Blank k="accountRetention" /> after closure.</>,
          <>Wage, attendance, EPF and ESIC records: for the period required by labour and tax laws (<Blank k="statutoryRetentionYears" /> years).</>,
          <>Face template: deleted within <Blank k="faceTemplateDeleteDays" /> days after you leave (section 3).</>,
          <>Security logs: <Blank k="securityLogMonths" /> months.</>,
        ]}
      />
      <p>After these periods, data is deleted or made anonymous.</p>
    </Section>

    <Section title="8. How we protect your data">
      <Bullets
        items={[
          "Aadhaar, PAN, UAN, ESIC and bank numbers are encrypted and shown only in masked form (for example, XXXX XXXX 1234).",
          "Staff can see only the data needed for their role, and only for their assigned area. Every access to sensitive data is logged.",
          "Logins use one-time passwords; sessions expire automatically.",
          "If a data breach affects you, we will inform you and the Data Protection Board of India as required by law.",
        ]}
      />
    </Section>

    <Section title="9. Your rights">
      <p>Under the DPDP Act, you have the right to:</p>
      <Bullets
        ordered
        items={[
          <><strong className="text-gray-900">Access</strong> — get a summary of your personal data we hold and who we have shared it with.</>,
          <><strong className="text-gray-900">Correction</strong> — ask us to correct or update inaccurate data.</>,
          <><strong className="text-gray-900">Erasure</strong> — ask us to delete data we no longer need, except records the law requires us to keep.</>,
          <><strong className="text-gray-900">Withdraw consent</strong> — at any time, as easily as you gave it.</>,
          <><strong className="text-gray-900">Grievance</strong> — complain to our Grievance Officer (section 11).</>,
          <><strong className="text-gray-900">Nominate</strong> — name someone to exercise these rights if you die or become unable to.</>,
        ]}
      />
      <p>To use any right, go to Profile → Privacy in the app, or contact our Grievance Officer.</p>
    </Section>

    <Section title="10. Children">
      <p>
        The Platform is only for people aged 18 and above. We do not knowingly register anyone under
        18. If we learn that someone under 18 has registered, we will close the account and delete the
        data, except where the law requires us to keep it.
      </p>
    </Section>

    <section className="bg-gray-100 p-6 md:p-8 rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Grievance Officer</h2>
      <p>
        Name: <Blank k="grievanceOfficerName" />
        <span className="mx-2">·</span>Designation: <Blank k="grievanceOfficerDesignation" />
      </p>
      <p>
        Email: <Blank k="grievanceOfficerEmail" />
        <span className="mx-2">·</span>Phone: <Blank k="grievanceOfficerPhone" />
      </p>
      <p className="mb-4">
        Address: Anytime Global Private Limited, <Blank k="registeredOffice" />, Jaipur, Rajasthan
      </p>
      <p>
        We will acknowledge your complaint within <Blank k="grievanceAckDays" /> days and resolve it
        within <Blank k="grievanceResolveDays" /> days. If you are not satisfied with our response,
        you may complain to the <strong className="text-gray-900">Data Protection Board of India</strong>.
      </p>
    </section>

    <Section title="12. Cookies">
      <p>
        Our website uses cookies. See our <Link to="/cookies" className={linkClass}>Cookie Policy</Link>{" "}
        for details.
      </p>
    </Section>

    <Section title="13. Changes to this policy">
      <p>
        We may update this policy. We will change the date at the top and, for important changes,
        notify you in the app or by SMS/WhatsApp.
      </p>
    </Section>

    <Section title="14. Language">
      <p>
        This policy is available in English and other languages. If there is any difference, the
        English version applies.
      </p>
    </Section>
  </LegalLayout>
);

export default PrivacyPolicy;
