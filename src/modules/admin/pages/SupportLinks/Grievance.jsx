import LegalLayout, { Blank, Section, Bullets, LegalTable } from "./LegalLayout";

const Grievance = () => (
  <LegalLayout title="Grievance Redressal">
    <p>
      If you have a problem with ATW, tell us. Every complaint gets a complaint number, and you will
      never be treated badly for raising one.
    </p>

    <Section title="1. What you can complain about">
      <Bullets
        items={[
          "Wages, deductions, wallet or withdrawals",
          "EPF, ESIC or other statutory benefits",
          "Attendance records",
          "Behaviour of ATW staff, or someone asking for money in ATW's name",
          "Your personal data — access, correction, deletion or misuse",
          "Invoices or services (Client Companies)",
          "Safety at the work site",
        ]}
      />
      <p>
        <strong className="text-gray-900">Sexual harassment at work</strong> is handled separately by
        our Internal Committee under the POSH Act, 2013. Contact: <Blank k="poshContact" />. Your
        complaint will be kept confidential.
      </p>
    </Section>

    <Section title="2. How to raise a complaint">
      <LegalTable
        headers={["Channel", "Details"]}
        rows={[
          ["In the app", "Help → Raise a complaint"],
          ["Phone / WhatsApp", <><Blank k="helpline" /> (<Blank k="helplineHours" /> hours, <Blank k="helplineDays" /> days)</>],
          ["Email", <Blank k="grievanceOfficerEmail" />],
          ["Letter", <>Grievance Officer, Anytime Global Private Limited, <Blank k="registeredOffice" />, Jaipur, Rajasthan</>],
          ["In person", "Your Relationship Manager (RM) at your work site"],
        ]}
      />
    </Section>

    <Section title="3. What happens next">
      <Bullets
        ordered
        items={[
          <><strong className="text-gray-900">Complaint number</strong> — sent to you by SMS/WhatsApp at once.</>,
          <><strong className="text-gray-900">Acknowledgement</strong> — within <Blank k="grievanceAckDays" /> working days, with the name of the person handling it.</>,
          <><strong className="text-gray-900">Resolution</strong> — within <Blank k="grievanceResolveDays" /> days. If it needs longer (for example, waiting for a bank or government office), we will tell you why and give a new date.</>,
          <><strong className="text-gray-900">Closure</strong> — we tell you the outcome and the reason. You can check status anytime in the app using your complaint number.</>,
        ]}
      />
    </Section>

    <Section title="4. If you are not satisfied">
      <LegalTable
        headers={["Level", "Who", "When"]}
        rows={[
          ["1", "Your RM or support team", "First contact"],
          ["2", "Grievance Officer", <>If not resolved at level 1 within <Blank k="grievanceLevel1Days" /> days, or you disagree</>],
          ["3", "Director, Anytime Global Private Limited", <>If not resolved by the Grievance Officer within <Blank k="grievanceLevel2Days" /> days</>],
        ]}
      />
      <p>You may also approach outside authorities at any time:</p>
      <Bullets
        items={[
          <><strong className="text-gray-900">Personal data:</strong> Data Protection Board of India</>,
          <><strong className="text-gray-900">EPF:</strong> EPFO grievance portal (EPFiGMS)</>,
          <><strong className="text-gray-900">ESIC:</strong> ESIC grievance portal</>,
          <><strong className="text-gray-900">Wages and labour matters:</strong> the Labour Department, Government of Rajasthan</>,
        ]}
      />
    </Section>

    <section className="bg-gray-100 p-6 md:p-8 rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Grievance Officer</h2>
      <p>
        Name: <Blank k="grievanceOfficerName" />
        <span className="mx-2">·</span>Designation: <Blank k="grievanceOfficerDesignation" />
      </p>
      <p>
        Email: <Blank k="grievanceOfficerEmail" />
        <span className="mx-2">·</span>Phone: <Blank k="grievanceOfficerPhone" />
      </p>
      <p>
        Address: Anytime Global Private Limited, <Blank k="registeredOffice" />, Jaipur, Rajasthan
      </p>
    </section>

    <Section title="6. Report fraud">
      <p>
        If someone asks you for money, an OTP or your PIN in ATW's name, report it at{" "}
        <Blank k="fraudReportContact" />. You can report without giving your name.{" "}
        <strong className="text-gray-900">ATW never asks for money, OTP or PIN.</strong>
      </p>
    </Section>
  </LegalLayout>
);

export default Grievance;
