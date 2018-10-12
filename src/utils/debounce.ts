// tslint:disable:no-any typedef

interface Options {
  isImmediate: boolean
}

class DebounceSingleton {
  timeoutId: number | null = null

  debounce(
    func: () => void,
    waitMilliseconds = 150,
    options: Options = {
      isImmediate: false
    }
  ): void {
    const doLater = () => {
      this.timeoutId = null
      if (!options.isImmediate) {
        func()
      }
    }

    const shouldCallNow = options.isImmediate && this.timeoutId === null
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId)
    }

    this.timeoutId = window.setTimeout(doLater, waitMilliseconds)
    if (shouldCallNow) {
      func()
    }
  }
}

export const debounceService = new DebounceSingleton()
