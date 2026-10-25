import { Link } from "react-router-dom";
import LegalLayout, { Blank, Section, Bullets, LegalTable } from "./LegalLayout";

const linkClass = "text-blue-600 hover:underline";

const RefundPolicy = () => (
  <LegalLayout title="Refund & Cancellation Policy">
    <Section title="1. Workers never pay ATW">
      <p>
        ATW does not charge Workers any fee for registering, applying or getting work. If anyone asks
        you for money in ATW's name, do not pay, and report it to <Blank k="fraudReportContact" />.
      </p>
      <p>
        The only charge a Worker may see is an optional withdrawal fee, explained in section 4. It is
        always shown before you confirm.
      </p>
    </Section>

    <Section title="2. Cancellation by Client Companies">
      <p>
        When a Client Company cancels a confirmed booking of Workers, a cancellation charge applies,
        depending on how much notice is given before the shift starts:
      </p>
      <LegalTable
        headers={["Notice before shift start", "Cancellation charge"]}
        rows={[
          ["More than 24 hours", "No charge"],
          ["12 to 24 hours", <><Blank k="cancellationCharge12to24" />% of the booked day's wages for each cancelled Worker</>],
          ["Less than 12 hours, or after Workers have reported", <><Blank k="cancellationChargeUnder12" />% of the booked day's wages for each cancelled Worker</>],
        ]}
      />
      <p>
        Cancellation charges are added to the next invoice. Part of the charge may be paid to the
        affected Workers, as set out in the Rate Card. Rates in the signed Rate Card prevail over this
        table.
      </p>
    </Section>

    <Section title="3. Client invoices, disputes and refunds">
      <Bullets
        items={[
          <>Any dispute about an invoice must be raised within <strong className="text-gray-900">7 days</strong> of the invoice date, through the company portal or by email to <Blank k="supportEmail" />.</>,
          "Undisputed amounts must be paid by the due date.",
          <>If a dispute is upheld, we issue a credit note. The credit is adjusted against the next invoice, or refunded to the Company's bank account within <Blank k="refundDays" /> working days if the Company asks or the relationship has ended.</>,
          <>If a Company pays more than the amount due, the excess is adjusted against the next invoice or refunded within <Blank k="refundDays" /> working days on request.</>,
          "Refunds are made only to the bank account from which the payment was received.",
          <>Late payments may attract interest at <Blank k="latePaymentInterest" />% per month, as set out in the MSA.</>,
        ]}
      />
    </Section>

    <Section title="4. Worker wallet withdrawals">
      <Bullets
        items={[
          "Withdrawals go only to your registered primary bank account in your own name.",
          <>You can withdraw up to <Blank k="withdrawalsPerDay" /> time(s) per day.</>,
          <>A withdrawal fee of ₹<Blank k="withdrawalFee" /> may apply. The exact fee is shown before you confirm.</>,
          <>If a transfer fails (for example, because the bank rejects it), the full amount <strong className="text-gray-900">and any fee</strong> go back to your wallet automatically within <Blank k="failedTransferDays" /> working days.</>,
          "Once a transfer has reached your bank account successfully, it cannot be reversed.",
          "If wages are credited by mistake (for example, wrong attendance), the excess is adjusted from your future earnings, and you will be told the reason. Deductions will always follow wage laws.",
        ]}
      />
    </Section>

    <Section title="5. Statutory amounts">
      <p>
        EPF, ESIC and other statutory contributions deposited with the government cannot be refunded
        by ATW. Any correction is made through the relevant government process.
      </p>
    </Section>

    <section className="bg-gray-100 p-6 md:p-8 rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">6. How to ask for a refund</h2>
      <p>
        Email <Blank k="supportEmail" /> or use Help in the app with your invoice number or
        transaction ID. We will reply within <Blank k="refundReplyDays" /> working days. If you are
        not satisfied, use our <Link to="/grievance" className={linkClass}>Grievance page</Link>.
      </p>
    </section>

    <Section title="7. Language">
      <p>
        If there is any difference between language versions of this policy, the English version
        applies.
      </p>
    </Section>
  </LegalLayout>
);

export default RefundPolicy;
