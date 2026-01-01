import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Home = async () => {
  "use cache";
  cacheLife("hours");
  const response = await fetch(`${BASE_URL}/api/events`);

  if (!response.ok) {
    const raw = await response.text();
    throw new Error(
      `GET /api/events failed: ${response.status} ${raw.slice(0, 200)}`
    );
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const raw = await response.text();
    throw new Error(
      `Expected JSON, got ${contentType}. Body: ${raw.slice(0, 200)}`
    );
  }

  const { events } = await response.json();

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Must Not Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, Conferences, All in One Place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events list-none">
          {events?.length ? (
            events.map((event: IEvent) => (
              <li key={event._id.toString() || event.slug}>
                <EventCard {...event} />
              </li>
            ))
          ) : (
            <li>No events found</li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Home;
