import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
// батон можно не помечать, пошта исп. в одном месте
import { memo, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onToggleHandler = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [toggleTheme, dispatch]);

  return <Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />;
});
