import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Función para enviar correo de verificación
export const sendVerificationEmail = async (email, token, name) => {
  if (!token) {
    console.error("No se generó token de verificación para:", email);
    return;
  }

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  try {
    await transporter.sendMail({
      from: `"JP.BIM" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verifica tu cuenta - JP.BIM',
      html: `
        <h2>¡Hola ${name}!</h2>
        <p>Gracias por registrarte en JP.BIM.</p>
        <p>Para activar tu cuenta, haz clic en el siguiente botón:</p>
        <a href="${verificationUrl}" 
           style="display: inline-block; padding: 14px 28px; background-color: #0066ff; color: white; text-decoration: none; border-radius: 6px; margin: 15px 0;">
          Verificar mi cuenta
        </a>
        <p>Este enlace expirará en 24 horas.</p>
        <p style="color: #666; font-size: 14px;">Si no fuiste tú quien se registró, ignora este correo.</p>
      `
    });
    console.log(`Correo de verificación enviado a: ${email}`);
  } catch (error) {
    console.error('Error enviando email de verificación:', error);
  }
};

// Función de bienvenida
export const sendWelcomeEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: `"JP.BIM" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '¡Bienvenido a JP.BIM!',
      html: `
        <h2>¡Bienvenido ${name}!</h2>
        <p>Tu cuenta ha sido verificada correctamente.</p>
        <p>Ya puedes iniciar sesión en nuestra plataforma.</p>
      `
    });
  } catch (error) {
    console.error('Error enviando email de bienvenida:', error);
  }
};

// fUNCION DE RECUPERAR CONTRASEÑA
export const sendResetEmail = async (email, name, resetUrl) => {
  await transporter.sendMail({
    from: `"JP.BIM" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Recupera tu contraseña — JP.BIM',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316;">Recuperar contraseña</h2>
        <p>Hola <strong>${name}</strong>,</p>
        <p>Recibimos una solicitud para restablecer tu contraseña.</p>
        <p>Haz clic en el botón para continuar. El enlace expira en <strong>1 hora</strong>.</p>
        <a href="${resetUrl}" 
           style="display:inline-block; background:#f97316; color:white; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:bold; margin: 16px 0;">
          Restablecer contraseña
        </a>
        <p style="color: #666; font-size: 14px;">Si no solicitaste esto, ignora este correo.</p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <p style="color: #999; font-size: 12px;">JP.BIM Platform</p>
      </div>
    `
  })
}