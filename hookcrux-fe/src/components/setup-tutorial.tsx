import { ChevronDown } from 'lucide-react';
import { FC, useState } from 'react';
import CodeBlock from './code-block';
import { Button } from './ui/button';

interface SetupTutorialProps {
  id?: string;
}

export const SetupTutorial: FC<SetupTutorialProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <div className="w-full mx-auto">
      <Button
        variant="ghost"
        onClick={toggleOpen}
        className="w-full flex justify-between items-center p-4"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold">Setup Tutorial</span>
        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </Button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <p className="font-semibold text-lg">Start the CLI client to begin receiving events:</p>
            <CodeBlock command={`npx hookcrux-client ${id}`} />
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-lg">Direct webhooks to:</p>
            <CodeBlock command={`${import.meta.env.VITE_API_URL}/api/v1/webhook-sessions/${id}/send-event/*`} />
            <p>
              The endpoint supports all methods (GET, POST, PUT, DELETE, etc.).{' '}
              <span className="font-semibold">Replace the *</span> with the route that matches your backend's webhook
              endpoint configuration to properly route incoming webhook events.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
