import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Users } from 'lucide-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link to={`/dashboard/projects/${project.id}`}>
      <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-300" key={project.id}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {project._count.members} {project._count.members === 1 ? 'member' : 'members'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Created on {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Badge variant="secondary" className="mt-4">
            {project.members[0].role}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
};
