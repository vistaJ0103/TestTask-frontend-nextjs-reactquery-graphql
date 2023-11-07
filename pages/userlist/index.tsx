import Table from "@/components/Tables/Table";
import { GET_USERS } from "@/graphql";
import RootLayout from "@/layouts";
import request from "graphql-request";

import Link from "next/link";

const UserList = () => {
  return (
    <>
      <div className="flex flex-col gap-10 mt-13">
        <div className="flex justify-end">
          <button
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium w-30 text-gray hover:bg-opacity-95"
            type="submit"
          >
            <Link href="/useradd">
              Add User
            </Link>
          </button>
        </div>
        <Table />
      </div>
    </>
  );
};
UserList.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};
export default UserList;
