import { AuthCheck } from '@/components/auth/AuthCheck';
import Dashboard from './Dashboard';

const Index = () => {
  return (
    <AuthCheck>
      <Dashboard />
    </AuthCheck>
  );
};

export default Index;
