import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const data = await request.json();

    const { nombre, email, telefono, empresa, mensaje, servicio } = data;

    // Validación básica
    if (!nombre || !email || !telefono || !mensaje || !servicio) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Crear transporte SMTP con variables seguras
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Crear el contenido HTML del correo
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #ff6600; text-align: center;">Nueva solicitud de información</h2>
        <p style="text-align: center;">Se ha recibido un nuevo contacto desde el sitio web de <strong>SIMET</strong>.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Servicio:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${servicio}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Nombre:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${nombre}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Correo:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Teléfono:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${telefono}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Empresa:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${empresa || "No especificada"}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Mensaje:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${mensaje}</td></tr>
        </table>
        <p style="text-align: center; color: #888; font-size: 12px; margin-top: 30px;">
          Este correo ha sido generado automáticamente desde el formulario de contacto de SIMET.
        </p>
      </div>
    `;

    // Enviar el correo
    await transporter.sendMail({
      from: `"SIMET - Notificaciones" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_RECEIVER || process.env.SMTP_USER,
      subject: `Nuevo contacto recibido - ${nombre}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return NextResponse.json(
      { success: false, message: "Error al enviar el correo", error },
      { status: 500 }
    );
  }
}
