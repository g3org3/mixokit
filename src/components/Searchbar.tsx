import classNames from 'classnames'
import { createSignal, For } from 'solid-js'
import { getCode } from '../utils'

export function Searchbar() {
  const [suggestions, setSuggestions] = createSignal<{ desc: string; imageUrl: string }[]>([])

  const submit = (payload: { image: string; name: string }) => {
    fetch('http://192.168.1.122:3040/api/search', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data)
      })
      .catch(console.error)
  }

  function handleFileSelect(files: File[]) {
    const selectedFile = files[0]
    if (!selectedFile) return

    const reader = new FileReader()
    reader.readAsDataURL(selectedFile)
    reader.onload = () => {
      if (typeof reader.result !== 'string') return
      submit({ image: reader.result, name: selectedFile.name })
    }
  }

  return (
    <div class="flex gap-4">
      <input
        id="fileid"
        class="hidden"
        type="file"
        accept=".jpg,.png"
        // eslint-disable-next-line
        // @ts-ignore
        onChange={(e) => handleFileSelect(e.target.files as File[])}
      />
      <button
        class="duration-300 relative flex-shrink-0 focus:ring-1 focus:ring-teal-500 focus:ring-offset-2 text-teal-600 border-2 border-teal-600 hover:bg-teal-200 rounded-md px-4 mr-2"
        onClick={() => document.getElementById('fileid')?.click()}
      >
        📸 take a picture
      </button>
      <div
        style={{
          'min-height': '100px',
          width: '500px',
          left: '50%',
          margin: '-250px',
          top: '32%',
          position: 'fixed',
        }}
        class={classNames(
          { hidden: suggestions().length === 0 },
          'bg-white text-black z-30 p-4 rounded shadow-lg opacity-100'
        )}
      >
        <div class="text-slate-400">Suggestions</div>
        <For each={suggestions()}>
          {(sug) => (
            <a href={`/product/${getCode(sug.desc)}`} class="flex items-center gap-2 hover:bg-slate-100 p-2">
              <img class="h-20 w-20" src={sug.imageUrl} />
              <div>{sug.desc}</div>
            </a>
          )}
        </For>
      </div>
      <div
        class={classNames(
          { hidden: suggestions().length === 0 },
          'transition-opacity shadow-lg z-20 top-0 left-0 rounded w-full h-full bg-slate-500 border fixed p-2 bg-opacity-10 backdrop-blur-sm'
        )}
      ></div>
    </div>
  )
}
