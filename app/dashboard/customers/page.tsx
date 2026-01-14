import type { Metadata } from 'next'
import CustomersTable from '@/app/ui/customers/table'
import { Suspense } from 'react'
import { CustomersTableSkeleton } from '@/app/ui/skeletons'
import Search from '@/app/ui/search'
import { lusitana } from '@/app/ui/fonts'

export const metadata: Metadata = {
  title: 'Customers'
}
type IProps = {
  searchParams: Promise<{
    query?: string
  }>
}
export default async function Customers({ searchParams }: IProps) {
  const params = await searchParams
  const query = params?.query ?? ''

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>Customers</h1>
      <Search placeholder="Search customers..." />
      <Suspense fallback={<CustomersTableSkeleton />}>
        <CustomersTable query={query} />
      </Suspense>
    </div>
  )
}
