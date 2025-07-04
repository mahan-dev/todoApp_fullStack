export const PageValidation = (token) => {
  if (token) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
};

export const PageNotValidate = (token) => {
  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
};
