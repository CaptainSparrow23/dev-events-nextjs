'use server'
import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";

export async function getAllEvents() {
    try {
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

export async function getEventBySlug(slug: string) {
    try {
        await connectDB();
        const event = await Event.findOne({ slug }).lean();
        return event ? JSON.parse(JSON.stringify(event)) : null;
    } catch (error) {
        console.error("Error fetching event:", error);
        return null;
    }
}

export async function getSimilarEventsBySlug(slug: string) {
    try {
        await connectDB();
        const event = await Event.findOne({ slug });
        if (!event) return [];
        const similar = await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();
        return JSON.parse(JSON.stringify(similar));
    } catch (error) {
        console.error("Error fetching similar events:", error);
        return [];
    }
}