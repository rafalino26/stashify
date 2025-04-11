import { useState } from "react";

export default function EditModal({
  field,
  currentValue,
  onClose,
  onSave,
}: {
  field: string;
  currentValue: string;
  onClose: () => void;
  onSave: (value: string) => void;
}) {
  const [value, setValue] = useState(currentValue);

  return (
    <div className="fixed inset-0 text-black flex items-center justify-center ml-65 backdrop-blur z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit {field}</h2>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(value)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
