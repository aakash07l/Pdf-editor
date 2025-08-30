import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
const PdfEditor = dynamic(() => import("../components/PdfEditor").then(m => m.PdfEditor), { ssr: false });

export default function Home() {
  const [pdfFile, setPdfFile] = useState(null);
  const editorRef = useRef(null);

  // File upload handler
  function onFileChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") return;
    const reader = new FileReader();
    reader.onload = () => {
      setPdfFile(reader.result);
    };
    reader.readAsArrayBuffer(file);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Next.js Nutrient PDF Editor (Client-side)</h1>

      {!pdfFile && (
        <input
          type="file"
          accept="application/pdf"
          onChange={onFileChange}
          style={{ marginBottom: 20 }}
        />
      )}

      {pdfFile && (
        <>
          <PdfEditor
            ref={editorRef}
            document={pdfFile}
            style={{ height: "700px", width: "100%" }}
          />
          {/* You can add buttons here to trigger save/export */}
        </>
      )}
    </div>
  );
}
