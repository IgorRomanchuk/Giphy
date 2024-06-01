import s from './notFound.module.scss'

const NotFound = () => {
  return (
    <div className={s.title}>
      <h3 style={{ color: 'white', paddingTop: '20px' }}>
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
        mistyped the URL? Be sure to check your spelling.
      </h3>
    </div>
  )
}

export default NotFound
