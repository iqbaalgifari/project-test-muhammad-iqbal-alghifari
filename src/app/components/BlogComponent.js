"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ApiRepository } from '../repository/ApiRepository'
import dayjs from 'dayjs'

const apiSuitmedia = new ApiRepository()

export default function BlogComponent() {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sort, setSort] = useState("published_at")
  const [blog, setBlog] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalData, setTotalData] = useState(0)

  const totalPages = Math.ceil(totalData / pageSize)

  useEffect(() => {
    getAllBlog()
  }, [pageSize, pageNumber, sort])

  const getAllBlog = async () => {
    setLoading(true)
    try {
      const response = await apiSuitmedia.GetAllBlog(pageNumber, pageSize, sort)
      setBlog(response.data)
      setTotalData(response.meta?.total || 0) // backend harus support total
    } catch (error) {
      console.error("Error :", error)
    } finally {
      setLoading(false)
    }
  }

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const generatePages = () => {
      const pages = []
      const visiblePages = 5
      let start = Math.max(1, currentPage - 2)
      let end = Math.min(totalPages, start + visiblePages - 1)

      if (end - start < visiblePages - 1) {
        start = Math.max(1, end - visiblePages + 1)
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      return pages
    }

    return (
      <div className="flex items-center gap-2 mt-6 flex-wrap">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-gray-500 disabled:text-gray-300"
        >
          &lsaquo;
        </button>

        {/* Page Numbers */}
        {generatePages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center ${
              page === currentPage
                ? "bg-orange-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-gray-500 disabled:text-gray-300"
        >
          &rsaquo;
        </button>
      </div>
    )
  }

  return (
    <section className="w-full py-5">
      <div className="xl:max-w-7xl w-full mx-auto flex flex-col justify-center items-center gap-y-6 text-black px-4">

        {/* Pagination & Sort Filter */}
        <div className="flex flex-col md:flex-row justify-between w-full gap-y-4">
          <p className="text-sm text-gray-700">
            Showing {((pageNumber - 1) * pageSize) + 1} - {Math.min(pageNumber * pageSize, totalData)} of {totalData}
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-x-2">
              <label className="text-sm">Per page:</label>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setPageNumber(1); }}
                className="border px-3 py-1 rounded-md text-sm"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>

            <div className="flex items-center gap-x-2">
              <label className="text-sm">Sort by:</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border px-3 py-1 rounded-md text-sm"
              >
                <option value="published_at">Newest</option>
                <option value="-published_at">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {blog.map((b, index) => (
            <div key={index} className="flex flex-col h-full shadow-lg rounded-xl overflow-hidden bg-white">
              {loading ? (
                <div className="w-full h-[200px] bg-gray-300 animate-pulse" />
              ) : (
                <Image
                  width={400}
                  height={200}
                  alt="Blog thumbnail"
                  src={index % 2 === 0 ? `/tech.jpg` : `/programming team.jpg`}
                  className="w-full h-[200px] object-cover"
                />
              )}
              <div className="p-4">
                <p className="text-slate-500 text-sm">{dayjs(b.created_at).format('D MMMM YYYY')}</p>
                <h2 className="text-black font-semibold text-lg mt-1 line-clamp-3">{b.title}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={(newPage) => setPageNumber(newPage)}
        />
      </div>
    </section>
  )
}
