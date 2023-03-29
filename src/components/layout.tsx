import type { PropsWithChildren } from 'react'
import { Navigation } from './navigation'

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main>
      <Navigation />
      {props.children}
    </main>
  )
}
