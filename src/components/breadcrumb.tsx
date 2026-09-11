import type { ReactElement } from 'react';
import { Link, useMatches } from 'react-router-dom';
import { styled, Breadcrumbs, Divider, Stack, Typography } from '@mui/material';

const CustomLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
  fontWeight: 500,
}));

interface BreadcrumbSegment {
  label: string;
  path: string | null;
}

interface RouteMatch {
  pathname: string;
  params: any;
  handle?: {
    breadcrumb?: BreadcrumbSegment[] | ((params: any) => BreadcrumbSegment[]);
  };
}

const Breadcrumb = (): ReactElement => {
  const matches = useMatches() as RouteMatch[];

  // Find the deepest matching route that actually defined a breadcrumb handle
  const activeMatch = [...matches]
    .reverse()
    .find((m) => Boolean(m.handle?.breadcrumb));

  if (!activeMatch || !activeMatch.handle?.breadcrumb) {
    return <></>;
  }

  const { breadcrumb } = activeMatch.handle;

  // Resolve array if it is a dynamic function
  const segments: BreadcrumbSegment[] =
    typeof breadcrumb === 'function'
      ? breadcrumb(activeMatch.params)
      : breadcrumb;

  return (
    <Stack sx={{ gap: 1 }}>
      <Breadcrumbs aria-label="breadcrumb">
        {/* Always start with Dashboard */}
        <CustomLink to="/">Dashboard</CustomLink>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          // If it's the active page or has no link path, render raw text
          if (isLast || !segment.path) {
            return (
              <Typography
                key={`${segment.label}-${index}`}
                sx={{
                  color: isLast ? 'text.primary' : 'text.secondary',
                  fontWeight: 500,
                }}
              >
                {segment.label}
              </Typography>
            );
          }

          // Otherwise, render a working, active link!
          return (
            <CustomLink key={`${segment.path}-${index}`} to={segment.path}>
              {segment.label}
            </CustomLink>
          );
        })}
      </Breadcrumbs>
      <Divider />
    </Stack>
  );
};

export default Breadcrumb;
