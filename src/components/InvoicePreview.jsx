import React from "react";
import digiwaveLogo from "../assets/images/digiwave.svg";

const InvoicePreview = React.forwardRef(({ data, formatDateForView, subtotal, serverTotal, domainTotal, total, due }, ref) => {
  return (
    <div className="overflow-auto max-h-[1200px] border border-slate-300 rounded-lg">
      <div
        ref={ref}
        className="relative w-[794px] h-[1123px] bg-white font-sans flex flex-col"
        style={{
          boxSizing: "border-box",
          printColorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
          color: "black",
        }}
      >
        <div className="flex flex-col flex-grow pb-[10px]">
          {/* SVG HEADER */}
          <div className="relative shrink-0" style={{ height: "160px" }}>
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 794 160" 
              preserveAspectRatio="none"
            >
              <path d="M0 0 L794 0 L794 120 L397 160 L0 120 Z" fill="#082B63" />
            </svg>

            <div className="absolute inset-0 z-10 flex items-start justify-between px-10 pt-5 text-white">
              <div className="pl-1 flex flex-col items-start">
                <img
                  src={digiwaveLogo}
                  alt="DigiWave"
                  style={{ 
                    imageRendering: "-webkit-optimize-contrast",
                    transform: "translateZ(0)",
                  }}
                  className="h-[90px] w-auto object-contain"
                />
              </div>
              <div
                className="mt-3 mr-3 max-w-[270px] text-right text-[16px] font-normal leading-[25px] text-white"
                style={{ fontFamily: "Jaldi" }}
              >
                <p>401 medani jain hostel, navjivan press</p>
                <p>road, income tax cross road,</p>
                <p>Ahmedabad, gujarat, india-380009</p>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="px-10 pt-4 flex flex-col flex-grow">
            {/* Document Title */}
            <div className="text-center">
              <h1 className="text-[27px] font-bold text-black tracking-wide">
                {data.docType}
              </h1>
              <p className="mb-1 mr-1 text-[18px] text-black" style={{ fontFamily: "Jaldi", fontWeight: 300 }}>
                #{data.invoiceNo}
              </p>
            </div>

            {/* Dates & Billing Info */}
            <div className="mb-5">
              <div className="flex justify-between items-end">
                <div className="space-y-1 text-[15px]">
                  <div className="flex gap-4">
                    <span className="font-bold text-black">Date:</span>
                    <span className="text-black">{formatDateForView(data.date)}</span>
                  </div>
                  {data.docType !== "Quotation" && (
                    <div className="flex gap-4">
                      <span className="font-bold text-black">Due Date:</span>
                      <span className="text-black">{formatDateForView(data.dueDate)}</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[18px] mr-5 font-bold text-black text-right">To:</p>
                </div>
              </div>

              <div className="border-b-2 border-black w-full my-2"></div>

              <div className="text-right">
                <div
                  className="ml-auto max-w-[520px] text-[16px] leading-[1.5rem] text-black"
                  style={{ fontFamily: "Jaldi", fontWeight: 400 }}
                >
                  <p>401 medani jain hostel, navjivan press</p>
                  <p>road income tax cross road,</p>
                  <p>Ahmedabad, gujarat, india-380009</p>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mt-4">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#29D6E7] bg-gradient-to-t from-[#EEF8F9] to-[#ffffff]">
                    <th className="px-4 py-2 text-left font-bold text-black">Name</th>
                    <th className="px-2 py-2 text-center font-bold text-black">Quantity</th>
                    <th className="px-2 py-2 text-center font-bold text-black">Price</th>
                    <th className="px-2 py-2 text-center font-bold text-black">Discount</th>
                    <th className="px-4 py-2 text-right font-bold text-black">Linetotal</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, index) => {
                    const qty = Number(item.qty) || 0;
                    const price = Number(item.price) || 0;
                    const discPercent = Number(item.discount) || 0;
                    const lineTotal = qty * price - (qty * price * discPercent) / 100;

                    return (
                      <tr key={index} className="border-b border-slate-200 bg-[#FAFAFA]">
                        <td className="px-4 py-3 text-[15px] text-black">{item.name || "---"}</td>
                        <td className="px-2 py-3 text-center text-black">{item.qty}</td>
                        <td className="px-2 py-3 text-center text-black">{item.price || 0}</td>
                        <td className="px-2 py-3 text-center text-black">{item.discount || 0}%</td>
                        <td className="px-4 py-3 text-right text-black font-medium">{lineTotal.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Notes & Calculations Table */}
            <div className="mt-8 ml-2 flex justify-between gap-6">
              <div className="w-[30%]">
                <h3 className="mb-1 text-[15px] font-bold text-black">Note:</h3>
                <ul className="space-y-0.5 pl-4 text-[12px] text-black">
                  {data.notes.map((note, index) => (
                    <li key={index} className="list-disc">{note}</li>
                  ))}
                </ul>
              </div>

              <div className="w-[70%] flex justify-end text-[15px]">
                <table style={{ width: "350px", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: "4px 5px", fontWeight: "bold", color: "black", fontSize: "14px" }}>Subtotal:</td>
                      <td style={{ padding: "4px 5px", textAlign: "right", color: "black", fontSize: "14px" }}>{subtotal.toFixed(2)}</td>
                    </tr>
                    {data.docType !== "Receipt" && (
                      <tr>
                        <td style={{ padding: "3px 5px", color: "black", fontWeight: "bold", fontSize: "14px" }}>Tax:</td>
                        <td style={{ padding: "3px 5px", textAlign: "right", color: "black", fontSize: "14px" }}>0.00</td>
                      </tr>
                    )}
                    <tr>
                      <td style={{ padding: "3px 5px", color: "black", fontWeight: "bold", fontSize: "14px" }}>Server charge:</td>
                      <td style={{ padding: "3px 5px", textAlign: "right", color: "black", fontSize: "14px" }}>({data.serverYear} Year) {serverTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "3px 5px", color: "black", fontWeight: "bold", fontSize: "14px" }}>Domain charge:</td>
                      <td style={{ padding: "3px 5px", textAlign: "right", color: "black", fontSize: "14px" }}>({data.domainYear} Year) {domainTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "4px 5px", fontWeight: "bold", color: "#2CDBD9", fontSize: "16px" }}>Total:</td>
                      <td style={{ padding: "4px 5px", textAlign: "right", fontWeight: "bold", color: "#2CDBD9", fontSize: "15px" }}>RS. {total.toFixed(2)}</td>
                    </tr>
                    {data.docType !== "Quotation" && (
                      <tr>
                        <td style={{ padding: "3px 5px", color: "black", fontWeight: "bold", fontSize: "14px" }}>Last Paid:</td>
                        <td style={{ padding: "3px 5px", textAlign: "right", color: "black", fontSize: "14px" }}>RS. {data.lastPaid}</td>
                      </tr>
                    )}
                    {data.docType !== "Quotation" && (
                      <tr>
                        <td colSpan="2" style={{ paddingTop: "6px" }}>
                          <div style={{ backgroundColor: "#082B63", color: "white", padding: "10px 12px", borderRadius: "2px", width: "100%" }}>
                            <div className="flex justify-between items-center" style={{ color: "white" }}>
                              <span style={{ fontWeight: "bold", fontSize: "15px" }}>Amount Due</span>
                              <span style={{ fontWeight: "bold", fontSize: "15px" }}>RS. {due.toFixed(2)}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Account Details & CEO */}
            <div className="mt-12 mb-10 pt-6">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "bottom", textAlign: "left" }}>
                      <table style={{ borderCollapse: "collapse" }}>
                        <tbody>
                          <tr>
                            <td style={{ verticalAlign: "bottom", textAlign: "left", paddingRight: "15px" }}>
                              <div style={{ lineHeight: "1.5", fontSize: "13px", color: "black" }}>
                                <p><span className="font-bold">Account Holder:</span> DOSHI NAMAN PRAKASHBHAI</p>
                                <p><span className="font-bold">Account No:</span> 50100463075872</p>
                                <p><span className="font-bold">IFSC:</span> HDFC0004227</p>
                                <p><span className="font-bold">Branch:</span> JALARAM MANDIR PALDI</p>
                                <p><span className="font-bold">Account Type:</span> SAVING</p>
                              </div>
                            </td>
                            <td className="align-bottom pb-[1px] pl-0">
                              <div className="-ml-7 flex h-16 w-16 items-center justify-center rounded border border-slate-300 bg-white text-[9px] font-bold text-slate-700">
                                QR CODE
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td style={{ verticalAlign: "bottom", textAlign: "right" }}>
                      <div style={{ fontSize: "13px", color: "black", lineHeight: "1.5" }}>
                        <h3 style={{ fontWeight: "bold", color: "black", fontSize: "14px", marginBottom: "2px" }}>
                          CEO Naman Doshi
                        </h3>
                        <p>hello.digiwave@gmail.com</p>
                        <p>+91 9624185617</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Blue Bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "10px", backgroundColor: "#052455" }}></div>
      </div>
    </div>
  );
});

export default InvoicePreview;