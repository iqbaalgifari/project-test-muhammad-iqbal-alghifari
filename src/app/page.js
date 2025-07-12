import BannerComponent from "./components/BannerComponent";
import BlogComponent from "./components/BlogComponent";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BannerComponent/>
      <BlogComponent/>
    </Suspense>
  );
}
