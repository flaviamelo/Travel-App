const showError = (message) => {
  const errorMsg = message
    ? message
    : "Oops! sorry something went wrong. Please try again";
  return `
          <div class="error">
              ${errorMsg}
          </div>
      `;
};

export default showError;
