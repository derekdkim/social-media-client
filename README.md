# Journey Together

Journey Together is a social media platform designed for pursuing personal development goals.
It builds on the idea of accountability buddies; you pledge your goal in public and you can choose to embark on your journey alone or with friends.
You can make updates for your current journey and discuss your progress with anyone who visits your journey page.

This project is the client-side portion of Journey Together, developed with React.js. 
It interacts with a dedicated [server API](https://github.com/derekdkim/social-media-server) to access data stored in MongoDB.

This app was developed alone for learning web development. All assets used in this project are royalty-free images or part of the FontAwesome library.

## Technologies used:

- React.js
- Tailwind.css
- react-hook-forms (validation & forms library)
- FontAwesome (free icons)
- date.fns (date formatting library)
- axios (AJAX requests library)
- Netlify (hosting)

## Usage:

Visit the [Journey Together website](https://journey-together.netlify.app/).

## Features:

This app is focused around two aspects: friends and journeys.

### Friends:

Users can add each other as friends. This works similarly to Facebook, where users are mutually friends, as opposed to "following" unidirectionally like in Twitter. Friend statuses play a key role in filtering which journeys are visible to a user.

To find a friend, users can use the search bar on the top header. Alternatively, they can click on a user who created a public journey in the Explore page. This will allow them to send a request to the user in their profile page.

### Journeys:

Journeys are projects meant to tackle specific goals, such as losing a set amount of weight or completing the 100 Days of Code challenge.

- Users can write tangible goals, the due date, as well as its description.
- Users can join journeys made by other users as to take part as a participant. This will bookmark the journey in the participating user's My Journeys page for easy access.
- Each journey will have its own "feed" of entries, meant for posting updates by its participants.
- At the end of the journey (by reaching its due date), users can consider the journey as "Complete", delete it, extend the deadline, or turn it into an "Endless Journey".
- Users can like the journey to show how they feel!

### Entries:

Entries are regular posts made inside a journey, used for posting personal progress updates and other announcements.

- Users can like entries.
- Users can edit and/or delete entries.
- Users can write comments in response to entries.

### Comments:

Comments are responses to entries. Its styling is inspired by comments on Youtube. As with entries, comments can be liked, edited, and deleted.