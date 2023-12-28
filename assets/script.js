const ALL_TRACKS_DATA = []
let SHOW_TRACKS_DATA = []

modalStuff()

function add_shabad_from_user_input1() {
  function findShabadsKey(searchInput) {
    const all_matched_shabad_keys = {}
    for (const key in ALL_SHABADS) {
      const shabadArray = ALL_SHABADS[key]

      for (const line of shabadArray) {
        const wordsArray = line.split(' ')

        let line_matched = true
        for (let i = 0; i < searchInput.length; i++) {
          if (!line_matched) break
          if (
            wordsArray.length === i ||
            wordsArray[i][0].toLowerCase() !== searchInput[i].toLowerCase()
          ) {
            line_matched = false
          }
        }

        if (line_matched) {
          all_matched_shabad_keys[key] = line
          break
        }
      }
    }
    return all_matched_shabad_keys
  }

  const input_tag = document.getElementById('usedShabadId')
  const user_input = input_tag.value
  const list_opts = document.getElementById('shabadId_list_opts')
  list_opts.innerHTML = ''
  if (user_input === '') return

  let max_items_to_show = 10
  const keyObj = findShabadsKey(user_input)
  for (let key in keyObj) {
    const opt = document.createElement('p')
    opt.classList.add('shabad_opt_from_userinput')
    opt.onclick = () => {
      list_opts.innerHTML = ''
      input_tag.value = key
      document.getElementById('theShabadSelected').textContent = keyObj[key]
    }
    // opt.value = key
    opt.innerText = keyObj[key]
    list_opts.appendChild(opt)
    max_items_to_show -= 1
    if (max_items_to_show < 0) break
  }
}

function add_shabad_from_user_input() {
  function findShabadsKey(search_input) {
    function first_letters_gurmukhi(words) {
      if (typeof words !== 'string') return words

      let newWords = words

      const reverseMapping = {
        ਉ: 'ੳ',
        ਊ: 'ੳ',
        ਆ: 'ਅ',
        ਆਂ: 'ਅ',
        ਐ: 'ਅ',
        ਔ: 'ਅ',
        ਇ: 'ੲ',
        ਈ: 'ੲ',
        ਏ: 'ੲ',
        // 'ੋੁ': 'uo',
      }

      const simplifications = [
        ['E', 'a'],
        ['ਓ', 'ੳ'],
        ['L', 'l'],
        ['ਲ਼', 'ਲ'],
        ['S', 's'],
        ['ਸ਼', 'ਸ'],
        ['z', 'j'],
        ['ਜ਼', 'ਜ'],
        ['Z', 'g'],
        ['ਗ਼', 'ਗ'],
        ['\\^', 'K'],
        ['ਖ਼', 'ਖ'],
        ['ƒ', 'n'],
        ['ਨੂੰ', 'ਨ'],
        ['&', 'P'],
        ['ਫ਼', 'ਫ'],
      ]
      simplifications.forEach((e) => {
        newWords = newWords.replace(new RegExp(e[0], 'g'), e[1])
      })

      newWords = newWords
        .replace(/\]/g, '')
        .replace(/\[/g, '')
        .replace(/॥/g, '')
        .replace(/।/g, '')
        .replace(/rhwau dUjw/g, '')
        .replace(/rhwau/g, '')
        .replace(/[0-9]/g, '')
        .replace(/[;,.]/g, '')

      function firstLetter(word) {
        let letter = word[0]
        if (letter in reverseMapping) {
          letter = reverseMapping[letter]
        }
        return letter
      }

      const letters = newWords.split(' ').map(firstLetter).join('')
      return letters
    }

    if (search_input.length < 3) return {}
    for (let i = 0; i < search_input.length; i++) {
      const c = search_input[i]
      if (c >= '0' && c <= '9') {
        console.log('num in search input')
        return
      }
    }
    const all_matched_shabad_keys = {}
    for (const key in ALL_SHABADS) {
      const shabadArray = ALL_SHABADS[key]

      for (let pu_ln_idx = 0; pu_ln_idx < shabadArray.length; pu_ln_idx += 3) {
        const line = shabadArray[pu_ln_idx]
        // for (const line of shabadArray) {
        const first_letters = first_letters_gurmukhi(line)

        let line_matched = true
        for (let i = 0; i < search_input.length; i++) {
          if (!line_matched) break
          if (
            first_letters.length === i ||
            first_letters[i] !== search_input[i]
          ) {
            line_matched = false
          }
        }

        if (line_matched) {
          all_matched_shabad_keys[key] = pu_ln_idx
          break
        }
      }
    }
    return all_matched_shabad_keys
  }

  const sbdId_input_tag = document.getElementById('first_letter_sbd')
  const decs_input = document.getElementById('userDesc')
  const user_input = sbdId_input_tag.value
  const list_opts = document.getElementById('shabadId_list_opts')
  console.log(user_input)

  list_opts.innerHTML = ''
  if (user_input === '') return

  let max_items_to_show = 10

  const mapping = {
    a: 'ੳ',
    A: 'ਅ',
    s: 'ਸ',
    S: 'ਸ਼',
    d: 'ਦ',
    D: 'ਧ',
    f: 'ਡ',
    F: 'ਢ',
    g: 'ਗ',
    G: 'ਘ',
    h: 'ਹ',
    H: '੍ਹ',
    j: 'ਜ',
    J: 'ਝ',
    k: 'ਕ',
    K: 'ਖ',
    l: 'ਲ',
    L: 'ਲ਼',
    q: 'ਤ',
    Q: 'ਥ',
    w: 'ਾ',
    W: 'ਾਂ',
    e: 'ੲ',
    E: 'ਓ',
    r: 'ਰ',
    R: '੍ਰ',
    '®': '੍ਰ',
    t: 'ਟ',
    T: 'ਠ',
    y: 'ੇ',
    Y: 'ੈ',
    u: 'ੁ',
    ü: 'ੁ',
    U: 'ੂ',
    '¨': 'ੂ',
    i: 'ਿ',
    I: 'ੀ',
    o: 'ੋ',
    O: 'ੌ',
    p: 'ਪ',
    P: 'ਫ',
    z: 'ਜ਼',
    Z: 'ਗ਼',
    x: 'ਣ',
    X: 'ਯ',
    c: 'ਚ',
    C: 'ਛ',
    v: 'ਵ',
    V: 'ੜ',
    b: 'ਬ',
    B: 'ਭ',
    n: 'ਨ',
    ƒ: 'ਨੂੰ',
    N: 'ਂ',
    ˆ: 'ਂ',
    m: 'ਮ',
    M: 'ੰ',
    µ: 'ੰ',
    '`': 'ੱ',
    '~': 'ੱ',
    '¤': 'ੱ',
    Í: '੍ਵ',
    ç: '੍ਚ',
    '†': '੍ਟ',
    œ: '੍ਤ',
    '˜': '੍ਨ',
    '´': 'ੵ',
    Ï: 'ੵ',
    æ: '਼',
    Î: '੍ਯ',
    ì: 'ਯ',
    í: '੍ਯ',
    // 1: '੧',
    // 2: '੨',
    // 3: '੩',
    // 4: '੪',
    // 5: '੫',
    // 6: '੬',
    // '^': 'ਖ਼',
    // 7: '੭',
    // '&': 'ਫ਼',
    // 8: '੮',
    // 9: '੯',
    // 0: '੦',
    '\\': 'ਞ',
    '|': 'ਙ',
    '[': '।',
    ']': '॥',
    '<': 'ੴ',
    '¡': 'ੴ',
    Å: 'ੴ',
    Ú: 'ਃ',
    Ç: '☬',
    '@': 'ੑ',
    '‚': '❁',
    '•': '੶',
    ' ': ' ',
  }

  const gurmukhi_input = user_input
    .split('')
    .map((char) => mapping[char] || char)
    .join('')
  sbdId_input_tag.value = gurmukhi_input

  const keyObj = findShabadsKey(gurmukhi_input)
  for (let shabad_key in keyObj) {
    const line_ind = keyObj[shabad_key]
    const sbd = ALL_SHABADS[shabad_key]
    console.log(line_ind)
    const opt = document.createElement('button')

    opt.classList.add('shabad_opt_from_userinput')
    opt.onclick = (e) => {
      e.preventDefault() //to not submit form
      // sbdDetails.style.display = 'block'
      // summaryTag.textContent = shabad_key
      // fullSbdDiv.innerHTML = ALL_SHABADS[shabad_key].join('<br>')
      sbdId_input_tag.value = shabad_key
      decs_input.value = sbd[line_ind + 1] // the english transliteration
    }
    opt.innerText = sbd[line_ind]
    list_opts.appendChild(opt)
    max_items_to_show -= 1
    if (max_items_to_show < 0) break
  }
}

function scrollToDivAccodingToUrl() {
  const urlParams = new URLSearchParams(window.location.search)
  const theId = urlParams.get('id')
  if (!theId) return
  document.getElementById(theId).getElementsByTagName('button')[0].click()
  // document.getElementById(theId).scrollIntoView();
}

function trackNodeBtnClicked(obj_id) {
  const obj = ALL_TRACKS_DATA.find((obj) => obj.id == obj_id)
  const current_playing_audio = document.getElementById('current_playing_audio')
  current_playing_audio.style.display = 'block'
  document.getElementById('DescOfTrack').innerText =
    'Description: ' + obj.description
  document.getElementById('playingArtist').innerText =
    'Keertani: ' + obj.keertani
  document.getElementById('trackAdded').innerText =
    'Added: ' + getFormatedTime(obj.timeAdded)

  document.getElementById('timeStampOfDecs').innerText = obj.timeStamp
  document.getElementById('TrackTitle').innerText = getTrackTitle(obj.link)
  document.getElementById('TrackTitle').href = obj.link

  document.getElementsByTagName('audio')[0].src = obj.link

  document.getElementById('timeStampOfDecs').onclick = function() {
    const timeLst = obj.timeStamp.split(':')
    let totalSeconds = 0
    let muliplier = 1
    for (let i = timeLst.length - 1; i > -1; i--) {
      totalSeconds += muliplier * parseInt(timeLst[i])
      muliplier *= 60
    }
    document.getElementsByTagName('audio')[0].currentTime = totalSeconds
  }

  document.getElementById('copyLink').onclick = function() {
    const url = new URL(window.location.href.split('?')[0].split('#')[0])
    url.searchParams.append('id', obj_id)
    const copyText = url.href
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(copyText)
        .then(() => alert('Text Copied'))
        .catch((err) => {
          console.error('Failed to copy text: ', err)
        })
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = copyText
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Text Copied (Fallback)')
    }
  }

  const details = document.getElementById('trackShabadIdDetails')
  if (obj.shabadId != '' && ALL_SHABADS[obj.shabadId]) {
    const summary = document.createElement('summary')
    summary.innerText = `Shabad ID: ${obj.shabadId}`
    details.innerText = ALL_SHABADS[obj.shabadId].join('\n')
    details.appendChild(summary)
    details.style.display = 'block'
  } else {
    details.style.display = 'none'
  }

  document.getElementById('timeStampOfDecs').click() // to start playing
  // document.getElementById('current_playing_audio').scrollIntoView()
}

function getFormatedTime(unixTimeStamp) {
  const the_date = new Date(unixTimeStamp * 1000)
  const and = the_date.toLocaleString()
  return and
}

function displayData(alreadyFiltered = false) {
  const ol = document.getElementsByTagName('ol')[0]
  ol.innerHTML = ''

  if (!alreadyFiltered) filterDataByChosenOpt()

  const len = SHOW_TRACKS_DATA.length
  document.getElementById('trackInfo').innerText = `Found ${len} Tracks`

  for (let i = len - 1; i > -1; i--) {
    const obj = SHOW_TRACKS_DATA[i]

    const li = document.createElement('li')
    li.setAttribute('class', 'trackNode')
    li.setAttribute('id', obj.id)
    li.innerHTML = `
        <div class="topBarLine">
          <div class="nodeNum"># ${obj.id}</div>
          <div class="description">${obj.description}</div>
        </div>
        <div class="middleDetail">
          <div class="artist">Keertani: ${obj.keertani}</div>
          <div class="timestamp">Time Stamp: ${obj.timeStamp}</div>
          <div class="timeadded">Added: ${getFormatedTime(obj.timeAdded)}</div>
        </div>
        <button class="playTrackBtnWithTitle" onclick="trackNodeBtnClicked(${obj.id
      })">
          ${getTrackTitle(obj.link)}
        </button>
      `
    if (obj.shabadId != '' && ALL_SHABADS[obj.shabadId]) {
      li.innerHTML += `
        <details>
          <summary>Shabad ID: ${obj.shabadId}</summary>
          ${ALL_SHABADS[obj.shabadId].join('<br>')}
        </details>`
    }
    ol.appendChild(li)
  }
}

function searchForTrack(e) {
  const wordsEntered = e.toLowerCase().split(' ')

  filterDataByChosenOpt()

  SHOW_TRACKS_DATA = SHOW_TRACKS_DATA.filter((obj) => {
    const values = Object.values(obj)
    if (obj.shabadId != '' && ALL_SHABADS[obj.shabadId]) {
      values.push(ALL_SHABADS[obj.shabadId].join('\n'))
    }

    for (const word of wordsEntered) {
      const wordInTrackObj = values.some((line) =>
        line.toLowerCase().includes(word)
      )
      if (!wordInTrackObj) {
        return false
      }
    }
    return true
  })
  displayData(true)
}

function putOptsInSelect() {
  const allKeertanis = []
  ALL_TRACKS_DATA.forEach((track) => {
    if (!allKeertanis.includes(track.keertani)) {
      allKeertanis.push(track.keertani)
    }
  })

  const select = document.getElementById('pickKeertani')
  const selectModal = document.getElementById('userPickKeertani')
  for (const keertani of allKeertanis) {
    const opt = document.createElement('option')
    opt.setAttribute('value', keertani)
    opt.innerText = keertani
    select.appendChild(opt)

    const optForModal = opt.cloneNode(true)
    selectModal.prepend(optForModal)
  }
  modalSelectChanged()
}

function filter_keertani_from_url() {
  const urlParams = new URLSearchParams(window.location.search)
  const artist = urlParams.get('artist')
  if (!artist) return
  const select = document.getElementById('pickKeertani')
  for (const opt of select.options) {
    if (opt.innerText == artist) {
      opt.selected = true
      break
    }
  }
  filterDataByChosenOpt()
}

function filterDataByChosenOpt() {
  const opt = document.getElementById('pickKeertani').value
  localStorage.setItem('keertani', opt)
  if (opt == 'All') {
    SHOW_TRACKS_DATA = ALL_TRACKS_DATA
    return
  }
  SHOW_TRACKS_DATA = ALL_TRACKS_DATA.filter((item) => {
    return opt == item.keertani
  })
}

function modalStuff() {
  const modal = document.getElementById('myModal')
  const showModalBtn = document.getElementById('showModalBtn')
  const closeModalButton = document.getElementById('closeModal')

  showModalBtn.addEventListener('click', () => {
    modal.showModal()
  })
  closeModalButton.addEventListener('click', () => {
    modal.close()

    //clear inputs
    document.getElementById('shabadId_list_opts').innerHTML = ''
    document.getElementById('theShabadSelected').textContent = ''

    const userInputItems = document.querySelectorAll('.userInputItem')
    userInputItems.forEach((item) => {
      const inputTags = item.getElementsByTagName('input')
      for (const tag of inputTags) {
        tag.value = ''
      }
    })
  })
  window.addEventListener('click', (event) => {
    // click outsite modal = close
    if (event.target === modal) {
      modal.close()
    }
  })
}

function modalSelectChanged() {
  console.log('modalSelectChanged')
  const opt = document.getElementById('userPickKeertani').value
  const inputKeertani = document.getElementById('userKeertani')
  if (opt === 'Add New') {
    inputKeertani.style.display = 'block'
  } else {
    inputKeertani.style.display = 'none'
    inputKeertani.value = opt
  }
}

function getTrackTitle(link) {
  return decodeURIComponent(link.replace(/%20/g, ' ').split('/').splice(-1))
}

function showShabads() {
  const detailsElements = document.querySelectorAll('details')
  for (let i = 1; i < detailsElements.length; i++) {
    const details = detailsElements[i]
    details.open = !details.open
  }
}

function toggle_descend_order() {
  SHOW_TRACKS_DATA.reverse()
  displayData(true)
  const btn = document.getElementById('descend_order_btn')
  console.log(btn.innerText)
  btn.innerText =
    SHOW_TRACKS_DATA[0].id > SHOW_TRACKS_DATA[1].id
      ? 'Ascending Order'
      : 'Descending Order'
}
function formValidation(e) {
  e.preventDefault()
  const form = document.querySelector('#modal-content')

  const desc = document.querySelector('#userDesc')
  const keertani = document.querySelector('#userKeertani')
  const link = document.querySelector('#userLink')

  if (link.value === '') {
    alert('Link is empty')
    return
  }

  const additionalField = document.createElement('input')
  additionalField.name = 'linkToGoTo'
  additionalField.value = window.location.href
  form.appendChild(additionalField)
  form.submit()
}

fetch('http://45.76.2.28/kathaIndex/util/getData.php')
  .then((res) => {
    if (!res.ok) throw new Error('Something went wrong!')
    return res.json()
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const obj = data[i]
      obj.id = `${i + 1}`
      ALL_TRACKS_DATA.push(obj)
    }
    SHOW_TRACKS_DATA = ALL_TRACKS_DATA
    putOptsInSelect()
    filter_keertani_from_url()
    displayData(true)
    scrollToDivAccodingToUrl()
  })
  .catch((err) => {
    console.log(err)
  })
