export const errorHandler = ({ history, error: { graphQLErrors, networkError } }:{history:any, error:{graphQLErrors:any, networkError:any}}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions, message }:{extensions:{code:string}, message:string}) => {
      switch (extensions.code) {
        case 'INTERNAL_SERVER_ERROR':
          window.alert('Server Error');
          break;
        case 'UNAUTHENTICATED':
          window.alert('로그인 후 이용해주세요');
          localStorage.removeItem('token');
          history.push('/login');
          break;
        default:
          window.alert(message);
      }
    },
    );
  }
  if (networkError) {
    window.alert('Network Error');
  }
};
