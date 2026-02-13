import {
  useState,
  type ReactElement,
  type ReactNode,
  type SyntheticEvent,
} from 'react';

import Box from '@mui/material/Box';
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
    <Stack gap={2}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleChange} {...rest}>
          {tabs.map(({ label }, idx) => (
            <MuiTab
              key={idx}
              label={label}
              value={defaultActiveTab ? label : idx}
              {...a11yProps(idx)}
            />
          ))}
        </Tabs>
      </Box>
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
