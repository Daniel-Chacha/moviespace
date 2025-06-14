
import React from 'react'

const Scroll = () => {
      // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    // <div>
      <svg onClick={scrollToTop} className='fixed bottom-5 right-2 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#00ff00"/><path fill="#fff" d="M48 30.3L32 15L16 30.3h10.6V49h10.3V30.3z"/></svg>
    // </div>
  )
}

export default Scroll
