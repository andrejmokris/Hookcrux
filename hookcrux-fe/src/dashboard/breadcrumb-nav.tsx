import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link, useLocation } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

export const BreadcrumbNav = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').slice(2);

  const getPathForIndex = (currentIndex: number) => {
    return (
      '/' +
      location.pathname
        .split('/')
        .slice(1, currentIndex + 3)
        .join('/')
    );
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <Link className="capitalize hover:text-primary/80 transition-colors" to={getPathForIndex(index)}>
                {item.includes('-') ? item.split('-').join(' ') : item}
              </Link>
            </BreadcrumbItem>
            {index < pathSegments.length - 1 && <BreadcrumbSeparator className="hidden md:block" />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
