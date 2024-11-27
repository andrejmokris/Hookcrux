import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  command: string;
}

export default function CodeBlock({ command }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative flex items-center bg-muted rounded-md px-2">
      <pre className="py-4 px-2 pr-4 overflow-x-auto font-mono text-sm w-[90%] no-scrollbar">{command}</pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        onClick={copyToClipboard}
      >
        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="sr-only">{isCopied ? 'Copied' : 'Copy to clipboard'}</span>
      </Button>
    </div>
  );
}
