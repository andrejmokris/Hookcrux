# Hookcrux

Hookcrux is a webhook monitoring and forwarding tool that consists of a server and a client component.

## Features

- **Webhook Forwarding**: The client component can subscribe to the server's webhook event stream and forward the events to a specified URL.
- **Real-time Updates**: The server uses Server-Sent Events (SSE) to push updates to the client in real-time.
- **Session Management**: Each client is associated with a unique session ID, allowing for per-client event monitoring and forwarding.

## **Client**:

- Connects to the server's event stream using the session ID.
- Receives webhook events in real-time and forwards them to a specified URL.
- Handles connection errors and retries.
- Provides a command-line interface (CLI) for easy usage.

### Client Setup

```bash
npx hookcrux-client <session-id> --forward <url>
```

- `<session-id>`: The unique session ID to monitor.
- `--forward <url>`: (optional) The URL to forward webhook events to. If omitted, events will be logged to the console.
