import React, { useState } from "react";
import useForm from "react-hook-form";
import { Redirect } from "react-router-dom";
import { handlePost } from "../../scripts/apiHelpers";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/Login.css";

export function Login() {
  const { handleSubmit, register } = useForm();
  const [auth, setAuth] = useState(false);
  const onSubmit = state => {
    handlePost("login", state);
    setAuth(true);
    console.log(state);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="email"
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          ref={register}
        />
        <input type="submit" />
      </form>
      {auth ? <Redirect to="/" /> : null}
    </>
  );
}
