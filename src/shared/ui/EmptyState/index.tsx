import cryingCowboyEmoji from '@assets/img/crying-cowbow-emoji.gif'
import { FC, HTMLAttributes, ReactNode } from 'react'

import s from './emptyState.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
  errorMessage?: string | null
  textBody?: ReactNode
  arrow?: boolean
  showImageError?: boolean
}

const EmptyState: FC<Props> = ({
  errorMessage,
  textBody,
  arrow = true,
  showImageError = true,
  ...rest
}) => {
  return (
    <div {...rest}>
      {showImageError && (
        <img
          src={cryingCowboyEmoji}
          width={300}
          height={300}
          alt="crying-cowbow-emoji"
        />
      )}

      {errorMessage && <p>{errorMessage}</p>}
      {textBody ? (
        textBody
      ) : (
        <>
          <p>Oops! There&apos;s nothing here.</p>
          <p>For GIFs that DO exist, here&apos;s our trending feed...</p>
        </>
      )}
      {arrow && <div className={s.arrowDown}></div>}
    </div>
  )
}

export default EmptyState
