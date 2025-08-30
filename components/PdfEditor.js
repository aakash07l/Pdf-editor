import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export const PdfEditor = forwardRef(function PdfEditor(props, ref) {
  const { document, style } = props;
  const [objectUrl, setObjectUrl] = useState(null);

  useImperativeHandle(ref, () => ({}), []);

  useEffect(() => {
    if (!document) {
      setObjectUrl(null);
      return;
    }

    try {
      const blob = new Blob([document], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setObjectUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } catch (error) {
      setObjectUrl(null);
    }
  }, [document]);

  if (!objectUrl) {
    return null;
  }

  const mergedStyle = {
    width: "100%",
    height: "100%",
    border: "none",
    ...style,
  };

  return (
    <iframe src={objectUrl} title="PDF Viewer" style={mergedStyle} />
  );
});

