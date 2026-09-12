import type { UserModel } from '~/models/user.models';
import { type ReactElement, useEffect, useState } from 'react';
import { useAuth } from '~/contexts/auth.context';
import { mockClient } from '~/api/client';
import {
  styled,
  Drawer,
  type DrawerProps,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper,
  Typography,
  ListItemButton as MuiListItemButton,
  type ListItemButtonProps as MuiListItemButtonProps,
  Toolbar,
  Badge,
  Box,
  Tooltip,
  type Theme,
  type CSSObject,
} from '@mui/material';

import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import type { RawPosition } from '~/models/position.models';

interface UserDirectoryProps {
  isOpen: boolean;
  onSelectUser: (user: UserModel) => void;
  activeRecipientId?: string;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: theme.custom.drawer.chatDirectory.width.open,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: theme.custom.drawer.chatDirectory.width.close,
  overflowX: 'hidden',
  right: 0,
  left: 'auto',
});

const ListItemButton = styled(MuiListItemButton, {
  shouldForwardProp: (prop) => prop != 'open',
})<MuiListItemButtonProps & { open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  minHeight: 68,
  justifyContent: open ? 'initial' : 'center',
}));

const UserDirectoryDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop != 'open',
})<DrawerProps>(({ theme, open }) => ({
  display: 'flex',
  width: theme.custom.drawer.chatDirectory.width.open,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const UserDirectory = ({
  isOpen,
  onSelectUser,
  activeRecipientId,
}: UserDirectoryProps): ReactElement => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<
    Array<UserModel & { position: RawPosition | null }>
  >([]);
  const [onlineIds, setOnlineIds] = useState<string[]>([]);

  const chatBubbleElement = (
    <ChatBubbleIcon
      sx={{
        fontSize: 18,
        color: 'text.secondary',
        width: isOpen ? 'auto' : '100%',
      }}
    />
  );

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const [usersRes, positionsRes] = await Promise.all([
          mockClient.get<UserModel[]>('/users'),
          mockClient.get<RawPosition[]>('/positions'),
        ]);

        const rawUsers = usersRes.data;
        const rawPositions = positionsRes.data;

        const positionsMap = new Map(rawPositions.map((pos) => [pos.id, pos]));

        const joinedUsers = rawUsers
          .filter((u) => u.id !== currentUser?.id)
          .map((user) => ({
            ...user,
            position: user.positionId
              ? positionsMap.get(user.positionId) || null
              : null,
          }));

        setUsers(joinedUsers);
      } catch (error) {
        console.error('Failed to load user directory:', error);
      }
    };
    fetchUsers();
  }, [currentUser]);

  useEffect(() => {
    // 1. Establish native connection to your server.js (:8080)
    const ws = new WebSocket('ws://localhost:4000');

    ws.onopen = () => {
      console.log('🔌 Connected to WebSocket Server');

      // 2. Immediately register this user as Online in Redis
      ws.send(
        JSON.stringify({
          type: 'REGISTER_PRESENCE',
          userId: currentUser?.id,
        })
      );

      // 3. Ask Redis for the list of users who are already online
      ws.send(
        JSON.stringify({
          type: 'GET_INITIAL_PRESENCE',
        })
      );
    };

    // 4. Listen for incoming data events from port :8080
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case 'INITIAL_PRESENCE_LIST':
            // Sync the full list of currently active user IDs
            setOnlineIds(data.userIds.map(String));
            break;

          case 'USER_STATUS_CHANGE':
            // Dynamically add or remove a single user when their status flips
            setOnlineIds((prev) =>
              data.status === 'online'
                ? [...prev, data.userId.toString()]
                : prev.filter((id) => id !== data.userId.toString())
            );
            break;

          default:
            // Handle standard chat messages or other text broadcasts here...
            break;
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    // Clean up connection when the directory unmounts or user leaves page
    return () => {
      ws.close();
    };
  }, [currentUser?.id]);

  return (
    <UserDirectoryDrawer
      open={isOpen}
      variant="permanent"
      anchor="right"
      slotProps={{
        paper: {
          sx: {
            zIndex: (theme) => theme.zIndex.appBar - 1,
          },
        },
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: '72px' }} />
      <Paper
        sx={{
          width: '100%',
          height: 'calc(100vh - 72px)',
          overflowY: 'auto',
          overflowX: 'hidden',
          py: 1,
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 1,
            px: 2,
          }}
        >
          {!isOpen ? (
            <Tooltip title="Messages" placement="left" arrow>
              {chatBubbleElement}
            </Tooltip>
          ) : (
            chatBubbleElement
          )}
          {isOpen && (
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: 'text.secondary',
                lineHeight: 1,
              }}
            >
              Messages
            </Typography>
          )}
        </Box>
        <List sx={{ py: 0 }}>
          {users.map((u) => {
            const isOnline = onlineIds.includes(u.id.toString());

            return (
              <ListItem key={u.id} disablePadding>
                <ListItemButton
                  onClick={() => onSelectUser(u)}
                  selected={u.id === activeRecipientId}
                  sx={{ borderRadius: 1, mb: 0.5, pl: 3 }}
                >
                  <ListItemAvatar
                    sx={{
                      display: 'flex',
                      justifyContent: isOpen ? 'initial' : 'center',
                      width: isOpen ? 'auto' : '100%',
                      minWidth: isOpen ? '56px' : 'auto',
                      marginRight: isOpen ? 'initial' : 0,
                    }}
                  >
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: isOnline ? '#44b700' : '#bdbdbd', // Green if in Redis list, grey if not
                          color: isOnline ? '#44b700' : '#bdbdbd',
                          boxShadow: (theme) =>
                            `0 0 0 2px ${theme.palette.background.paper}`,
                        },
                      }}
                    >
                      <Avatar src={u.avatarUrl} />
                    </Badge>
                  </ListItemAvatar>
                  {isOpen && (
                    <ListItemText
                      primary={`${u.firstname} ${u.lastname}`}
                      secondary={u.position?.position ?? 'No Position'}
                      slotProps={{
                        primary: {
                          variant: 'body2',
                          noWrap: true,
                          sx: {
                            fontWeight: 600,
                          },
                        },
                        secondary: { variant: 'caption', noWrap: true },
                      }}
                      sx={{ ml: 1 }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </UserDirectoryDrawer>
  );
};

export default UserDirectory;
