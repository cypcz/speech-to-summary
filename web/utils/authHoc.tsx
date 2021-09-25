import { useRouter } from "next/router";
import { useAuthContext } from "./AuthContext";
import { routes } from "./constants";

export const withAuth = (Component: any) => (props: any) => {
  const { user } = useAuthContext();
  const router = useRouter();

  if (!user) {
    router.replace(routes.login);
    return null;
  }

  return <Component {...props} />;
};

export const withoutAuth = (Component: any) => (props: any) => {
  const { user } = useAuthContext();
  const router = useRouter();

  if (user) {
    router.replace(routes.app);
    return null;
  }

  return <Component {...props} />;
};
