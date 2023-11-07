import { useRouter } from "next/router";
import { useEffect } from "react";
import RootLayout from '../layouts/index'

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return null;
};

HomePage.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};
export default HomePage;
