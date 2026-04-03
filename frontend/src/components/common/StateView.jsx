const StateView = ({ type, message }) => {
  if (!message) return null;

  const baseClass = 'text-center py-5';

  if (type === 'error') {
    return <div className={`${baseClass} text-danger`}>{message}</div>;
  }

  if (type === 'empty') {
    return <div className={`${baseClass} text-light`}>{message}</div>;
  }

  return <div className={`${baseClass} text-light`}>{message}</div>;
};

export default StateView;