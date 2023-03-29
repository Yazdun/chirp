import type { PropsWithChildren } from 'react'
import { Navigation } from './navigation'

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main>
      <Navigation />
      <div className="flex h-full w-full flex-col md:m-auto md:max-w-2xl">
        {props.children}
      </div>
    </main>
  )
}
