import { Link } from "react-router-dom";
import LegalLayout, { Blank, Section, Bullets, LegalTable } from "./LegalLayout";

const linkClass = "text-blue-600 hover:underline";

const CookiePolicy = () => (
  <LegalLayout title="Cookie Policy">
    <Section title="1. What cookies are">
      <p>
        Cookies are small text files that a website stores in your browser. They help the website
        remember you and work properly. This policy explains which cookies anytimework.in uses. It
        does not apply to the ATW mobile apps, which are covered by our{" "}
        <Link to="/privacy" className={linkClass}>Privacy Policy</Link>.
      </p>
    </Section>

    <Section title="2. Cookies we use">
      <LegalTable
        headers={["Type", "What it does", "Can you turn it off?"]}
        rows={[
          ["Essential", "Keeps you signed in, remembers your language, protects forms from misuse", "No — the website will not work without them"],
          ["Analytics", <>Counts visits and shows which pages are used, so we can improve the site. Uses <Blank k="analyticsTool" /></>, "Yes — off until you allow it"],
        ]}
      />
      <p>
        We do <strong className="text-gray-900">not</strong> use advertising or tracking cookies, and
        we do not let other companies place cookies on our website for advertising.
      </p>
    </Section>

    <Section title="3. Your choice">
      <p>
        When you first visit, a banner asks whether you allow analytics cookies. Analytics cookies are
        not set until you click <strong className="text-gray-900">Allow</strong>. You can change your
        choice any time using the "Cookie settings" link at the bottom of every page.
      </p>
      <p>
        You can also block or delete cookies in your browser settings. If you block essential cookies,
        some parts of the website (such as login) may not work.
      </p>
    </Section>

    <Section title="4. How long cookies last">
      <Bullets
        items={[
          <>Sign-in cookies: until you sign out, or for <Blank k="signInCookieHours" /> hours of no activity.</>,
          <>Language preference: <Blank k="languageCookieMonths" /> months.</>,
          <>Analytics cookies: up to <Blank k="analyticsCookieMonths" /> months.</>,
        ]}
      />
    </Section>

    <Section title="5. Changes and contact">
      <p>
        If we start using new kinds of cookies, we will update this policy and ask for your choice
        again. Questions: <Blank k="supportEmail" />.
      </p>
    </Section>
  </LegalLayout>
);

export default CookiePolicy;
