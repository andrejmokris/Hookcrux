# Hookcrux

Hookcrux is a webhook monitoring and forwarding tool that consists of a server and a client component.

## Features

- **Webhook Forwarding**: The client component can subscribe to the server's webhook event stream and forward the events to a specified URL.
- **Real-time Updates**: The server uses Server-Sent Events (SSE) to push updates to the client in real-time.
- **Session Management**: Each client is associated with a unique session ID, allowing for per-client event monitoring and forwarding.

## Architecture

Hookcrux is composed of two main components:

1. **Server**:

- Listens for webhook events and stores them.
- Exposes an API for clients to subscribe to the event stream.
- Utilizes Server-Sent Events (SSE) to push updates to clients in real-time.
- Manages client sessions and their associated event streams.

2. **Client**:

- Connects to the server's event stream using the session ID.
- Receives webhook events in real-time and forwards them to a specified URL.
- Handles connection errors and retries.
- Provides a command-line interface (CLI) for easy usage.

## Getting Started

### Server Setup

1. Clone the repository: `git clone https://github.com/andrejmokris/Hookcrux`
2. Navigate to the server directory: `cd Hookcrux/server`
3. Prepare the environment: `cp .env.example .env`
4. Start the service: `docker compose up -d --build`

The server will start running on `http://localhost:3000` by default.

### Client Setup

1. Navigate to the client directory: `cd hookcrux/client`
2. Install dependencies: `npm install`
3. Run the client:

```bash
npm run dev -- <session-id> --forward <url> --server <server-url>
```

Replace `<url>` with the URL to forward webhook events to, and `<server-url>` with the URL of the Hookcrux server.

- `<session-id>`: The unique session ID to monitor.
- `--forward <url>`: (optional) The URL to forward webhook events to.
- `--server <url>`: (optional) The URL of the Hookcrux server.
