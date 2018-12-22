const conditionGif = condition => {
  console.log('condition', condition)
  const gifs = {
    Snow:
      'https://media.giphy.com/media/3ohzdUi5U8LBb4GD4s/giphy-downsized.gif',
    Clear: 'https://media.giphy.com/media/z4Qquuhfjc3QI/giphy-downsized.gif',
    Rain:
      'https://media.giphy.com/media/3o6wNIK2unphUcCcqQ/giphy-downsized.gif',
    Clouds: 'https://media.giphy.com/media/Pp9W9tuVF5NwQ/giphy.gif',
    Mist: 'https://media.giphy.com/media/yhZr5Wx7CBFbq/giphy-downsized.gif'
  }

  return gifs[condition]
}

export default conditionGif
