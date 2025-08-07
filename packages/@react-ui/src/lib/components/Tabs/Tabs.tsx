import { cva, type VariantProps } from 'class-variance-authority';
import React, { createContext, forwardRef, useContext, useRef, useState } from 'react';
import { cn } from '../../tools/classNames';
import { getTabInfo, handleTabKeyboardNavigation } from '../../tools/tabNavigationHelpers';

/**
 * Tab Component System
 *
 * A flexible tab component with context-based state management.
 * Built with accessibility in mind and styled with Tailwind CSS.
 *
 * @features
 * - Multiple variants: outlined, underlined, pills
 * - Context-based state management
 * - Compound component pattern
 * - Accessible with proper ARIA attributes
 * - Keyboard navigation support
 */

// Tab context for state management
interface TabContextValue {
  value: string;
  setValue: (value: string) => void;
  variant: 'outlined' | 'underlined' | 'pills';
}

const TabContext = createContext<TabContextValue>({
  value: '',
  setValue: () => {},
  variant: 'outlined',
});

// Tab variants
const tabVariants = cva(
  'inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  {
    variants: {
      variant: {
        outlined: 'border-t border-l border-r rounded-t-md',
        underlined: 'border-b-2 rounded-none',
        pills: 'rounded-full border',
      },
      active: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: 'hover:bg-gray-50',
      },
    },
    compoundVariants: [
      // Outlined variant
      {
        variant: 'outlined',
        active: true,
        className: 'bg-white border-gray-300 text-blue-600 -mb-px',
      },
      {
        variant: 'outlined',
        active: false,
        className: 'bg-gray-50 border-gray-300 text-gray-500',
      },
      // Underlined variant
      {
        variant: 'underlined',
        active: true,
        className: 'border-blue-500 text-blue-600 bg-transparent',
      },
      {
        variant: 'underlined',
        active: false,
        className: 'border-transparent text-gray-500 bg-transparent',
      },
      // Pills variant
      {
        variant: 'pills',
        active: true,
        className: 'bg-blue-500 border-blue-500 text-white',
      },
      {
        variant: 'pills',
        active: false,
        className: 'bg-white border-gray-300 text-gray-500',
      },
    ],
    defaultVariants: {
      variant: 'outlined',
      active: false,
      disabled: false,
    },
  },
);

const tabListVariants = cva('flex', {
  variants: {
    variant: {
      outlined: 'border-b border-gray-300',
      underlined: '',
      pills: 'gap-2',
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    variant: 'outlined',
    orientation: 'horizontal',
  },
});

// Context Provider Component
interface TabContextProviderProps {
  children: React.ReactNode;
  defaultValue: string;
  variant?: 'outlined' | 'underlined' | 'pills';
  onValueChange?: (value: string) => void;
}

const TabContextProvider = ({
  children,
  defaultValue,
  variant = 'outlined',
  onValueChange,
}: TabContextProviderProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabContext.Provider value={{ value, setValue: handleValueChange, variant }}>
      {children}
    </TabContext.Provider>
  );
};

// Individual Tab Component
type TabBaseProps = VariantProps<typeof tabVariants>;

interface TabProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'disabled' | 'onSelect'>,
    Omit<TabBaseProps, 'variant' | 'active'> {
  value: string;
  onSelect?: (value: string) => void;
}

const TabComponent = forwardRef<HTMLButtonElement, TabProps>(
  ({ className, value: tabValue, onSelect, disabled, children, ...props }, ref) => {
    const { value, setValue, variant } = useContext(TabContext);
    const active = tabValue === value;

    const handleClick = () => {
      if (!disabled) {
        setValue(tabValue);
        onSelect?.(tabValue);
      }
    };

    return (
      <button
        ref={ref}
        className={cn(tabVariants({ variant, active, disabled }), className)}
        onClick={handleClick}
        disabled={!!disabled}
        role="tab"
        aria-selected={active}
        aria-controls={`tabpanel-${tabValue}`}
        id={`tab-${tabValue}`}
        tabIndex={active ? 0 : -1}
        {...props}
      >
        {children}
      </button>
    );
  },
);

TabComponent.displayName = 'Tab';

// TabList Component
interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className, orientation = 'horizontal', children, ...props }, ref) => {
    const { variant, value, setValue } = useContext(TabContext);

    // Handle keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const tabInfo = getTabInfo(children);
      handleTabKeyboardNavigation(event, tabInfo, value, orientation, setValue);
    };

    return (
      <div
        ref={ref}
        className={cn(tabListVariants({ variant, orientation }), className)}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabList.displayName = 'TabList';

// TabPanel Component
interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  forceMount?: boolean;
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, value: panelValue, forceMount = false, children, ...props }, ref) => {
    const { value } = useContext(TabContext);
    const active = panelValue === value;

    if (!active && !forceMount) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn('mt-4', !active && 'hidden', className)}
        role="tabpanel"
        aria-labelledby={`tab-${panelValue}`}
        id={`tabpanel-${panelValue}`}
        tabIndex={0}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabPanel.displayName = 'TabPanel';

// TabContent wrapper for better semantics
const TabContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('tab-content', className)} {...props}>
        {children}
      </div>
    );
  },
);

TabContent.displayName = 'TabContent';

// Main Tab export with compound components
export const Tab = Object.assign(TabComponent, {
  Context: TabContextProvider,
  List: TabList,
  Panel: TabPanel,
  Content: TabContent,
});

// Alias for more intuitive naming
export const Tabs = Tab;
