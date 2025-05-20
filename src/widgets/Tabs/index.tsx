import { TabItem } from '@shared/models/tab-item.model'
import { tabColors } from '@widgets/Tabs/constants/tabColors'
import { FC, ReactNode, useState } from 'react'

import s from './tabs.module.scss'

interface Props {
  items: TabItem[]
  defaultActiveKey?: string
  title?: string | ReactNode
}

const Tabs: FC<Props> = ({ items, defaultActiveKey, title }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || items[0].key)

  const activeItemIndex = items.findIndex((tab) => tab.key === activeKey)

  return (
    <div className={s.wrap}>
      <div
        className={s.container}
        style={{
          justifyContent: title ? 'space-between' : 'end',
        }}
      >
        {title && <div className={s.title}>{title}</div>}
        <div className={s.buttonsWrap}>
          {items.map((item) => (
            <button
              className={s.button}
              style={{
                width: `${100 / items.length}%`,
              }}
              key={item.key}
              onClick={() => setActiveKey(item.key)}
            >
              {item.label}
            </button>
          ))}
          <div
            className={s.indicator}
            style={{
              width: `${100 / items.length}%`,
              transform: `translateX(${activeItemIndex * 100}%)`,
              backgroundImage: tabColors[activeItemIndex],
            }}
          />
        </div>
      </div>
      {items.map(
        (item) =>
          item.key === activeKey && <div key={item.key}>{item.children}</div>,
      )}
    </div>
  )
}

export default Tabs
