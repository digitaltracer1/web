import ListSellers from '../sellers/list-sellers'

export default function Dashboard() {
  return (
    <div>
      {/* <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
        Goals Under construction
      </h1> */}
      <ListSellers paramUrl={'goals'} />
    </div>
  )
}
