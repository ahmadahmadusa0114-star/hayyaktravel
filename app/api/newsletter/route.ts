import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existing = await prisma.newsletter.findUnique({
            where: { email },
        });

        if (existing) {
            return NextResponse.json(
                { error: 'Email already subscribed' },
                { status: 400 }
            );
        }

        // Create new subscription
        await prisma.newsletter.create({
            data: { email },
        });

        return NextResponse.json(
            { message: 'Successfully subscribed' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
