'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback, useRef } from 'react'

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const isComposing = useRef(false)

  const handleChange = useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>) => {
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        if (isComposing.current) {
          return
        }

        const value = e.target.value
        const params = new URLSearchParams(searchParams)
        params.set('page', '1')
        if (value) {
          params.set('query', value)
        } else {
          params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
      }, 300)
    },
    [searchParams, pathname, replace]
  )
  const onCompositionEnd = (e: React.SyntheticEvent<HTMLInputElement>) => {
    isComposing.current = false
    handleChange(e)
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={handleChange}
        onCompositionStart={() => (isComposing.current = true)}
        onCompositionEnd={onCompositionEnd}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}

function debounce(fn: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
