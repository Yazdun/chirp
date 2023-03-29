import React from 'react'
import cn from 'classnames'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  className?: string
}

const Container: React.FC<ContainerProps> = ({
  as: Element = 'div',
  children,
  className,
  ...rest
}) => {
  return (
    <Element
      {...rest}
      className={cn('w-full md:m-auto md:max-w-2xl', className)}
    >
      {children}
    </Element>
  )
}

export default Container
