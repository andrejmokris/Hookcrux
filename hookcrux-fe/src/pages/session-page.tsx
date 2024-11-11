import { SetupTutorial } from '@/components/setup-tutorial';
import { WebhookCard } from '@/components/webhook-card';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const SessionPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['session', id],
    queryFn: async () => {
      const { data } = await apiClient.get<HookSession>(`/webhook-sessions/${id}/detail`);
      return data;
    },
  });

  useEffect(() => {
    const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/webhook-sessions/${id}/events`);

    eventSource.addEventListener('hook-event', async (event) => {
      const eventData: HookEvent = JSON.parse(event.data);
      queryClient.setQueryData(['session', id], (prevData: HookSession) => ({
        ...prevData,
        HookEvent: [...prevData.HookEvent, eventData],
      }));
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
  }, [id, queryClient, toast]);

  return (
    <div className="container mx-auto px-4 space-y-8">
      <SetupTutorial id={id} />

      <div className="mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Webhook Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data ? data.HookEvent.map((event) => <WebhookCard key={event.id} {...event} />) : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};
