import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  // const dispatch = useAppDispatch()
  return (
    <div>
      <h3>
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
        mistyped the URL? Be sure to check your spelling.
      </h3>
      <button
        onClick={() => {
          navigate('/')
          // dispatch(setActiveNav('home'))
        }}
      >
        Go to home
      </button>
    </div>
  )
}

export default NotFound
