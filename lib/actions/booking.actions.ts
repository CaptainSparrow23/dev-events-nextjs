'use server'
import connectDB from "@/lib/mongodb";
import Booking from "@/database/booking.model";


export async function createBooking(eventId: string, slug: string, email: string) {
    try {
        await connectDB();

        return { success: true };
    }
    catch (e) {
        console.error('Create booking failed:', e);
        return { success: false };
    }
}