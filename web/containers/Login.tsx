import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";
import {
  FacebookButton,
  FormFields,
  GoogleButton,
  Inputs,
  Main,
} from "../components/Auth/styles";
import { Button } from "../components/Button";
import { Form } from "../components/form/Form";
import { Input } from "../components/form/Input";
import { useAuthContext } from "../utils/AuthContext";
import { withoutAuth } from "../utils/authHoc";
import { routes } from "../utils/constants";

const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const Login = withoutAuth(() => {
  const { push } = useRouter();
  const { login } = useAuthContext();

  return (
    <>
      <Head>
        <title>Speech to summary | Login</title>
        <meta
          name="description"
          content="Easily generate AI powered summary from any speech."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Form
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={login}
        >
          <h1>login with sts</h1>
          <FormFields>
            <Link href="http://localhost:4000/auth/google" passHref>
              <GoogleButton type="button">login with google</GoogleButton>
            </Link>
            <Link href="http://localhost:4000/auth/facebook" passHref>
              <FacebookButton type="button">login with facebook</FacebookButton>
            </Link>

            <Inputs>
              <Input name="email" label="Email" fullWidth />
              <Input
                name="password"
                label="Password"
                type="password"
                fullWidth
              />
            </Inputs>

            <Button type="submit" fullWidth>
              login
            </Button>
            <div>
              or would you rather
              <Link href={routes.register} passHref>
                <Button variant="text">register</Button>
              </Link>
            </div>
          </FormFields>
        </Form>
      </Main>
    </>
  );
});
