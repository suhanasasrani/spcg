import nodemailer from "nodemailer"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, company, email, purpose } = await request.json()

    if (!name || !company || !email || !purpose) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (!process.env.EMAIL_SPCG || !process.env.EMAIL_PASSWORD) {
      console.error("[v0] Missing email credentials in environment variables")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SPCG,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_SPCG,
      to: process.env.EMAIL_SPCG,
      replyTo: email,
      subject: `New Contact from ${name}`,
      text: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\n\nPurpose:\n${purpose}`,
    })

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to send email. Please check your email configuration and try again."
    console.error("[v0] Email error:", errorMessage)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
