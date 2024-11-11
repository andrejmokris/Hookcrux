import CodeBlock from '@/components/code-block';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SessionPage = () => {
  const { id } = useParams();
  const [hookEvents, setHookEvents] = useState<HookEvent[]>([]);

  useEffect(() => {
    // opening a connection to the server to begin receiving events from it
    const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/webhook-sessions/${id}/events`);

    eventSource.addEventListener('hook-event', async (event) => {
      const data: HookEvent = JSON.parse(event.data);
      console.log('Event received:', data);
      setHookEvents((prevEvents) => [...prevEvents, data]);
    });

    eventSource.onopen = () => {
      console.log('Connection opened');
    };

    eventSource.onerror = (error) => {
      console.error('Error:', error);
    };

    // terminating the connection on component unmount
    return () => eventSource.close();
  }, [id]);

  return (
    <div className="container mx-auto px-4 space-y-8">
      <div className="space-y-2">
        <p className="font-semibold text-lg">Start the CLI client to begin receiving events:</p>
        <CodeBlock command={`npx hookcrux-client ${id}`} />
      </div>

      <div className="space-y-2">
        <p className="font-semibold text-lg">Session events:</p>
        <div className="flex flex-col gap-4">
          {hookEvents.map((event, i) => (
            <p key={i}>{JSON.stringify(event)}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
