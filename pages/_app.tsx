import { UserContextProvider } from "@/context/authcontext";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from "react-query";

const noAuthRequired = ["/auth/login", "/auth/signup"];

export const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: any) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return (
    <QueryClientProvider client={queryClient}>
      {noAuthRequired.includes(router.pathname) ? (
        <>{getLayout(<Component {...pageProps} />)}</>
      ) : (
        <UserContextProvider>
          {getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen />
        </UserContextProvider>
      )}
      <ToastContainer />
    </QueryClientProvider>

  );
}
