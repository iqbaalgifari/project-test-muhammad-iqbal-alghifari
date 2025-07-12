"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function NavbarComponent() {
  const [prevScroll, setPrevScroll] = useState(0)
  const [visible, setVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll > 100) {
        setVisible(currentScroll < prevScroll)
      } else {
        setVisible(true)
      }

      setPrevScroll(currentScroll)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScroll])

  const navLinks = [
    { name: "Work", href: "#" },
    { name: "About", href: "#" },
    { name: "Service", href: "#" },
    { name: "Ideas", href: "#", active: true },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
  ]

  return (
    <header className={`bg-orange-500 w-full fixed z-50 px-4 py-3 transition-all duration-200 ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Image src="/site-logo.webp" width={100} height={40} alt="Logo" className="invert brightness-0" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-x-5 text-white text-sm">
          {navLinks.map((link, idx) => (
            <Link key={idx} href={link.href} className={`p-1 ${link.active ? "border-b-4 border-white" : ""}`}>
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 bg-orange-600 p-4 rounded-lg text-white text-sm">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block ${link.active ? "font-bold underline" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
