import { AppDispatch } from '@/app/providers/StoreProvider';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
// редакс стал более чувст., поэтому юз этот хук
