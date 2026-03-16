import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    } : undefined,
});

const isEmailConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

export async function sendBookingConfirmation(data: {
    email: string;
    fullName: string;
    tripName?: string;
    requestId: string;
    locale: string;
}) {
    const subject = data.locale === 'ar'
        ? 'تأكيد طلب الحجز - حياك للسياحة والسفر'
        : 'Booking Request Confirmation - HAYYAK Travel & Tourism';

    const html = data.locale === 'ar' ? `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head><meta charset="UTF-8"></head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">حياك للسياحة والسفر</h1>
        <p style="margin: 10px 0 0; font-size: 16px;">HAYYAK Travel & Tourism</p>
      </div>
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #0369a1; margin-top: 0;">عزيزي/عزيزتي ${data.fullName}</h2>
        <p>شكراً لك على تواصلك معنا! تم استلام طلب الحجز الخاص بك بنجاح.</p>
        ${data.tripName ? `<p><strong>الرحلة:</strong> ${data.tripName}</p>` : ''}
        <p><strong>رقم الطلب:</strong> ${data.requestId}</p>
        <p>سيقوم فريقنا بمراجعة طلبك والتواصل معك في أقرب وقت ممكن.</p>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-right: 4px solid #0ea5e9;">
          <h3 style="margin-top: 0; color: #0369a1;">معلومات التواصل</h3>
          <p style="margin: 5px 0;"><strong>الهاتف:</strong> ${process.env.COMPANY_PHONE}</p>
          <p style="margin: 5px 0;"><strong>البريد الإلكتروني:</strong> ${process.env.COMPANY_EMAIL}</p>
          <p style="margin: 5px 0;"><strong>واتساب:</strong> ${process.env.WHATSAPP_NUMBER}</p>
        </div>
        <p style="color: #666; font-size: 14px; margin-top: 30px;">مع تحيات فريق حياك للسياحة والسفر</p>
      </div>
    </body>
    </html>
  ` : `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"></head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">HAYYAK Travel & Tourism</h1>
        <p style="margin: 10px 0 0; font-size: 16px;">حياك للسياحة والسفر</p>
      </div>
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #0369a1; margin-top: 0;">Dear ${data.fullName}</h2>
        <p>Thank you for contacting us! Your booking request has been received successfully.</p>
        ${data.tripName ? `<p><strong>Trip:</strong> ${data.tripName}</p>` : ''}
        <p><strong>Request ID:</strong> ${data.requestId}</p>
        <p>Our team will review your request and contact you as soon as possible.</p>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
          <h3 style="margin-top: 0; color: #0369a1;">Contact Information</h3>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${process.env.COMPANY_PHONE}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${process.env.COMPANY_EMAIL}</p>
          <p style="margin: 5px 0;"><strong>WhatsApp:</strong> ${process.env.WHATSAPP_NUMBER}</p>
        </div>
        <p style="color: #666; font-size: 14px; margin-top: 30px;">Best regards,<br>HAYYAK Travel & Tourism Team</p>
      </div>
    </body>
    </html>
  `;

    const mailOptions = {
        from: process.env.SMTP_USER || process.env.COMPANY_EMAIL,
        to: data.email,
        subject,
        html,
    };

    if (isEmailConfigured) {
        try {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Booking confirmation email sent to ${data.email}`);
        } catch (error) {
            console.error('❌ Error sending email:', error);
            console.log('📧 Email content (fallback):', { to: data.email, subject, html });
        }
    } else {
        console.log('📧 Email not configured. Email content:', { to: data.email, subject, html });
    }
}

export async function sendBookingNotificationToCompany(data: {
    requestId: string;
    fullName: string;
    email: string;
    phone: string;
    tripName?: string;
    travelersCount: number;
    dateFrom?: string;
    dateTo?: string;
    notes?: string;
}) {
    const subject = `New Booking Request - ${data.requestId}`;

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"></head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #0369a1; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">New Booking Request</h1>
      </div>
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #0369a1; margin-top: 0;">Request Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Request ID:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.requestId}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Full Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.fullName}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.email}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.phone}</td></tr>
          ${data.tripName ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Trip:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.tripName}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Travelers:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.travelersCount}</td></tr>
          ${data.dateFrom ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>From:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.dateFrom}</td></tr>` : ''}
          ${data.dateTo ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>To:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.dateTo}</td></tr>` : ''}
          ${data.notes ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Notes:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.notes}</td></tr>` : ''}
        </table>
        <p style="margin-top: 20px; color: #666;">Please review and respond to this request promptly.</p>
      </div>
    </body>
    </html>
  `;

    const mailOptions = {
        from: process.env.SMTP_USER || process.env.COMPANY_EMAIL,
        to: process.env.COMPANY_EMAIL,
        subject,
        html,
    };

    if (isEmailConfigured) {
        try {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Booking notification sent to company`);
        } catch (error) {
            console.error('❌ Error sending email:', error);
            console.log('📧 Email content (fallback):', { to: process.env.COMPANY_EMAIL, subject, html });
        }
    } else {
        console.log('📧 Email not configured. Email content:', { to: process.env.COMPANY_EMAIL, subject, html });
    }
}

export async function sendContactFormNotification(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}) {
    const mailSubject = `Contact Form: ${data.subject}`;

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"></head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #0369a1; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
      </div>
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.email}</td></tr>
          ${data.phone ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.phone}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Subject:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.subject}</td></tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #0ea5e9;">
          <h3 style="margin-top: 0; color: #0369a1;">Message:</h3>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>
    </body>
    </html>
  `;

    const mailOptions = {
        from: process.env.SMTP_USER || process.env.COMPANY_EMAIL,
        to: process.env.COMPANY_EMAIL,
        replyTo: data.email,
        subject: mailSubject,
        html,
    };

    if (isEmailConfigured) {
        try {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Contact form notification sent to company`);
        } catch (error) {
            console.error('❌ Error sending email:', error);
            console.log('📧 Email content (fallback):', { to: process.env.COMPANY_EMAIL, subject: mailSubject, html });
        }
    } else {
        console.log('📧 Email not configured. Email content:', { to: process.env.COMPANY_EMAIL, subject: mailSubject, html });
    }
}
