import Image from "next/image";

import RootLayout from "@/layouts";
import ChartFour from "@/components/Charts/ChartFour";
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
const Dashboard = () => {
    return (
        <>
            <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                <div className="col-span-12 mt-13">
                    <ChartFour />
                </div>
                <ChartOne />
                <ChartTwo />
            </div>
        </>
    );
};

Dashboard.getLayout = (page: any) => {
    return <RootLayout>{page}</RootLayout>;
};
export default Dashboard;
