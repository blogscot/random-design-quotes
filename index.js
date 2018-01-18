import './style.css'

const quoteURL =
  'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'

const textElement = document.querySelector('#quote__text')
const authorElement = document.querySelector('#quote__author')
const buttonElement = document.querySelector('button')

const showQuote = ({ text, author }) => {
  textElement.innerHTML = text
  authorElement.innerHTML = author
}

const getQuote = async () => {
  const response = await fetch(quoteURL, {
    method: 'GET',
    cache: 'reload',
  })
  const data = await response.json()
  const { content: text, title: author } = data[0]
  return {
    text,
    author,
  }
}

const main = () => {
  getQuote()
    .then(showQuote)
    .catch(err => console.error('Server error: ', err))
}

main()
buttonElement.addEventListener('click', function(e) {
  e.preventDefault()
  main()
})
