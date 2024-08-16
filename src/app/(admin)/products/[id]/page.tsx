interface ProductsProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductsProps) {
  return {
    title: `Produto ${params.id}`,
  }
}

export default async function Product({ params }: ProductsProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/products/${params.id}`,
    {
      cache: 'no-store',
    },
  )

  const product = await response.json()

  return (
    <div>
      <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
        Product Id: {params.id} Under construction
      </h1>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </div>
  )
}
