import { ToolsClient } from './components/ToolsClient'

export const metadata = {
  title: 'Explore AI Tools',
  description: 'Discover the best AI tools for your workflow.',
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams

  return (
    <div className="container py-8 mx-auto">
      <div className="flex flex-col gap-8 md:flex-row">
        <ToolsClient initialParams={resolvedParams} />
      </div>
    </div>
  )
}