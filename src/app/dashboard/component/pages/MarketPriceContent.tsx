import { useEffect, useState } from "react";
import api from "@/app/services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

type CompetitorPrice = {
  username: string;
  price: number;
};

type DailyIncrease = {
  day: string;
  percentage: number;
};

type Product = {
  id: string;
  name: string;
};

export default function MarketPriceContent() {
  const [competitorPrices, setCompetitorPrices] = useState<CompetitorPrice[]>([]);
  const [weeklyData, setWeeklyData] = useState<DailyIncrease[]>([]);
  const [todayPercentage, setTodayPercentage] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [productName, setProductName] = useState(""); 
  const [productId, setProductId] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  // Ambil data produk dari endpoint /stock
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/stock", { withCredentials: true });
        setProducts(res.data); // Menyimpan produk dalam state
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Ambil data market price berdasarkan productId
  useEffect(() => {
    if (productId) {
      const fetchMarketPrice = async () => {
        try {
          const res = await api.get(`/market/dashboard/${productId}`, {
            withCredentials: true,
          });

          const rawData = res.data.data;

          if (rawData.marketComparison) {
            setProductName(rawData.marketComparison.name);
            setCompetitorPrices(rawData.marketComparison.competitorPrices || []);
          }

          setWeeklyData(rawData.weeklyIncrease.dailyIncreases || []);
          setTodayPercentage(rawData.dailyIncrease.percentage);
        } catch (error) {
          console.error("Failed to fetch market dashboard data:", error);
        }
      };

      fetchMarketPrice();
    }
  }, [productId]);

  const filteredPrices = competitorPrices.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 text-black space-y-6 min-h-screen">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search username/company name..."
          className="w-80 px-3 py-2 rounded-md border bg-white border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-700">Update Date</span>
          <div className="flex items-center bg-white px-3 py-1 rounded-md shadow text-sm">
            <CalendarIcon className="w-4 h-4 mr-1 text-gray-500" />
            {format(selectedDate, "yyyy-MM-dd")}
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="px-3 py-2 rounded-md border bg-white border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">--Select Produk--</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TABEL COMPETITOR */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Product: {productName}</h2>
          <div className="overflow-y-auto max-h-80"> {/* Menambahkan scroll jika tabel memanjang */}
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500">
                  <th className="pb-2">Username/Company Name</th>
                  <th className="pb-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrices.length > 0 ? (
                  filteredPrices.map((item, i) => (
                    <tr key={i} className="border-t text-sm">
                      <td className="py-2">{item.username}</td>
                      <td className="py-2">Rp {item.price.toLocaleString("id-ID")}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="py-4 text-center text-gray-500">
                      No product found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* BAR CHART PER HARI */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">"Weekly Price Increase (%)"</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentage" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DAILY INCREASE ANGKA */}
      <div className="bg-white rounded-xl shadow-md p-6 w-fit mx-auto text-center">
        <h3 className="text-sm text-gray-500 mb-2">Today</h3>
        <div className="text-2xl font-bold text-orange-500">
          {todayPercentage !== null ? `${todayPercentage.toFixed(2)}%` : "No Data"}
        </div>
      </div>
    </div>
  );
}
