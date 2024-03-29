import { redirect } from 'next/navigation'
import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const REDIRECT_URL = process.env.REDIRECT_URL || "https://app.3dns.box"
const FRAMES_URL = process.env.FRAMES_URL || "https://3dns-domain-register-frame.vercel.app"
const imageUrl = new URL("/3dns-buy-a-domain-rescale.png", FRAMES_URL).href
const postUrl = new URL("/api/frame", FRAMES_URL).href

const frameMetadata = getFrameMetadata({
  buttons: [
      {label: 'Buy 🛍️', action: 'post'},
  ],
  image: imageUrl,
  post_url: postUrl,

});

export const metadata: Metadata = {
  title: '3 DNS Frame by 3DNS.',
  description: 'A frame to search if a domain exists, and to also purchase it via 3dns.',
  openGraph: {
    title: '3 DNS Frame by 3DNS.',
    description: 'A frame to search if a domain exists, and to also purchase it via 3dns.',
    images: [imageUrl],
  },
  other: {
    'of:accepts:xmtp': '2024-02-01',
    ...frameMetadata,
  },
};

export default async function Page() {
    const redirectUrl = REDIRECT_URL;
    redirect(redirectUrl)
}



































