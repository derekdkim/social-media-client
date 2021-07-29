# Journey Together

Journey Together is a social media platform designed for pursuing personal development goals.
It builds on the idea of accountability buddies; you pledge your goal in public and you can choose to embark on your journey alone or with friends.
You can make updates for your current journey and discuss your progress with anyone who visits your journey page.

This project is the client-side portion of Journey Together, developed with React.js. 
It interacts with a dedicated [server API](https://github.com/derekdkim/social-media-server) to access data stored in MongoDB.

## Features:

### Friends:

Users can add each other as friends. This works similarly to Facebook, where users are mutually friends, as opposed to "following" one-way.

### Journeys:

Journeys are projects meant to tackle specific goals, such as losing a set amount of weight or completing the 100 Days of Code challenge.

- Users can write tangible goals, the due date, as well as its description.
- Creators of the journey can invite other users to participate.
- Each journey will have its own "feed" of entries, meant for updates by its participants.
- At the end of the journey (by reaching its due date), users can set the journey as "Complete", delete it, or extend the deadline.

### Entries:

Entries are regular posts made inside a journey, used for posting personal progress updates and other announcements.

- Users can like entries.
- Users can edit and/or delete entries.
- Users can write comments in response to entries.

### Comments:

Comments are responses to entries. Its styling is inspired by comments on Youtube.