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

interface VerificationEmailProps {
  username: string;
  tournamentName: string;
  team: string;
}

const VerificationEmail: React.FC<VerificationEmailProps> = ({
  username,
  tournamentName,
  team,
}) => (
  <Html lang="en" dir="ltr">
    <Head>
      <title>Registration Successful</title>
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
    <Preview>Your registration is successful for the {tournamentName} tournament</Preview>
    <Section>
      <Row>
        <Heading as="h2">Hello {username},</Heading>
      </Row>
      <Row>
        <Text>
          Thank you for registering for the <strong>{tournamentName}</strong> tournament. 
          Your team, <strong>{team}</strong>, has been successfully registered. 
          You will receive an email with further instructions shortly.
        </Text>
      </Row>
      <Row>
        <Text>
          Please wait for the Room ID and password, which will be provided 15 minutes before the tournament starts.
        </Text>
      </Row>
      <Row>
        <Text>
          Best regards,<br />
          Team Scrims Crown
        </Text>
      </Row>
    </Section>
  </Html>
);

export default VerificationEmail;
