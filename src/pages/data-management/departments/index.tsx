import type { Department } from '~/models/department.models';
import { type ReactElement, useState } from 'react';
import { useGetAllDepartments } from '~/hooks/department.hooks';
import {
  Stack,
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Divider,
  Avatar,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';

import { InteractiveCard } from '~/components/ui/interactive-card';
import PreviewDialog from './preview-dialog';

const Departments = (): ReactElement => {
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [isOpenPreviewDialog, setIsOpenPreviewDialog] = useState(false);

  const { data: departments = [] } = useGetAllDepartments();

  const handleCardClick = (selectedDept: Department): void => {
    console.log(`Open modal details for: ${selectedDept}`);
    setSelectedDepartment(selectedDept);
    setIsOpenPreviewDialog(true);
  };

  return (
    <Stack spacing={3} sx={{ py: 2 }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: 'text.primary' }}
          >
            Departments
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and view organizational business units
          </Typography>
        </Box>
      </Stack>
      <Grid container spacing={2}>
        {((departments as Department[]) ?? []).map((department) => (
          <Grid key={department.name} size={{ xs: 12, md: 4 }}>
            <InteractiveCard
              elevation={2}
              onClick={() => handleCardClick(department)}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  sx={{ height: 130, filter: 'brightness(0.9)' }}
                  image={department.coverImageUrl}
                />
                <Chip
                  label={department.slug}
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    fontWeight: 700,
                    boxShadow: 2,
                  }}
                />
              </Box>
              <CardContent sx={{ pt: 2, pb: 1, minWidth: 0 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  {department.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    height: 40,
                    mb: 2,
                  }}
                >
                  {department.description}
                </Typography>
                <Divider sx={{ my: 1.5, borderStyle: 'dashed' }} />
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center' }}
                  >
                    <GroupsIcon color="action" />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      {department.teamMembers.length} Members
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ alignItems: 'center' }}
                  >
                    <AccountBalanceWalletIcon fontSize="small" color="action" />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        bgcolor: 'grey.100',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontWeight: 500,
                      }}
                    >
                      {department.costCenterCode}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
              <Box
                sx={{
                  p: 2,
                  pt: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {department.primaryContact ? (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center' }}
                  >
                    <Avatar
                      src={department.primaryContact?.avatarUrl || undefined}
                      sx={{
                        width: 24,
                        height: 24,
                        fontSize: '0.875rem',
                        bgcolor: department.primaryContact
                          ? 'none'
                          : 'secondary.main',
                      }}
                    >
                      {department.primaryContact?.formattedName
                        ?.charAt(0)
                        .toUpperCase() || 'U'}
                    </Avatar>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      {department.primaryContact?.formattedName}
                    </Typography>
                  </Stack>
                ) : (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center' }}
                  >
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        bgcolor: 'action.disabledBackground',
                        color: 'text.disabled',
                      }}
                    >
                      <PersonIcon sx={{ fontSize: '1rem' }} />
                    </Avatar>
                    <Typography
                      variant="body2"
                      color="text.disabled"
                      sx={{ fontWeight: 400, fontStyle: 'italic' }}
                    >
                      Unassigned
                    </Typography>
                  </Stack>
                )}

                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                  className="view-details-text"
                >
                  View Details &rarr;
                </Typography>
              </Box>
            </InteractiveCard>
          </Grid>
        ))}
      </Grid>
      <PreviewDialog
        open={isOpenPreviewDialog}
        onClose={() => setIsOpenPreviewDialog(false)}
        selectedDepartment={selectedDepartment}
      />
    </Stack>
  );
};

export default Departments;
