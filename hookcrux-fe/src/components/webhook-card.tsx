import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { AlertCircle, Clock, CreditCard, Github, Globe, Send, User } from 'lucide-react';
import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Separator } from './ui/separator';

export const WebhookCard: FC<HookEvent> = (props) => {
  const getSourceName = (hostname: string) => {
    switch (hostname) {
      case 'github.com':
        return 'GitHub';
      case 'stripe.com':
        return 'Stripe';
      case 'localhost':
        return 'Local';
      default:
        return hostname;
    }
  };

  const getHostIcon = (hostname: string) => {
    switch (hostname) {
      case 'github.com':
        return <Github className="h-4 w-4" aria-label="GitHub" />;
      case 'stripe.com':
        return <CreditCard className="h-4 w-4" aria-label="Stripe" />;
      case 'localhost':
        return <AlertCircle className="h-4 w-4" aria-label="Local Development" />;
      default:
        return <Globe className="h-4 w-4" aria-label="External Source" />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="bg-background text-foreground dark:bg-gray-800 dark:text-gray-100 shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <CardTitle className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold truncate" title={props.path}>
                  {props.path}
                </span>
                <Badge
                  variant="outline"
                  className="text-sm font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-gray-100"
                >
                  {props.method}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                {getHostIcon(props.hostname)}
                <span>{getSourceName(props.hostname)}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{format(props.createdAt, 'yyyy-MM-dd HH:mm:ss')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Send className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm truncate" title={props.hostname}>
                {props.hostname}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm truncate" title={props.headers['user-agent']}>
                {props.headers['user-agent']?.length > 40
                  ? props.headers['user-agent'].slice(0, 40) + '...'
                  : props.headers['user-agent']}
              </span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[625px] lg:max-w-[925px] xl:max-w-[1125px] bg-background dark:bg-gray-800">
        <DialogHeader>
          <div className="flex items-center gap-x-6">
            <span className="text-xl font-bold truncate" title={props.path}>
              {props.path}
            </span>
            <Badge
              variant="outline"
              className="text-sm font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-gray-100"
            >
              {props.method}
            </Badge>
          </div>
        </DialogHeader>
        <Separator className="bg-gray-100" />
        <Tabs defaultValue="body" className="w-full">
          <TabsList>
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="query">Query</TabsTrigger>
          </TabsList>
          <TabsContent value="body">
            <div className="flex flex-col gap-y-2">
              <p className="font-semibold text-lg">Request body:</p>
              <SyntaxHighlighter
                language="json"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '6px',
                  minHeight: '120px',
                }}
              >
                {JSON.stringify(props.body, null, 2)}
              </SyntaxHighlighter>
            </div>
          </TabsContent>
          <TabsContent value="headers">
            <div className="flex flex-col gap-y-2">
              <p className="font-semibold text-lg">Request headers:</p>
              <SyntaxHighlighter
                language="json"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '6px',
                  minHeight: '120px',
                }}
              >
                {JSON.stringify(props.headers, null, 2)}
              </SyntaxHighlighter>
            </div>
          </TabsContent>
          <TabsContent value="query">
            <div className="flex flex-col gap-y-2">
              <p className="font-semibold text-lg">Request query params:</p>
              <SyntaxHighlighter
                language="json"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '6px',
                  minHeight: '120px',
                }}
              >
                {JSON.stringify(props.query, null, 2)}
              </SyntaxHighlighter>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
