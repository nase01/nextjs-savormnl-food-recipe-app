import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="text-white flex-between body-text
    w-full gap-y-10 border-t border-orange-100 bg-orange
    px-20 py-12 max-md:flex-col ">
      <p>Copy right © 2023 SavorMNL | All Rights Reserved</p>

      <div className="flex gap-x-9">
        <Link href="/term-of-use">Terns & Conditions</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  )
}

export default Footer