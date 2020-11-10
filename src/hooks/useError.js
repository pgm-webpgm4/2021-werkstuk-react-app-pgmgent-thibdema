/**
 * The use error hook
 */

export const useError = () => {
  const handleGqlError = ({ graphQLErrors }) => {
    graphQLErrors.forEach(({ message, extensions }) => {
      // logout if we have code unauthenticated
    if(message === 'NOT AUTHORIZED') {
      window.location.pathname = '/error/401';
    } else if (extensions.code === 'UNAUTHENTICATED') {
      console.error('User is not authenticated!');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('userId');
      window.localStorage.removeItem('admin');
    } else console.error(message);
    });
  };
  const handleError = e => {
    // notify the error
    console.error(e);
  };
  return [handleGqlError, handleError];
};