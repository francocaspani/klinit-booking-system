import { sendEmailService } from './users.utils';

export const getEmailHTML = (title: string, subtitle: string): string => `<html>
<head>
    <title>${title}</title>
</head>
<body>
    <h1>${title}</h1>
    <p>${subtitle}</p>
</body>
</html>`;

export const sendEmail = async (to: string, subject: string) => {
  const html = getEmailHTML(subject, 'This is a test email');
  await sendEmailService(to, subject, html);
};
