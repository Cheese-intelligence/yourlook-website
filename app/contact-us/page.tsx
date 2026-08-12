import { Metadata } from "next";
import ContactUs from "./ContactUs";

export const metadata: Metadata = {
  title: "YourLook - Contact Us",
  description: "Have a question or need help? Send us a message.",
};

export default function Contact() {
  return <ContactUs />;
}
