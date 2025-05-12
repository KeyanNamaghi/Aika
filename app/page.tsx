import { Stack } from '@/components/layouts'
import { Body, Heading } from '@/components/typography'

export default async function Index() {
  return (
    <Stack className='w-full' gap='0'>
      <Heading>Aika</Heading>
      <Body>Keep track of time.</Body>
    </Stack>
  )
}
