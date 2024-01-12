interface message {
  errorMessage: string
}

const ErrorDisplay = ({errorMessage}: message) => {
  if (errorMessage.length < 1) {
    return (
      <div></div>
    );
  }

  return (
    <p style={{color: 'red'}}>{errorMessage}</p>
  );
};

export default ErrorDisplay;