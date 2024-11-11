import CodeBlock from '@/components/code-block';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SessionPage = () => {
  const { id } = useParams();
  const { toast } = useToast();

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

    eventSource.onerror = () => {
      toast({
        title: 'Failed to establish connection!',
        description: 'Session may not exist, or the server may be down 😢.',
        variant: 'destructive',
      });
      eventSource.close();
    };

    // terminating the connection on component unmount
    return () => eventSource.close();
  }, [id, toast]);

  return (
    <div className="container mx-auto px-4 space-y-8">
      <div className="space-y-2">
        <p className="font-semibold text-lg">Start the CLI client to begin receiving events:</p>
        <CodeBlock command={`npx hookcrux-client ${id}`} />
      </div>

      <div className="space-y-3">
        <p className="font-semibold text-lg">Direct webhooks to:</p>
        <CodeBlock command={`https://api.mokris.fit/api/v1/webhook-sessions/${id}/send-event/*`} />
        <p>
          The endpoint supports all methods (GET, POST, PUT, DELETE, etc.).{' '}
          <span className="font-semibold">Replace the *</span> with the route that matches your backend's webhook
          endpoint configuration to properly route incoming webhook events.
        </p>
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
