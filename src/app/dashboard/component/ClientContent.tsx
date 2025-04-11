"use client";

import { useParams } from "next/navigation";
import HomeContent from "@/app/dashboard/component/pages/HomeContent";
import ProductContent from "./pages/ProductContent";
import InventoryContent from "./pages/InventoryContent";
import StockEntryContent from "@/app/dashboard/component/pages/StockEntryContent";
import MarketPriceContent from "@/app/dashboard/component/pages/MarketPriceContent";
import HPPContent from "@/app/dashboard/component/pages/HPPContent";
import ReportContent from "@/app/dashboard/component/pages/ReportContent";
import AboutUsContent from "@/app/dashboard/component/pages/AboutUsContent";
import ProfileContent from "@/app/dashboard/component/pages/ProfileContent";

export default function ClientContent() {
    const { menu } = useParams();

    const renderContent = () => {
        switch (menu) {
            case "product":
                return <ProductContent/>;
            case "inventory":
                return <InventoryContent />;
            case "stock-entry":
                return <StockEntryContent />;
            case "market-price":
                return <MarketPriceContent />;
            case "hpp":
                return <HPPContent />;
            case "report":
                return <ReportContent />;
            case "about-us":
                return <AboutUsContent />;
                case "profile":
                    return <ProfileContent />;
            default:
                return <HomeContent />;
        }
    };

    return <>{renderContent()}</>;
}
