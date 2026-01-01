import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";
import { getAllEvents } from "@/lib/actions/event.actions";
import { cacheLife } from "next/cache";

const Home = async () => {
  "use cache";
  cacheLife("hours");
  const events = await getAllEvents();

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
