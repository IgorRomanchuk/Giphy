import cryingCowboyEmoji from '@assets/img/crying-cowbow-emoji.gif'
import { FC, HTMLAttributes, ReactNode } from 'react'

import s from './emptyState.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
  errorMessage?: string | null
  textBody?: ReactNode
}

const EmptyState: FC<Props> = ({ errorMessage, textBody, ...rest }) => {
  return (
    <div {...rest}>
      <img
        src={cryingCowboyEmoji}
        width={300}
        height={300}
        alt="crying-cowbow-emoji"
      />
      {errorMessage && <p>{errorMessage}</p>}
      {textBody ? (
        textBody
      ) : (
        <>
          <p>Oops! There&apos;s nothing here.</p>
          <p>For GIFs that DO exist, here&apos;s our trending feed...</p>
        </>
      )}
      <div className={s.arrowDown}></div>
    </div>
  )
}

export default EmptyState
