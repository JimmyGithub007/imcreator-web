import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const POST = async (req: NextRequest) => {
    const { subject, text } = await req.json();
    const transporter = nodemailer.createTransport({
        host: process.env.NEXT_PUBLIC_SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.NEXT_PUBLIC_SMTP_USER,
            pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_SMTP_USER,
            to: process.env.NEXT_PUBLIC_EMAIL,
            subject,
            text,
        });

        return NextResponse.json({ message: '邮件已发送至 Mailtrap' }, { status: 200 });
    } catch (error) {
        console.error('邮件发送失败', error);
        return NextResponse.json({ message: '邮件发送失败', error }, { status: 500 });
    }
}