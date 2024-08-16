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
  title: string;
 username : string;
}

const VerificationEmail: React.FC<VerificationEmailProps> = ({
 
  title,
  username ,
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
    <Preview>Your creation is successful for the {title} tournament</Preview>
    <Section>
      <Row>
        <Heading as="h2">Hello {username},</Heading>
      </Row>
      <Row>
        <Text>
          Thank you for creation for the <strong>{title}</strong> tournament.
          You will receive an email with further instructions shortly.
        </Text>
      </Row>
      <Row>
        <Text>
          Please Provide the Room ID and password, which will be provided to the joined teams 15 minutes before the tournament starts.
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
