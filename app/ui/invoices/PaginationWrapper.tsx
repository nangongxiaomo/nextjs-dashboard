import { fetchInvoicesPages } from "@/app/lib/data"
import Pagination from "./pagination"

//服务端异步组件，专门用来“等”数据
export default async function PaginationWrapper({ query }: { query: string }) {
  const totalPages = await fetchInvoicesPages(query)
  return <Pagination totalPages={totalPages} />
}
