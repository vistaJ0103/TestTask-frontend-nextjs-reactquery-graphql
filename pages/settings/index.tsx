import Image from "next/image";
import RootLayout from "@/layouts";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { Alert } from "antd";
import { userService } from "@/services/user.service";
import { toastNotification } from "@/components/Notification";
import { useMutation, useQueryClient } from "react-query";
import request, { Variables } from "graphql-request";
import { UPDATE_USER_MUTATION } from "@/graphql";

const Settings = () => {
  const router = useRouter();
  const { id, name, email } = router.query;

  const [isError, setError] = useState(false);
  const [newname, setName] = useState(name);
  const [password, setPassword] = useState("");
  const [isErrText, setErrText] = useState('');
  const [rePassword, setRePassword] = useState("");
  const [newemail, setEmail] = useState(email);
  const userId = id;

  const queryClient = useQueryClient();
  const updateUser = useMutation(
    (variables: Variables) => {
      return request('http://localhost:4200/graphql', UPDATE_USER_MUTATION, variables);
    },
    {
      onSuccess: async () => {
        toastNotification("Update Success", "success", 3000);
        await queryClient.refetchQueries('user');
        await queryClient.refetchQueries('userlist');
      },
      onError: (err) => {
        toastNotification("Update error: User is already", "error", 3000);
      },
    }
  );

  const onsubmit = async () => {
    // Validate form data
    if (newname === "") {
      setError(true);
      setErrText(' Please enter your name');
      return;
    }

    if (newemail === "") {
      setError(true);
      setErrText("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newemail)) {
      setError(true);
      setErrText("Please enter a valid email");
      return;
    }

    if (password === "") {
      setError(true);
      setErrText("Please enter your password");
      return;
    }

    if (password.length < 6) {
      setError(true);
      setErrText("Password must be at least 6 characters");
      return;
    }
    const hasNumber = /\d/;
    const hasString = /[a-zA-Z]/;
    if (!hasNumber.test(password) || !hasString.test(password) || password.length < 7) {
      setError(true);
      setErrText("Password is incorrect (min 7 letters and 1 number)");
      return;
    }
    if (rePassword !== password) {
      setError(true);
      setErrText("Passwords do not match");
      return;
    }
    await updateUser.mutateAsync({
      updateUserDTO: {
        userId: userId,
        name: newname,
        email: newemail,
        password: password,
      },
    });
  };
  return (
    <>
      <div className=" mt-14 mx-auto max-w-270">
        <div className="grid grid-cols-6 gap-8">
          <div className="col-span-6 xl:col-span-6">
            <div className="rounded-sm border  shadow-default border-strokedark bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium  text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                {isError && <Alert message={isErrText} />}
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium  text-white"
                      htmlFor="fullName"
                    >
                      User Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border  py-3 pl-11.5 pr-4.5 focus-visible:outline-none border-strokedark bg-meta-4 text-white focus:border-primary"
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Devid Jhon"
                        onChange={(e) => setName(e.target.value)}
                        value={newname}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-white"
                    htmlFor="emailAddress"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                            fill=""
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                    <input
                      className="w-full rounded border  py-3 pl-11.5 pr-4.5  focus-visible:outline-none border-strokedark bg-meta-4 text-white focus:border-primary"
                      type="email"
                      name="emailAddress"
                      id="emailAddress"
                      onChange={(e) => setEmail(e.target.value)}
                      value={newemail}
                    />
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium  text-white"
                      htmlFor="Current Password"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                              fill=""
                            />
                            <path
                              d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border  py-3 pl-11.5 pr-4.5 focus-visible:outline-none border-strokedark bg-meta-4 text-white focus:border-primary"
                        type="text"
                        name="Current Password"
                        id="Current Password"
                        placeholder=""
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium  text-white"
                      htmlFor="New Password"
                    >
                      Re-Password
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                              fill=""
                            />
                            <path
                              d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border  py-3 pl-11.5 pr-4.5 focus-visible:outline-none border-strokedark bg-meta-4 text-white focus:border-primary"
                        type="text"
                        name="New Password"
                        id="New Password"
                        placeholder=""
                        onChange={(e) => setRePassword(e.target.value)}
                        value={rePassword}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border py-2 px-6 font-medium  hover:shadow-1 border-strokedark text-white"
                    type="submit"
                  >
                    <Link href="/userlist" className="text-white">
                      Cancel
                    </Link>
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                    type="submit"
                    onClick={onsubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
Settings.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};
export default Settings;
