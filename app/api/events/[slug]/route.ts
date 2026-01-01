import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { IEvent } from "@/database/event.model";
import Event from "@/database/event.model";

type RouteParams = {
    params: Promise<{ slug: string }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        await connectDB();
        const { slug } = await params;

        if (!slug || typeof slug !== 'string' || slug.trim() === '') {
            return NextResponse.json({ message: "Invalid or missing slug parameter" }, { status: 400 });
        }

        const sanitizedSlug = slug.trim().toLowerCase();

        const event: IEvent | null = await Event.findOne({ slug: sanitizedSlug });

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Event fetched successfully", event }, { status: 200 });



    }
}