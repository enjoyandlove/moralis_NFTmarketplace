import React, { useEffect, useState} from 'react';
import './App.css';
import {useMoralis, useMoralisCloudFunction } from "react-moralis";
import { Button, Box, Input, Heading } from "@chakra-ui/react";
import { Container, Center } from "@chakra-ui/react";
import Moralis from 'moralis';

const LogoutButton = () => {
    const { logout, isAuthenticating } = useMoralis();
  
    return (
      <Button
        display={"block"}
        colorScheme="red"
        variant="solid"
        isLoading={isAuthenticating}
        onClick={() => logout()}
        disabled={isAuthenticating}>
        Logout
      </Button>
    );
  };

const GetUserData = () => {
  Moralis.User.enableUnsafeCurrentUser();
  const currentUser = Moralis.User.current();
if (currentUser) {
    // do stuff with the user
    return (
      <>
        <h1>username: {currentUser.getUsername()}</h1>
        <h1>email: {currentUser.getEmail()}</h1>
      </>
    );
} else {
    // show the signup or login page
    return (
      <>please sign up.</>
    );
}
};

function Signup() {

  const { login, isAuthenticated, authenticate, Moralis } = useMoralis();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);
  const handleUsernameChange = (event: any) => setUsername(event.target.value);

  const {
    fetch: callEmailCloudFunction,
    data,
    error,
    isLoading,
  } = useMoralisCloudFunction(
    "sendWelcomeEmail",
    {
      email: email,
      name: username,
    },
    { autoFetch: false }
  );

  const signupFunc = async () => {
    console.log(username, password, email);

    const user = new Moralis.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    try {
      await user.signUp();
      alert("succesfully Signed up");
      // Hooray! Let them use the app now.
    } catch (error: any) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }

    // login(username, password, email);
  };

  const loginUsingUsername = async () => {
    login(username, password);
  };

  //Login Only using Wallet
  //
  const loginUsingMetamask = () => {
    authenticate();
  };

  

  //Send welcome email to user
  const sendWelcomeEmail = () => {
    //pick the user email from state
    callEmailCloudFunction();
  };

  const resetPassword = () => {
    //getting email from email input
    if (email) {
      Moralis.User.requestPasswordReset(email)
        .then(() => {
          alert("Successfully Password Email Sent");
          // Password reset request was sent successfully
        })
        .catch((error) => {
          // Show the error message somewhere
          alert("Error: " + error.code + " " + error.message);
        });
    } else {
      alert("Enter email first");
    }
  };

  // ----- Authenticate page---------
  if (!isAuthenticated) {
    return (
      <Container maxW="container.lg" p={50}>

        <Center>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            size="sm"
          />
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="password"
            size="sm"
          />
          <Input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="username"
            size="sm"
          />
        </Center>
        <br />

        <Center>
          <Button colorScheme="green" size="lg" onClick={signupFunc}>
            Sign up using username and password
          </Button>
        </Center>
        <br />

        <Center>
          <Button colorScheme="green" size="lg" onClick={loginUsingUsername}>
            Sign in using username and password
          </Button>
        </Center>
        <br />

        <Center>
          <Button colorScheme="green" size="lg" onClick={loginUsingMetamask}>
            Sign up/in using Metamask
          </Button>
        </Center>
        <br />

        <Center>
          <Button colorScheme="green" size="lg" onClick={sendWelcomeEmail}>
            Send Welcome Email for{" "}
            {email ? email : "[Please enter email in field]"}
          </Button>
        </Center>
        <br />
        <Center>
          <Button colorScheme="green" size="lg" onClick={resetPassword}>
            Request Password change for{" "}
            {email ? email : "[Please enter email in field]"}
          </Button>
        </Center>
      </Container>
    );
  }

  return (
    <Box display={"block"} p={35} className="App">
      <LogoutButton />
      <Center>
        <Heading as="h2" size="3xl" p={10}>
          Email Auth Demo
        </Heading>
      </Center>

      <Center>
        <Heading as="h2" size="xl" p={10}>
          Logged In
        </Heading>
      </Center>

      <Center>
        <GetUserData />
      </Center>
    </Box>
  );
}

export default Signup;