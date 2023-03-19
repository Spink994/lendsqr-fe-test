const fields = {
  email: {
    name: "email",
    placeholder: "Email",
    type: "email",
    required: true,
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$]",
    title: "Please input a valid email address!",
  },
  password: {
    name: "password",
    placeholder: "Password",
    type: "password",
    required: true,
    pattern: ".{8,}",
    title: "Eight or more characters!",
  },
};

export default fields;
