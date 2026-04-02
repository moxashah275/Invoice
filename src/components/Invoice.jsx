import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import InvoiceForm from "./InvoiceForm";
import InvoicePreview from "./InvoicePreview";

export default function Invoice() {
  const invoiceRef = useRef(null);

  const SERVER_RATE_PER_YEAR = 1000;
  const DOMAIN_RATE_PER_YEAR = 7000;

  const initialData = {
    docType: "Invoice",
    invoiceNo: "123456789231456",
    date: "2025-08-22",
    dueDate: "2025-09-22",
    address: "401 medani jain hostel, navjivan press road, income tax cross road, Ahmedabad, gujarat, india-380009",
    billTo: "401 medani jain hostel, navjivan press road, income tax cross road, Ahmedabad, gujarat, india-380009",
    items: [
      { name: "App Development", qty: 1, price: 0, discount: 0 },
      { name: "Web Development", qty: 1, price: 0, discount: 0 },
    ],
    notes: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet"],
    serverYear: 1,
    domainYear: 3,
    lastPaid: 1000,
  };

  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("invoiceData");
    return savedData ? JSON.parse(savedData) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("invoiceData", JSON.stringify(data));
  }, [data]);

  const formatDateForView = (dateString) => {
    if (!dateString) return "---";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const subtotal = data.items.reduce((acc, item) => {
    const qty = Number(item.qty) || 0;
    const price = Number(item.price) || 0;
    const discountPercent = Number(item.discount) || 0;
    const lineTotalBeforeDiscount = qty * price;
    const discountAmount = (lineTotalBeforeDiscount * discountPercent) / 100;
    return acc + (lineTotalBeforeDiscount - discountAmount);
  }, 0);

  const serverYearsNum = Number(data.serverYear) || 1;
  const domainYearsNum = Number(data.domainYear) || 1;

  const serverTotal = SERVER_RATE_PER_YEAR * serverYearsNum;
  const domainTotal = DOMAIN_RATE_PER_YEAR * domainYearsNum;

  const total = subtotal + serverTotal + domainTotal;
  const due = total - (Number(data.lastPaid) || 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...data.items];
    if (field === "qty" || field === "price" || field === "discount") {
      const numValue = value === "" ? "" : Number(value);
      if (field === "discount" && numValue > 100) {
        updatedItems[index][field] = 100;
      } else {
        updatedItems[index][field] = numValue < 0 ? 0 : numValue;
      }
    } else {
      updatedItems[index][field] = value;
    }
    setData({ ...data, items: updatedItems });
  };

  const addNewItem = () => {
    setData({
      ...data,
      items: [...data.items, { name: "", qty: 1, price: "", discount: 0 }],
    });
  };

  const removeItem = (index) => {
    const updatedItems = data.items.filter((_, i) => i !== index);
    setData({ ...data, items: updatedItems });
  };

  const handleDownload = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `${data.docType}-${data.invoiceNo}`,
    pageStyle: `
      @page { size: A4; margin: 0; }
      @media print {
        body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        img { image-rendering: -webkit-optimize-contrast !important; image-rendering: crisp-edges !important; }
      }
    `,
  });

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 flex flex-col lg:flex-row gap-6 justify-center items-start font-sans">
      <InvoiceForm 
        data={data}
        setData={setData}
        initialData={initialData}
        handleInputChange={handleInputChange}
        handleItemChange={handleItemChange}
        addNewItem={addNewItem}
        removeItem={removeItem}
        handleDownload={handleDownload}
      />

      <InvoicePreview 
        ref={invoiceRef}
        data={data}
        formatDateForView={formatDateForView}
        subtotal={subtotal}
        serverTotal={serverTotal}
        domainTotal={domainTotal}
        total={total}
        due={due}
      />
    </div>
  );
}