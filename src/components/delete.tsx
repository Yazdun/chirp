import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { VscChromeClose } from 'react-icons/vsc'
import type { RouterOutputs } from '~/utils/api'
import birdAnimation from '~/lotties/bird.json'
import Lottie from 'lottie-react'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { toast } from 'react-hot-toast'
import { api } from '~/utils/api'
import cn from 'classnames'

const framer_background = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
}

const framer_modal = {
  initial: { y: '5%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '5%', opacity: 0 },
  transition: { duration: 0.3 },
}

type PostWithUser = RouterOutputs['posts']['getAll'][number]

export const Delete = (props: PostWithUser) => {
  const ref = useRef(null)
  const [open, setOpen] = useState<boolean>(false)

  const { post, author } = props

  useOnClickOutside(ref, () => setOpen(false))

  const style = {
    height: 200,
    width: 200,
  }

  const ctx = api.useContext()

  const { mutate, isLoading } = api.posts.delete.useMutation({
    onSuccess: () => {
      setOpen(false)
      toast.success(`"${post.content}" has been deleted successfully`)
      void ctx.posts.getAll.invalidate()
    },

    onError: e => {
      const errorMessage = e.data?.zodError?.fieldErrors.content

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      } else {
        toast.error('Failed to delete! Please try again later.')
      }
    },
  })

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-red-200 p-1 text-red-600 dark:bg-orange-900 dark:text-red-300"
      >
        <RiDeleteBin7Line />
      </button>
      <AnimatePresence initial={false} mode="wait">
        {open && (
          <motion.div
            {...framer_background}
            className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] p-5 backdrop-blur-sm"
          >
            <motion.div
              {...framer_modal}
              className="relative z-50 w-full rounded-md bg-light-100 p-5 shadow-sm dark:bg-gradient-to-tl dark:from-gray-700 dark:to-gray-800 dark:shadow-lg md:max-w-xl"
              ref={ref}
            >
              <button
                className="absolute right-5 top-5 z-50 flex text-xl"
                onClick={() => setOpen(false)}
              >
                <VscChromeClose />
              </button>
              <div className="relative pt-[8rem] text-center">
                <div className="absolute -top-[3rem] right-0 left-0 flex justify-center">
                  <Lottie
                    animationData={birdAnimation}
                    width={10}
                    loop={true}
                    style={style}
                  />
                </div>
                <div className="flex flex-col items-center gap-3 pb-4">
                  <p className="font-bold">
                    This action cannot be unchirped. Are you sure you want to
                    proceed?
                  </p>
                  <button
                    onClick={() => mutate({ postId: post.id })}
                    disabled={isLoading}
                    className={cn(
                      'flex items-center gap-1 rounded-lg bg-red-600 px-4  py-2 font-semibold text-white transition-colors disabled:cursor-not-allowed md:hover:bg-red-700',
                      isLoading && 'animate-pulse',
                    )}
                  >
                    <RiDeleteBin7Line className="mt-[0.05rem]" />
                    {isLoading ? 'Please wait...' : 'Yeah delete it'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
