"use client";
import { useEffect } from "react";

interface WebviewProps {
  url: string;
}

const Webview: React.FC<WebviewProps> = ({ url }) => {
  return <webview src={url}></webview>;
};

export default Webview;
