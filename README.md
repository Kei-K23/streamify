# Streamify (Streaming web application)

## Overview

Streamify is a streaming web app(like `Twitch`) that can connect your favorite streaming software. Provide simple communication with your viewers and other essential features that need in streaming application.

## Features

Key Features:

- Streaming using RTMP / WHIP streaming protocols
- Connecting Next.js app to OBS / Your favorite streaming software
- Authentication
- Thumbnail upload
- Live viewer count
- Live statuses
- Real-time chat using sockets
- Following system
- Blocking system
- Kicking participants from a stream in real-time
- Streamer / Creator Dashboard
- Slow chat mode
- Followers only chat mode
- Enable / Disable chat
- Collapsible layout (hide sidebars, chat etc, theatre mode etc.)
- Home page recommending streams, sorted by live first
- Search results page with a different layout
- Syncing user information to our DB using Webhooks
- Syncing live status information to our DB using Webhooks
- Community tab
- Grouped routes & layouts
- MySQL
- Deployment

## Tech Stack

- Next.js 14 (server action for data mutation)
- Postgresql (Neon cloud)
- Prisma
- Clerk (Auth)
- TypeScript
- Tailwind / ShadcnUI
- Livekit (Video streaming & WebRTC)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Postgresql database for storing application data.

### Installation

1. Clone the repository: `git clone https://github.com/Kei-K23/task-mingle`
2. Navigate to the project directory: `cd your-web-app`
3. Install dependencies: `npm install`
4. Configure environment variables.
5. Start the application locally: `npm run dev`

### Configuration

Make sure to set the following environment variables:

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
- CLERK_SECRET_KEY=<YOUR_CLERK_SECRET_KEY>

- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in<modify_as_you_need>
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up<modify_as_you_need>
- NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/<modify_as_you_need>
- NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/<modify_as_you_need>

- NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=<YOUR_UNSPLASH_ACCESS_KEY>
- NEXT_PUBLIC_UNSPLASH_SECRET_KEY=<YOUR_UNSPLASH_SECRET_KEY>

- DATABASE_URL=<YOUR_POSTGRESQL_DATABASE_CONNECTION_STRING>

- NEXT_PUBLIC_LIVEKIT_WS_URL=<YOUR_NEXT_PUBLIC_LIVEKIT_WS_URL>
- LIVEKIT_API_KEY=<YOUR_LIVEKIT_API_KEY>
- LIVEKIT_SECRET_KEY=<YOUR_LIVEKIT_SECRET_KEY>
- LIVEKIT_API_URL=<YOUR_LIVEKIT_API_URL>

- UPLOADTHING_SECRET=<YOUR_UPLOADTHING_SECRET>
- UPLOADTHING_APP_ID=<YOUR_UPLOADTHING_APP_ID>

## Contributing

We welcome contributions from the community! If you find a bug or have an idea for an improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- `Twitch` for the inspiration.
- [Build a Twitch Clone using Next.js 14, React, Prisma, Tailwind, MySQL | Full Course 2023 | Part 1/2](https://youtu.be/a02JAryRPVU?si=m83YYw9EVq2kX7gD) for the inspiration and learning.

---

Happy collaborating with streamify! 🚀
