import { Stack } from '@/components/layouts'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack className='' align='center'>
      {children}
    </Stack>
  )
}
