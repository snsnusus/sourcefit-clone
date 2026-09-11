import {
  useState,
  type ReactElement,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
import MuiTab from '@mui/material/Tab';
import Tabs, { type TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';

import TabPanel from './tab-panel';

type TabProps = {
  defaultActiveTab?: string;
  tabs: {
    label: ReactNode;
    content: ReactNode;
  }[];
} & MuiTabsProps;

const a11yProps = (index: number): { id: string; 'aria-controls': string } => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const Tab = ({ tabs, defaultActiveTab, ...rest }: TabProps): ReactElement => {
  const [currentTab, setCurrentTab] = useState(defaultActiveTab ?? 0);

  const handleChange = (
    _e: SyntheticEvent,
    newValue: string | number
  ): void => {
    setCurrentTab(newValue);
  };

  return (
    <Stack>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        variant="fullWidth"
        sx={{
          width: '100%',
          minHeight: '40px',
          backgroundColor: 'action.hover', // Optional: subtle background tracking track for the pill rail
          borderRadius: '20px',
          display: 'inline-flex',
          '& .MuiTabs-indicator': {
            height: '100%',
            borderRadius: '24px',
            backgroundColor: 'primary.main', // This pill will slide seamlessly between selections
          },
        }}
        {...rest}
      >
        {tabs.map(({ label }, idx) => {
          const tabValue = defaultActiveTab ? label : idx;
          const isSelected = currentTab === tabValue;

          return (
            <MuiTab
              key={idx}
              label={label}
              value={defaultActiveTab ? label : idx}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: '24px', // 2. Gives it that chip/pill shape
                padding: '6px 16px',
                minHeight: '40px',
                fontSize: '1rem',
                zIndex: 1, // Pushes text layer cleanly over the moving indicator track
                transition: 'color 0.2s ease-in-out',

                // Fallback text colors matching the active state flag
                color: isSelected ? 'primary.contrastText' : 'text.secondary',

                // Ultimate Specificity Override targeting native MUI structural classes
                '&.MuiButtonBase-root': {
                  color: isSelected ? 'primary.contrastText' : 'text.secondary',
                },
                '&.Mui-selected': {
                  color: 'primary.contrastText !important',
                },
                // Optional hover feedback
                // '&:hover:not(.Mui-selected)': {
                //   backgroundColor: 'action.hover',
                // },
              }}
              {...a11yProps(idx)}
            />
          );
        })}
      </Tabs>
      {tabs.map(({ label, content }, idx) => (
        <TabPanel
          key={idx}
          value={currentTab}
          index={defaultActiveTab ? label : idx}
        >
          {content}
        </TabPanel>
      ))}
    </Stack>
  );
};

export default Tab;
