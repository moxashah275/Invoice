import React from "react";
import { Download, Plus, Trash2 } from "lucide-react";

export default function InvoiceForm({ data, setData, initialData, handleInputChange, handleItemChange, addNewItem, removeItem, handleDownload }) {
  return (
    <div className="w-full lg:w-[380px] bg-white p-6 rounded-lg shadow-lg h-fit text-sm">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-xl font-bold text-gray-800">Invoice Editor</h2>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to reset all data?")) {
              setData(initialData);
            }
          }}
          className="text-xs text-red-500 hover:text-red-700 font-medium"
        >
          Reset All
        </button>
      </div>

      <div>
        <label className="font-semibold text-gray-600">Document Type</label>
        <select
          name="docType"
          value={data.docType}
          onChange={handleInputChange}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 bg-white"
        >
          <option value="Invoice">Invoice</option>
          <option value="Receipt">Receipt</option>
          <option value="Quotation">Quotation</option>
        </select>
      </div>

      <div className="mt-3">
        <label className="font-semibold text-gray-600">Document No</label>
        <input
          type="text"
          name="invoiceNo"
          value={data.invoiceNo}
          onChange={handleInputChange}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div>
          <label className="font-semibold text-gray-600">Date</label>
          <input
            type="date"
            name="date"
            value={data.date}
            onChange={handleInputChange}
            className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
          />
        </div>
        <div>
          <label className="font-semibold text-gray-600">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={data.dueDate}
            onChange={handleInputChange}
            className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="font-semibold text-gray-600">Client Name</label>
        <input
          type="text"
          name="clientName"
          value={data.clientName}
          onChange={handleInputChange}
          placeholder="Enter Client/Business Name"
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div className="mt-3">
        <label className="font-semibold text-gray-600">Client Address (To)</label>
        <textarea
          name="billTo"
          value={data.billTo}
          onChange={handleInputChange}
          rows="3"
          placeholder="Enter Client Address"
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-xs"
        ></textarea>
      </div>

      <div className="mt-4">
        <label className="font-semibold text-gray-600">Items / Services</label>
        {data.items.map((item, index) => (
          <div key={index} className="border p-3 rounded-md mt-2 bg-gray-50 space-y-2">
            <input
              type="text"
              placeholder="Service Name"
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="Qty"
                value={item.qty}
                onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                className="border border-gray-300 rounded px-2 py-1.5 text-xs"
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleItemChange(index, "price", e.target.value)}
                className="border border-gray-300 rounded px-2 py-1.5 text-xs"
              />
              <div className="relative">
                <input
                  type="number"
                  placeholder="Disc"
                  value={item.discount}
                  onChange={(e) => handleItemChange(index, "discount", e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs pr-5"
                />
                <span className="absolute right-1.5 top-1.5 text-xs text-gray-500">%</span>
              </div>
            </div>
            <button
              onClick={() => removeItem(index)}
              className="text-red-500 text-xs flex items-center"
            >
              <Trash2 size={12} className="mr-1" /> Remove
            </button>
          </div>
        ))}
        <button
          onClick={addNewItem}
          className="mt-2 text-sm text-blue-600 flex items-center font-medium"
        >
          <Plus size={14} className="mr-1" /> Add New Item
        </button>
      </div>

      <div className="mt-4">
        <label className="font-semibold text-gray-600">Server Duration</label>
        <select
          name="serverYear"
          value={data.serverYear}
          onChange={handleInputChange}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 bg-white"
        >
          {[1, 2, 3, 4, 5].map((year) => (
            <option key={year} value={year}>{year} Year</option>
          ))}
        </select>
      </div>

      <div className="mt-3">
        <label className="font-semibold text-gray-600">Domain Duration</label>
        <select
          name="domainYear"
          value={data.domainYear}
          onChange={handleInputChange}
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 bg-white"
        >
          {[1, 2, 3, 4, 5].map((year) => (
            <option key={year} value={year}>{year} Year</option>
          ))}
        </select>
      </div>

      <div className="mt-3">
        <label className="font-semibold text-gray-600">Last Paid (RS.)</label>
        <input
          type="number"
          value={data.lastPaid}
          onChange={(e) =>
            setData({ ...data, lastPaid: Math.max(0, Number(e.target.value)) })
          }
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div className="mt-3">
        <label className="font-semibold text-gray-600">Notes (One per line)</label>
        <textarea
          name="notes"
          value={data.notes}
          onChange={handleInputChange}
          rows="3"
          placeholder="Enter notes here. Leave empty to hide notes from invoice."
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-xs"
        ></textarea>
      </div>

      <button
        onClick={handleDownload}
        className="w-full mt-6 bg-[#082B63] text-white py-3 px-4 rounded-md hover:bg-[#0c377f] flex items-center justify-center font-bold text-sm transition duration-200 shadow-md"
      >
        <Download size={16} className="mr-2" /> Download / Print PDF
      </button>
    </div>
  );
}