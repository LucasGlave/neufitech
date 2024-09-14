import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Home from "../components/home/Home";

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Neufitech - WebApp</title>
      </Head>
      <div className="bg-zinc-900">
        <Home />
      </div>

      {/* <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/next">Go to next page</Link>
      </div> */}
    </React.Fragment>
  )
}
