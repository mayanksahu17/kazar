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
  Container,
  Button,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  roomId: string;
  roomPass: string;
  tournament: string;
  slot: string;
}

const VerificationEmail: React.FC<VerificationEmailProps> = ({
  username,
  roomId,
  roomPass,
  tournament,
  slot,
}) => (
  <Html lang="en" dir="ltr">
    <Head>
      <title>{`Welcome to the ${tournament} Tournament`}</title>
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
    <Preview>Your Room ID and Password for the {tournament} Tournament</Preview>
    <Container style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px', fontFamily: 'Roboto, Verdana, sans-serif' }}>
      <Section>
        <Heading as="h1" style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>Hello, {username}!</Heading>
        <Text style={{ fontSize: '16px', color: '#555', lineHeight: '1.5', marginBottom: '20px' }}>
          Thank you for registering for the <strong>{tournament}</strong> tournament. We are excited to have you compete!
        </Text>
        <Text style={{ fontSize: '16px', color: '#555', lineHeight: '1.5', marginBottom: '20px' }}>
          Below are your tournament details:
        </Text>
        <Text style={{ fontSize: '16px', color: '#333', lineHeight: '1.5', marginBottom: '10px' }}>
          <strong>Team Slot:</strong> {slot}<br />
          <strong>Room ID:</strong> {roomId}<br />
          <strong>Password:</strong> {roomPass}
        </Text>
        <Text style={{ fontSize: '16px', color: '#555', lineHeight: '1.5', marginBottom: '20px' }}>
          Please keep this information confidential. The match will start in 15 minutes, so be prepared to join the room on time.
        </Text>
        <Button href="#" style={{ display: 'block', width: '200px', padding: '10px', backgroundColor: '#ff6600', color: '#fff', textAlign: 'center', borderRadius: '4px', textDecoration: 'none', margin: '20px auto 0' }}>
          Join the Room
        </Button>
        <Text style={{ fontSize: '16px', color: '#555', lineHeight: '1.5', marginTop: '40px', textAlign: 'center' }}>
          Best regards,<br />
          <strong>Team Scrims Crown</strong>
        </Text>
      </Section>
    </Container>
  </Html>
);

export default VerificationEmail;
