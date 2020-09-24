import React from 'react';

export default function Login(props:any) {
  
  const [isLoginDisabled, setIsLoginDisabled] = React.useState(props.isLoginDisabled || true);
  const [email, setEmail] = React.useState(props.email ||'');
  const [password, setPassword] = React.useState(props.password ||'');

  React.useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateEmail = (text:any) => /@/.test(text);

  const validateForm = () => {
    setIsLoginDisabled(password.length < 8 || !validateEmail(email));
  };

  const handleEmailBlur = (evt:any) => {
    const emailValue = evt.target.value.trim();
    setEmail(emailValue);
  };

  const handlePasswordChange = (evt:any)  => {
    const passwordValue = evt.target.value.trim();
    setPassword(passwordValue);
  };

  const handleSubmit1 = () => {
    dispatch('submit(email, password)');
    setIsLoginDisabled(true);
  };

  return (
    <form>
        {JSON.stringify(email)}
      <input
        type="email"
        placeholder="email"
        className="mx-auto my-2"
        onBlur={handleEmailBlur}
      />
      <input
        type="password"
        className="my-2"
        onChange={handlePasswordChange}
        value={password}
      />
      <input
        type="button"
        className="btn btn-primary"
        onClick={handleSubmit1}
        disabled={isLoginDisabled}
        value="Submit"
      />
    </form>
  );
}