import React from 'react';
import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from '@react-email/components';

const VerificationEmail: React.FC<{ username: string; tournamentName: string }> = ({ username, tournamentName }) => (
  <Html lang="en" dir="ltr">
    <Head>
      <title>Registration Confirmation</title>
      <Font
        fontFamily="Roboto"
        fallbackFontFamily="Verdana"
        webFont={{
          url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>Your registration status for the {tournamentName} tournament</Preview>
    <Section>
      <Row>
        <Heading as="h2">Hello {username},</Heading>
      </Row>
      <Row>
        <Text>
          Thank you for registering for the {tournamentName} Tournament. Please wait for our team to verify your payment and complete your registration.
        </Text>
      </Row>
      <Row>
        <Text>This process will take approximately 4-6 business hours.</Text>
      </Row>
    </Section>
  </Html>
);

export default VerificationEmail;
