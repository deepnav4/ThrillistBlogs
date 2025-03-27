import React from 'react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full rounded-full border-4 border-t-blue-500 border-r-indigo-500 border-b-purple-500 border-l-pink-500 animate-spin" />
        <div className="absolute w-full h-full rounded-full border-4 border-gray-100/10 animate-pulse" />
      </div>
    </div>
  )
}

export default Loading
