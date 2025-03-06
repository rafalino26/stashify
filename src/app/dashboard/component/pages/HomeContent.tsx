"use client";

const HomeContent = () => {
    return (
        <div className="grid grid-cols-3 gap-6">
            {/* Card Stock Update */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="font-bold">Stock Update</h2>
                {/* Bisa tambah chart di sini */}
            </div>

            {/* Card Price Comparison */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="font-bold">Price Comparison</h2>
                {/* Bisa tambah tabel di sini */}
            </div>

            {/* Card lainnya */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="font-bold">Other Info</h2>
            </div>

            {/* Report Section */}
            <div className="col-span-3 flex gap-6">
                <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                    <h2 className="font-bold">Report</h2>
                    {/* Konten report */}
                </div>
                <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                    <h2 className="font-bold">Inventory Summary</h2>
                    {/* Konten summary */}
                </div>
            </div>
        </div>
    );
};

export default HomeContent;
