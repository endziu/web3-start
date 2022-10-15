import Head from "next/head"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Layout({children}) {
  return <div className="bg-origin-content flex min-h-screen flex-col" style={{backgroundImage: 'url(/bg.jpg)'}}>
    <Head>
      <title>Background Noises</title>
      <meta name='description' content='nft dapp' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <header className="flex self-end px-2 pt-2">
      <ConnectButton />
    </header>
    <main className="flex flex-1 flex-col p-4 items-center">
      {children}
    </main>
  </div>
}