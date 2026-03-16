import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            tripId,
            fullName,
            phone,
            email,
            nationality,
            travelersCount,
            dateFrom,
            dateTo,
            roomType,
            budget,
            notes,
        } = body;

        if (!fullName || !phone || !email || !nationality || !travelersCount) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create booking request
        await prisma.bookingRequest.create({
            data: {
                tripId: tripId || null,
                fullName,
                phone,
                email,
                nationality,
                travelersCount: parseInt(travelersCount),
                dateFrom: dateFrom || null,
                dateTo: dateTo || null,
                roomType: roomType || null,
                budget: budget || null,
                notes: notes || null,
            },
        });

        // TODO: Send email notification to company and customer

        return NextResponse.json(
            { message: 'Booking request submitted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Booking request error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
