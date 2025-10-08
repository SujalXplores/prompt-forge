import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, FileQuestion, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Check if there's a history to go back to
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleGoBack = () => {
    if (canGoBack) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const suggestions = ['Check the URL for typos', 'Browse from the homepage'];

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl'>
        <Card className='border-0 shadow-lg'>
          <CardContent className='p-8 md:p-12 text-center space-y-8'>
            {/* Error Icon and Number */}
            <div className='space-y-4'>
              <div className='mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center'>
                <FileQuestion className='w-12 h-12 text-muted-foreground' />
              </div>
              <div className='space-y-2'>
                <h1 className='text-6xl md:text-7xl font-bold text-primary'>404</h1>
                <h2 className='text-2xl md:text-3xl font-semibold text-foreground'>
                  Page Not Found
                </h2>
              </div>
            </div>

            {/* Description */}
            <div className='space-y-4'>
              <p className='text-lg text-muted-foreground max-w-md mx-auto'>
                Sorry, we couldn't find the page you're looking for. The page might have been moved,
                deleted, or the URL might be incorrect.
              </p>

              {/* Current Path Display */}
              {location.pathname !== '/' && (
                <div className='bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground font-mono break-all'>
                  Requested: {location.pathname}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 justify-center items-center'>
              <Button asChild size='lg' className='w-full sm:w-auto'>
                <Link to='/'>
                  <Home className='w-4 h-4' />
                  Go Home
                </Link>
              </Button>

              <Button
                variant='outline'
                size='lg'
                onClick={handleGoBack}
                className='w-full sm:w-auto'
              >
                <ArrowLeft className='w-4 h-4' />
                {canGoBack ? 'Go Back' : 'Go Home'}
              </Button>
            </div>

            {/* Helpful Suggestions */}
            <div className='pt-4 border-t border-border'>
              <h3 className='text-sm font-medium text-foreground mb-3'>What you can try:</h3>
              <ul className='text-sm text-muted-foreground space-y-1'>
                {suggestions.map((suggestion, index) => (
                  <li key={index} className='flex items-center justify-center gap-2'>
                    <div className='w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0' />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
