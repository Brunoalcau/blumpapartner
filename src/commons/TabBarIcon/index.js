import React from 'react';
import {string} from 'prop-types';

// Locals
import {IconWithBadge} from '../IconWithBadge';

const tabsIcons = {
  Home: 'home',
  Services: 'checkmark-circle',
  Schedule: 'calendar',
  Menu: 'more'
};

export const TabBarIcon = ({icon, color}) => {
  return <IconWithBadge icon={tabsIcons[icon]} color={color} />;
};

TabBarIcon.propTypes = {
  icon: string,
  color: string
};
