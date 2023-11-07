import Link from "next/link";
import DropdownUser from "./DropdownUser";
import Image from "next/image";

const Header = (props: {
    sidebarOpen: string | boolean | undefined;
    setSidebarOpen: (arg0: boolean) => void;
}) => {
    return (
        <header className=" flex w-full bg-boxdark drop-shadow-none">
            <div className="flex flex-grow items-center justify-between lg:justify-end lg:w-full px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setSidebarOpen(!props.sidebarOpen);
                        }}
                        className="z-99999 block rounded-sm border  p-1.5 shadow-sm border-strokedark bg-boxdark lg:hidden"
                    >
                        <span className="relative block h-5.5 w-5.5 cursor-pointer">
                            <span className="du-block absolute right-0 h-full w-full">
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm  delay-[0] duration-200 ease-in-out bg-white ${!props.sidebarOpen && "!w-full delay-300"
                                        }`}
                                ></span>
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm  delay-150 duration-200 ease-in-out bg-white ${!props.sidebarOpen && "delay-400 !w-full"
                                        }`}
                                ></span>
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm  delay-200 duration-200 ease-in-out bg-white ${!props.sidebarOpen && "!w-full delay-500"
                                        }`}
                                ></span>
                            </span>
                            <span className="absolute right-0 h-full w-full rotate-45">
                                <span
                                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm  delay-300 duration-200 ease-in-out bg-white ${!props.sidebarOpen && "!h-0 !delay-[0]"
                                        }`}
                                ></span>
                                <span
                                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm  duration-200 ease-in-out bg-white ${!props.sidebarOpen && "!h-0 !delay-200"
                                        }`}
                                ></span>
                            </span>
                        </span>
                    </button>
                    <Link className="block flex-shrink-0 lg:hidden" href="/">
                        <Image
                            width={32}
                            height={32}
                            src={"/images/logo/logo-icon.svg"}
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <DropdownUser />
                </div>
            </div>
        </header>
    );
};

export default Header;
