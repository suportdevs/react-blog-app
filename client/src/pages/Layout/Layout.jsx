import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import Footer from "../../components/Footer/Footer";

export default function Layout() {
    return(
        <>
        <TopBar />
        {/* <Outlet /> */}
        <Footer />
        </>
    )
}