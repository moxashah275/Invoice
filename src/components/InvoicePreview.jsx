import React from "react";
import dwLogo from "../assets/images/dw.png";
import digiwaveTechLogo from "../assets/images/digiwave.svg";
import qrImage from "../assets/images/qr.png";

const formatCurrency = (amount) => {
  const num = Number(amount);
  if (Number.isInteger(num)) {
    return num.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
  return num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const InvoicePreview = React.forwardRef(
  ({ data, formatDateForView, subtotal, serverTotal, domainTotal, total, due }, ref) => {
    const notesStr = data.notes ? String(data.notes) : "";
    const hasNotes = notesStr.trim().length > 0;
    const notesArray = hasNotes
      ? notesStr.split("\n").filter((note) => note.trim() !== "")
      : [];

    return (
      <div className="overflow-auto max-h-[1200px] border border-slate-300 rounded-lg">
        <div
          ref={ref}
          className="relative w-[794px] h-[1123px] bg-white font-sans flex flex-col justify-between"
          style={{
            boxSizing: "border-box",
            printColorAdjust: "exact",
            WebkitPrintColorAdjust: "exact",
            color: "black",
          }}
        >
          <div className="relative shrink-0" style={{ height: "160px" }}>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 794 160"
              preserveAspectRatio="none"
            >
              <path d="M0 0 L794 0 L794 120 L397 160 L0 120 Z" fill="#082B63" />
            </svg>

            <div className="absolute inset-0 z-10 flex items-start justify-between px-10 pt-5 text-white">
              <div className="pl-4 flex items-center gap-6 h-[110px] -mt-3">
                <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-white bg-white flex items-center justify-center shrink-0">
                  <img
                    src={dwLogo}
                    alt="DW"
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <div className="flex items-center -mt-1 -ml-3">
                  <img
                    src={digiwaveTechLogo}
                    alt="Digiwave Technology"
                    className="h-24 w-auto object-contain"
                  />
                </div>
              </div>

              <div
                className="mt-3 mr-3 max-w-[300px] text-right text-[16px] font-normal leading-[25px] text-white"
                style={{ fontFamily: "Jaldi" }}
              >
                <p>401 medani jain hostel, navjivan press</p>
                <p>road, income tax cross road,</p>
                <p>Ahmedabad, gujarat, india-380009</p>
              </div>
            </div>
          </div>

          <div className="px-10 pt-4 flex flex-col flex-grow">
            <div className="text-center" style={{ fontFamily: "Jaldi" }}>
              <h1 className="text-[30px] font-bold text-black tracking-wide">
                {data.docType}
              </h1>
              <p className="mb-1 mr-1 text-[17px] text-black font-light">
                #{data.invoiceNo}
              </p>
            </div>

            <div className="mb-4 mt-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1 text-[17px]" style={{ fontFamily: "Jaldi" }}>
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
                  <p
                    className="text-[20px] mr-4 font-bold text-black text-right tracking-wider"
                    style={{ fontFamily: "Jaldi" }}
                  >
                    To:
                  </p>
                </div>
              </div>

              <div className="border-b-2 border-black w-full my-4"></div>

              <div className="text-right mt-3">
                <div
                  className="ml-auto max-w-[280px] text-[17px] leading-[23px] text-black text-right"
                  style={{ fontFamily: "Jaldi" }}
                >
                  <p className="font-bold text-[19px] mb-1">
                    {data.clientName || "Client Name"}
                  </p>

                  {data.billTo ? (
                    <div className="space-y-0.5">
                      {data.billTo.split("\n").map((line, i) => (
                        <p key={i} className="whitespace-pre-wrap">{line}</p>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-0.5">
                      <p>401 medani jain hostel, navjivan press</p>
                      <p>road, income tax cross road,</p>
                      <p>Ahmedabad, gujarat, india-380009</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-2">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#29D6E7] bg-gradient-to-t from-[#EEF8F9] to-[#ffffff]">
                    <th className="px-4 py-2 text-left font-bold text-[17px]" style={{ fontFamily: "Jaldi", color: "#000000" }}>Name</th>
                    <th className="px-2 py-2 text-center font-bold text-[17px]" style={{ fontFamily: "Jaldi", color: "#000000" }}>Quantity</th>
                    <th className="px-2 py-2 text-center font-bold text-[17px]" style={{ fontFamily: "Jaldi", color: "#000000" }}>Price</th>
                    <th className="px-2 py-2 text-center font-bold text-[17px]" style={{ fontFamily: "Jaldi", color: "#000000" }}>Discount</th>
                    <th className="px-4 py-2 text-right font-bold text-[17px]" style={{ fontFamily: "Jaldi", color: "#000000" }}>Linetotal</th>
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
                        <td className="px-4 py-3 text-[17px] text-black" style={{ fontFamily: "Jaldi" }}>
                          {item.name || "---"}
                        </td>
                        <td className="px-2 py-3 text-center text-[17px] text-black" style={{ fontFamily: "Jaldi" }}>
                          {item.qty}
                        </td>
                        <td className="px-2 py-3 text-center text-[17px] text-black" style={{ fontFamily: "Jaldi" }}>
                          {price > 0 ? formatCurrency(price) : "0"}
                        </td>
                        <td className="px-2 py-3 text-center text-[17px] text-black" style={{ fontFamily: "Jaldi" }}>
                          {item.discount || 0}%
                        </td>
                        <td className="px-4 py-3 text-right text-[17px] text-black font-medium" style={{ fontFamily: "Jaldi" }}>
                          {lineTotal > 0 ? formatCurrency(lineTotal) : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pl-2 flex justify-between gap-6">
              <div className="w-[35%]">
                {hasNotes && (
                  <>
                    <h3 className="mb-1 text-[18px] font-bold text-black" style={{ fontFamily: "Jaldi" }}>Note:</h3>
                    <ul className="space-y-0.5 pl-5 text-[16px] text-black" style={{ fontFamily: "Jaldi" }}>
                      {notesArray.map((note, index) => (
                        <li key={index} className="list-disc">{note}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="w-[65%] flex flex-col items-end">
                <table style={{ width: "350px", borderCollapse: "collapse", fontFamily: "Jaldi" }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: "4px 5px", fontWeight: "bold", color: "black", fontSize: "17px" }}>Subtotal:</td>
                      <td style={{ padding: "4px 5px", textAlign: "right", color: "black", fontSize: "17px" }}>{formatCurrency(subtotal)}</td>
                    </tr>
                    {data.docType !== "Receipt" && (
                      <tr>
                        <td style={{ padding: "4px 5px", color: "black", fontWeight: "bold", fontSize: "17px" }}>Tax:</td>
                        <td style={{ padding: "4px 5px", textAlign: "right", color: "black", fontSize: "17px" }}>0</td>
                      </tr>
                    )}
                    <tr>
                      <td style={{ padding: "4px 5px", color: "black", fontWeight: "bold", fontSize: "17px" }}>Server charge:</td>
                      <td style={{ padding: "4px 5px", textAlign: "right", color: "black", fontSize: "17px" }}>
                        ({data.serverYear} Year) {formatCurrency(serverTotal)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "4px 5px", color: "black", fontWeight: "bold", fontSize: "17px" }}>Domain charge:</td>
                      <td style={{ padding: "4px 5px", textAlign: "right", color: "black", fontSize: "17px" }}>
                        ({data.domainYear} Year) {formatCurrency(domainTotal)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "6px 5px", fontWeight: "bold", color: "#2CDBD9", fontSize: "21px" }}>Total:</td>
                      <td style={{ padding: "6px 5px", textAlign: "right", fontWeight: "bold", color: "#2CDBD9", fontSize: "21px" }}>
                        RS. {formatCurrency(total)}
                      </td>
                    </tr>
                    {data.docType !== "Quotation" && (
                      <tr>
                        <td style={{ padding: "4px 5px", color: "black", fontWeight: "bold", fontSize: "17px" }}>Last Paid:</td>
                        <td style={{ padding: "4px 5px", textAlign: "right", color: "black", fontSize: "17px" }}>
                          RS. {formatCurrency(data.lastPaid)}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {data.docType !== "Quotation" && (
                  <div
                    style={{
                      backgroundColor: "#082B63",
                      color: "white",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      width: "350px",
                      boxShadow: "0 2px 4px -1px rgb(0 0 0 / 0.1)",
                      marginTop: "12px",
                      fontFamily: "Jaldi",
                    }}
                  >
                    <div className="flex justify-between items-center" style={{ color: "white" }}>
                      <span style={{ fontWeight: "bold", fontSize: "17px" }}>Amount Due</span>
                      <span style={{ fontWeight: "bold", fontSize: "17px" }}>RS. {formatCurrency(due)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-10 shrink-0">
            <div className="mb-6 pt-6">
              <div className="flex justify-between items-end w-full">
                <div className="flex items-end gap-3">
                  <div style={{ lineHeight: "1.6", fontSize: "15px", color: "black", fontFamily: "Jaldi" }}>
                    <p><span className="font-bold">Account Holder:</span> DOSHI NAMAN PRAKASHBHAI</p>
                    <p><span className="font-bold">Account No:</span> 50100463075872</p>
                    <p><span className="font-bold">IFSC:</span> HDFC0004227</p>
                    <p><span className="font-bold">Branch:</span> JALARAM MANDIR PALDI</p>
                    <p><span className="font-bold">Account Type:</span> SAVING</p>
                  </div>

                  <div className="shrink-0 mt-4 -ml-20 mr-auto">
                    <img
                      src={qrImage}
                      alt="QR Code"
                      className="h-24 w-24 object-contain border border-slate-200 p-1 rounded-sm bg-white"
                    />
                  </div>
                </div>

                <div style={{ fontSize: "14px", color: "black", lineHeight: "1.6", fontFamily: "Jaldi" }} className="text-right">
                  <h3 style={{ fontWeight: "bold", color: "black", fontSize: "16px", marginBottom: "4px" }}>
                    CEO Naman Doshi
                  </h3>
                  <p>hello.digiwave@gmail.com</p>
                  <p>+91 9624185617</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: "10px", backgroundColor: "#052455" }} className="w-full shrink-0"></div>
        </div>
      </div>
    );
  }
);

export default InvoicePreview;