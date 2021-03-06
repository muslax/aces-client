import { mutate } from 'swr'
import fetchJson from 'lib/fetchJson'


export function getApiUrl(base, user, option) {
  let url = `${base}?license=${user?.license}&project=${user?.projectId}&persona=${user?._id}`
  if (option) {
    Object.keys(option).forEach((k) => { url += '&' + k + '=' + option[k] })
  }

  return url
}

export async function enterTest(baseUrl, user, progress) {
  const url = getApiUrl(baseUrl, user)
  const update = progress?.initiated ? false : true
  await fetchJson(url, {
    method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ action: "init", update: update }),
  })

  const mutateUrl = getApiUrl(baseUrl, user, { fullname: user.fullname })
  mutate(mutateUrl)
}

export async function startTest(baseUrl, user, progress) {
  const url = getApiUrl(baseUrl, user, {}) // Empty license, but OK
  const update = progress?.started ? false : true
  await fetchJson(url, {
    method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ action: "start", update: update }),
  })

  const mutateUrl = getApiUrl(baseUrl, user, { fullname: user.fullname })
  mutate(mutateUrl)
}

// https://stackoverflow.com/a/196991
export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

/**
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sequenceArray(sequence) {
  if (!sequence) return []
  return sequence.split(' ').map((d) => {
    return parseInt(d)
  })
}

export function msToTimeString(ms, bSecond = false) {
  const h = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((ms % (1000 * 60)) / 1000);
  const hours   = (h < 10) ? "0" + h : h
  const minutes = (m < 10) ? "0" + m : m
  const seconds = (s < 10) ? "0" + s : s
  if (bSecond) return hours + ":" + minutes + ":" + seconds
  return hours + ":" + minutes
}

export function mateRandom(seeds) {
  const keys = shuffle( Object.keys(seeds) )
  let arr = []
  keys.forEach(k => {
    const items = seeds[k]
    for (let i=0; i<items.length; i++) {
      arr.push(items[i])
    }
  });
  return arr
}