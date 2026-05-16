import React from 'react'
import { cn } from '../lib/utils'
function DotBackground({children}) {
  return (
    <div className='relative flex h-[41rem] w-full items-center justify-center bg-white dark:bg-black'>
        <div  className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}>
            
            {children}
            </div>
            </div>
  )
}

export default DotBackground