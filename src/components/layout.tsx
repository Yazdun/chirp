import type { PropsWithChildren } from 'react'
import { Navigation } from './navigation'

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="pb-[7rem] md:pb-5">
      <Navigation />
      {props.children}
    </main>
  )
}
