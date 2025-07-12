import Image from "next/image";
import BannerComponent from "./components/BannerComponent";
import BlogComponent from "./components/BlogComponent";

export default function Home() {
  return (
    <>
      <BannerComponent/>
      <BlogComponent/>
    </>
  );
}
